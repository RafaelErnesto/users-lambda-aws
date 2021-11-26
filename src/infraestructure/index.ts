import  app  from './app';
import dotenv from 'dotenv';
import path from 'path';

app.listen(8080, async () => {
    dotenv.config({path: path.resolve(__dirname,'../../.env')})
    console.log('Listening on port 8080');
});