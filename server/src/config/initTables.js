import { db } from "./db.js";

export const initializeTables = async () => {
  try {
        console.log("Dropping existing tables...");

    // Drop in reverse order of dependencies
    // await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
    // await db.query(`DROP TABLE IF EXISTS appointments`);
    // await db.query(`DROP TABLE IF EXISTS overrides`);
    // await db.query(`DROP TABLE IF EXISTS office_hours`);
    // await db.query(`DROP TABLE IF EXISTS doctors`);
    // await db.query(`DROP TABLE IF EXISTS users`);
    // await db.query(`SET FOREIGN_KEY_CHECKS = 1`);

    // console.log("Old tables dropped successfully!");
    // console.log("Creating new tables...");




    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        role ENUM('admin','patient') DEFAULT 'patient'
      )
    `);


    await db.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        specialization VARCHAR(100),
        status ENUM('active','inactive') DEFAULT 'active'
      )
    `);


    await db.query(`
      CREATE TABLE IF NOT EXISTS office_hours (
        id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT,
        weekday TINYINT,
        start_time TIME,
        end_time TIME,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
      )
    `);


    await db.query(`
      CREATE TABLE IF NOT EXISTS overrides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT,
        date DATE,
        start_time TIME,
        end_time TIME,
        is_closed BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
      )
    `);


    await db.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT,
        patient_id INT,
        date DATE,
        start_time TIME,
        end_time TIME,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id),
        FOREIGN KEY (patient_id) REFERENCES users(id)
      )
    `);

    console.log("All tables verified/created successfully!");
  } catch (err) {
    console.error("Table initialization failed:", err.message);
  }
};
