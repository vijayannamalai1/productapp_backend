require('dotenv').config();
const app=require('./app')
const mongoose=require('mongoose')


const db=process.env.DATABASE.replace(/<password>/,process.env.DB_PASSWORD)
console.log(db)

async function startServer(){
  try{
  await mongoose.connect(db)
  console.log('db connected')
  const PORT=process.env.PORT||3000
  app.listen(PORT, () => {
          console.log('Express server initialized');
        });
  }
  catch(err){
    throw new Error(err.message)
  }
}

startServer()

