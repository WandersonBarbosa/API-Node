const models  = require('../models');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authconfig = require('../config/auth')

function generatetoken(params={}){
    return  jwt.sign(params, authconfig.secret,{
        expiresIn: 86400,
    } );
}

const authCotroller = {
    register : async (req , res)=>{
        const {nome, email, password } = req.body
        try{
            if(await models.User.findOne({ where: { email } }))
                return res.status(400).send({error: 'E-mail encontra-se cadastrado, tente outro.'})

            const user = await models.User.create({
                nome,
                email,
                password
            })

            user.password = undefined;

            res.send({
                user ,
                token : generatetoken({id: user.id})
            })
        }catch(err){
            return res.status(400).send({error: 'Registration failed !'})
        }
    },

    authenticate : async (req, res)=>{

        const {email , password} = req.body

        const  user = await models.User.findOne({where: { email}})
        if(!user)
            return res.status(400).send({error: 'User not found'})
        if(!await bcrypt.compare(password, user.password)) 
            return res.status(400).send({error: 'Invalid Password'})
            user.password = undefined;

        res.send({
             user ,
             token : generatetoken({id: user.id})
        })
    }
}

module.exports  = authCotroller;