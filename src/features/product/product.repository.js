import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository{
    constructor(){
        this.collection = "products";
    }

  async add(newProduct){ 
    try {
        const db= getDB();
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
        const db = getDB();
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
        const db = getDB();
        const collection= db.collection(this.collection);
        const result= await collection.findOne({ _id: ObjectId(id) });
        return result;
    } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
 }


}
export default ProductRepository;