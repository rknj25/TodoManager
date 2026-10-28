import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/userRoute.js';
import todoRouter from './routes/todoRoute.js';

dotenv.config();
const app=express()
const PORT=process.env.PORT

app.use(cors());
app.use(express.json());


app.use('/api/users',router)
app.use('/api/todos',todoRouter)
connectDB();
app.listen(PORT,()=>{
    console.log(`Server started at:- ${PORT}`);
    
})