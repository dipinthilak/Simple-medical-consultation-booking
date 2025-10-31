import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { initializeTables } from './config/initTables.js';
import authRoutes from './routes/authRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appoinmentRoutes.js'


dotenv.config();

const app=express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



await initializeTables();
app.use("/api/auth",authRoutes);
app.use("/api/doctors",doctorRoutes);
app.use("/api/appointments",appointmentRoutes);


const PORT=process.env.PORT ||4000;

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`);
});    