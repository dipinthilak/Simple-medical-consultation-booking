import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const protect= (req,res,next)=>{
    
    console.log(`auth running`);
    
    const token= req.headers.authorization?.split(' ')[1];
    
    if(!token)
    {return res.status(401).json({message:"No token provided"})};

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err)
        {return res.status(403).json({message:"Invalid token"})};
        req.user=decoded;
        next();
    });
};