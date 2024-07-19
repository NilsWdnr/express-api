const jwt = require('jsonwebtoken');

const authenticateTokenBrowser = (req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(token===undefined){
        return res.redirect('/dasboard/login');
    }

    jwt.verify(token,process.env.TOKEN_SECRET, (error)=>{
        if(error){
            return redirect('/dashboard/login');
        }
        next();
    })
}

module.exports = authenticateTokenBrowser;