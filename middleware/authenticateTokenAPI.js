const jwt = require('jsonwebtoken');

const authenticateTokenAPI = (req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(token===undefined){
        return res.status(401).json({message: 'Please log in to get access.'})
    }

    jwt.verify(token,process.env.TOKEN_SECRET, (error)=>{
        if(error){
            return res.status(401).json({message: 'Please log in to get access.'})
        }
        next();
    })
}

module.exports = authenticateTokenAPI;