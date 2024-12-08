const mongoose = require ("mongoose");
const { DB_NAME } =  require ("../constants");


const connectDB = async ()=>{
    try {
       const connectionInstance = await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Mongodb connected !! DB HOST : ${connectionInstance.connection.host}`);
      } catch (error) {
          console.error("MongoDB Connection Error", error);
          process.exit(1);
      }
}

module.exports =  connectDB;