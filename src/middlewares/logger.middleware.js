import fs from "fs";
import winston from "winston";
const fsPromise= fs.promises;

// async function log(logData){
//     try{
//   logData= 
//   `\n ${new Date().toString()}-${logData}`;
//  await fsPromise.appendFile('log.txt',logData);
//     }catch(err){
//         console.error(err);
//     }
// }


const logger= winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:'user-service'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
})

const logMiddleWare= async(req,res,next)=>{
    if(!req.url.includes('signin')){
   const logData= `${req.url}-${JSON.stringify(req.body)}`
    logger.info(logData);
    }
   next();
}
export default logMiddleWare;
