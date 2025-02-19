// 1. Import Express
import './env.js'
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import logMiddleWare from './src/middlewares/logger.middleware.js';


// 2. Create Server
const server = express();
//cors policy config
// server.use(cors())

//load all enviornment varaiables in the application




server.use(express.json());

import apiDocs from './swagger.json' with{type:"json"};
import { ApplicationError } from './src/error-handler/applicationError.js';
import{ connectToMongoDB} from './src/config/mongodb.js';
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs));

server.use(logMiddleWare);

server.use(
  '/api/products',

  productRouter
);
server.use("/api/cartItems", logMiddleWare,jwtAuth, cartRouter);
server.use('/api/users', userRouter);

// 3. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});
//error handler middleware
server.use((err,req,res,next)=>{
  console.log(err);
  if(err instanceof ApplicationError){
    return res.status(err.code).send(err.message)
  }
  //server errors
  return res.status(500).send("something went wrong please try again later");
});

//404 not found
server.use((req,res)=>{
  res.status(404).send("Api not found plz check our documentation for more information at localhost:3200/api-docs")
})

// 4. Specify port.
server.listen(3200,()=>{
  console.log('Server is running at 3200');
  connectToMongoDB();
});

