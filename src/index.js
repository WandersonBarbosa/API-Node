const  express = require('express')
const bodyparser = require('body-parser')
const models = require('./models')

const user = require('./routes/User')
const project = require('./routes/project')

const app = express()

app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())

app.use('/auth',user)
app.use('/project',project)

models.sequelize.sync().then(()=>{

  app.listen(3000,(err)=>{
    if(err){
      console.log('Error: '+err);
    }
    console.log('Express server listening on port ');
  });
  
});
