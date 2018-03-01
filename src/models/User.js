const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User",{
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: DataTypes.STRING,
          required: true
        },
        email:  {
            type: DataTypes.STRING,
            unique: true,
            required:true,
            lowercase: true
        },
        password:{
          type: DataTypes.STRING,
          select: false
        }
    });

    User.beforeCreate(async user =>{
      const hash = await bcrypt.hash(user.password , 10)
      user.password = hash
    });
    return User;
}
