import { NextFunction, Request, Response } from 'express';
import path from 'path';
import sharp, { bool } from 'sharp';
import { promises as fs } from 'fs';
const cache = './src/images/resized/';

const sendImage = (res: Response, imgName: string) => {
    const absolutePath = path.resolve(`./src/images/resized/${imgName}`);
    res.sendFile(absolutePath);
};

function spiltResizedImgesNames(name: string): string[] {
    let resizedName = name.split('.')[0];
    let imgInfo: string[] = resizedName.split('_');
    return imgInfo;
}

function getImageInfo(req: Request): [string, number, number] {
    // get the image Info.
    const width: number = +(req.query.width as string);
    const height: number = +(req.query.height as string);
    const filename: string = req.query.filename as string;
    return [filename, width, height];
}
const checkCache = async (req: Request, res: Response, next: NextFunction) => {
    // get the image Info.
    const [filename, width, height] = getImageInfo(req);
    const [imgName, imgExtension] = filename.split('.');

    try {
        let files = await fs.readdir('./src/images/resized');
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const [cachedimgName, cachedImgWidth, cachedImgHeight]: string[] =
                spiltResizedImgesNames(file);
            if (
                cachedimgName == imgName &&
                width == +cachedImgWidth &&
                height == +cachedImgHeight
            ) {
                sendImage(res, file);
                return; // if image was found in cahe then return ;
            }
        }
        next();
    } catch (error) {
        res.send(`<h1>error in get image from cahce: ${error} </h1>`);
    }
};

const imageProccessing = async (
    filename: string,
    width: number,
    height: number,
    newName: string
): Promise<boolean | string> => {
    return new Promise<boolean | string>(
        async (resolve: Function, reject: Function) => {
            try {
                const resized = await sharp(`./src/images/full/${filename}`)
                    .resize({ width, height })
                    .toFile(`./src/images/resized/${newName}`);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }
    );
};
async function imageResizing(req: Request, res: Response) {
    // console.log(
    //     '---------------------------------in processing--------------------------------'
    // );
    // get the image Info.
    const [filename, width, height] = getImageInfo(req);

    // handle the newName
    const nameSplited: string[] = filename.split('.');
    const newName: string = nameSplited.join(`_${width}_${height}.`); // adding the width and height to the name to allow caching in next requests

    try {
        let result = await imageProccessing(filename, width, height, newName);
        sendImage(res, newName);
    } catch (error) {
        res.send(`<h1>An error occurred during processing: ${error} </h1>`);
    }
}
export { imageResizing, checkCache, imageProccessing };

