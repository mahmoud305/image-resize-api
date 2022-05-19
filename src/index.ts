import express from 'express';
import picRouter from './PicFolder/picRoutes';
const app = express();
const port = 3000;

app.use('/picAPI', picRouter);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

 
