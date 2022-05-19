"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PicController_1 = require("./PicController");
var picRouter = express_1.default.Router();
var sharp = require('sharp');
var path = require('path');
/**
 * encenadaport
 * fjord
 * santamonica
 * palmtunnel
 * icelandwaterfall
 */
picRouter.get('/resize', PicController_1.checkCache, PicController_1.imageResizing);
// picRouter.get("/resize", async (req:Request ,res:Response)=>{
//     const width :number = + (req.query.width as string) ;
//     const height :number = + (req.query.height as string) ;
//     const filename :string =  (req.query.filename as string) ;
//     console.log(typeof("type of width is = "+Number(width)));
//     // let {filename , width , height} = req.query;
//     try {
//         const meta= await sharp('./src/images/full/fjord.jpg').metadata();
//         // const resized= await sharp('./src/images/full/fjord.jpg').resize({width: (width as unknown)as number , height: (height as unknown)as number }).toFile('./src/images/resized/fjord_s.jpg');
//         const fileNames: string[]= filename.split(".");
//         console.log(fileNames[0]+"-------"+fileNames[1]);
//         const newName:string = fileNames.join(`_${width}_${height}.`);
//         console.log(newName);
//         const resized= await sharp(`./src/images/full/${filename}`).resize({width , height }).toFile(`./src/images/resized/${newName}`);
//         console.log("-----------------------");
//     console.log(resized);
//     const absolutePath = path.resolve(`./src/images/resized/${newName}`);
//         // res.send(`<h1> Hello ${filename} ${height} World  ${width}!</h1> `+resized);
//         res.sendFile(absolutePath)
//     } catch (error) {
//         console.log(`An error occurred during processing: ${error}`);
//         res.send(`<h1>An error occurred during processing: ${error} </h1>`)
//     }
//     // res.send()
// } )
exports.default = picRouter;
// deal with sharp
