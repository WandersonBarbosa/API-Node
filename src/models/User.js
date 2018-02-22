module.exports = (sequelize, DataTypes)=>{
    const Cliente = sequelize.define("User",{
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: DataTypes.STRING,
          required:true
        },
        email:  {
            type: DataTypes.STRING,
            unique: true,
            required:true,
            lowercase: true
        },
        password:{
          type: DataTypes.STRING,
          select:false
        }
    });

    return Cliente;
}
