import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository{
    
    
   async signUp(newUser) {
    try{
    //1.get the data base
    const db= getDb();
   //2.get the collection
   const collection= db.collection("users");
   //3.insert the document
   await collection.insertOne(newUser)
    return newUser;
  }catch(err){
    throw new ApplicationError(" something went  with the database",500);
  }
  }


  async signUp(email,password) {
    try{
    //1.get the data base
    const db= getDb();
   //2.get the collection
   const collection= db.collection("users");
   //3.find the document
   return await collection.findOne({email,password});
   
  }catch(err){
    throw new ApplicationError(" something went  with the database",500);
  }
  }

}

export default UserRepository;