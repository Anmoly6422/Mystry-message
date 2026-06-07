import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("DNS servers:", dns.getServers());
import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}
const connection :ConnectionObject = {}

async function dbconnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database");
        return ;
    }
    try{
         console.log("Node version:", process.version);
    console.log("Mongo URI:", process.env.MONGODB_URI);
     const db=   await mongoose.connect(process.env.MONGODB_URI || "",{})
     

  connection.isConnected =  db.connections[0].readyState
      
  console.log("DB Connected Succesfully");


    }catch(error){
   console.log("Database  connection failed",error);
   process.exit(1)

    }
}

export default dbconnect