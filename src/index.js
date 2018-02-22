const  express = require('express')
const bodyparser = require('body-parser')
const models = require('./models')

const app = express()

app.use(bodyparser)
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false}))

models.sequelize.sync().then(()=>{

  app.listen(3000,()=>{
    console.log('Express server listening on port ');
  });
  
});
