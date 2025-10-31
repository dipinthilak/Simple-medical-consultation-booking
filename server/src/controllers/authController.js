import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";




export const register = async (req, res) => {
  try {
    console.log("req.body",req.body);
    
    const { name, email, password, role } = req.body;

    console.log("name, email, password, role ",name, email, password, role );
    
    const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (user.length) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)", [
      name,
      email,
      hashed,
      role || "patient",
    ]);

    res.json({ message: "Registered successfully" ,success:true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




 
export const login = async (req, res) => {
  try {

    console.log("email, password",req.body);
    const { email, password } = req.body;

    
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, role: rows[0].role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
