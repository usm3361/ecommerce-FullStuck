import express from "express";
import cors from "cors";
import authRoutes from './routers/authRoutes.js'
import productRoutes from './routers/productRoutes.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);



export default app

