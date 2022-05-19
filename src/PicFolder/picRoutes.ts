import express, { Request, Response } from 'express';
import { type } from 'os';
import { checkCache, imageResizing } from './PicController';
const picRouter = express.Router();
const sharp = require('sharp');
var path = require('path');

/**
 * encenadaport
 * fjord
 * santamonica
 * palmtunnel
 * icelandwaterfall
 */

picRouter.get('/resize', checkCache, imageResizing);

export default picRouter;
