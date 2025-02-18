import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository{
    constructor(){
        this.collection = "products";
    }

  async add(newProduct){ 
    try {
        const db= getDb();
        const collection= db.collection(this.collection);
        const result= await collection.insertOne(newProduct);
        return result;
    } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
   } 

  async getAll(){
    try {
        const db = getDb();
        const collection= db.collection(this.collection);
        const result= await collection.find(). toArray();
        return result;
    } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
 }

  async get(id){
    try {
        const db = getDb();
        const collection= db.collection(this.collection);
        return await collection.findOne({_id: new ObjectId(id)});
        
    } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
 }


}
export default ProductRepository;