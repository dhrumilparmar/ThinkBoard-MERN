import express from 'express';//module type
import cors from 'cors'; //for cross-origin resource sharing
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import notesroutes from './routes/notesroutes.js';
import { connectdb } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000; 

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware 
const app = express();
if(process.env.NODE_ENV !== "production"){

    app.use(cors({
        origin: 'http://localhost:5173', // Adjust this to your frontend URL
    }));
}
app.use(express.json())
app.use(ratelimiter);
app.use('/api/notes', notesroutes)
//custom middleware 
// app.use(req, res, next) => {
//     console.log(`requested method is ${req.method} and requested url is; ${req.url}`);
//     next();
// }

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../../frontend/vite-project/dist")))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../../frontend/vite-project/dist/index.html"))
    });
}
connectdb().then(()=>{
    app.listen(PORT, () =>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});