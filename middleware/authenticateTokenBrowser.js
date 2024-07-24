const jwt = require('jsonwebtoken');

const authenticateTokenBrowser = (req,res,next) => {
    const token = req.cookies.accessToken;
    if(token===undefined){
        return res.redirect('/dashboard/login');
    }

    jwt.verify(token,process.env.TOKEN_SECRET, (error)=>{
        if(error){
            return res.redirect('/dashboard/login');
        }
        next();
    })
}

module.exports = authenticateTokenBrowser;