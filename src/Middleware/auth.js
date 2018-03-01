const jwt = require('jsonwebtoken')
const authconfig = require('../config/auth')

module.exports = ( req , res , next)=>{
    
    const authHeader = req.headers.authorization;
   
    if(!authHeader)
        return  res.status(401).send({error: ' No token provided !'})

    const parts = authHeader.split(' ');
    
    if(!parts.length === 2)
        return  res.status(401).send({error: ' token error !'})

    //const [ scheme , token ] = parts;
    const [token ] = parts;
    
    /*if(!/^Bearer$/i.test(scheme))
        return  res.status(401).send({error: ' token malformattend !'})
    */
    jwt.verify(token, authconfig.secret,(err, decoded)=>{
        if(err)return  res.status(401).send({error: ' token ivalid !'})

        req.userid = decoded.id;

        return next();
    });    
}