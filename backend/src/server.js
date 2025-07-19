import express from 'express';//module type
import cors from 'cors'; //for cross-origin resource sharing
import dotenv from 'dotenv';

import notesroutes from './routes/notesroutes.js';
import { connectdb } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000; 

//middleware 
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
}));
app.use(express.json())
app.use(ratelimiter);
app.use('/api/notes', notesroutes)
//custom middleware 
// app.use(req, res, next) => {
//     console.log(`requested method is ${req.method} and requested url is; ${req.url}`);
//     next();
// }


connectdb().then(()=>{
    app.listen(PORT, () =>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});