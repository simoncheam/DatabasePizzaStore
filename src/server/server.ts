import * as express from 'express';
import apiRouter from './routes';
import * as path from 'path';

import {TalkToMySQL} from "./db";

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRouter);

//redirect fix:
app.get('*', (req,res) =>{ res.sendFile(path.join(__dirname, '../public/index.html'))

});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

const lol = async () => {

    try {
        TalkToMySQL("SELECT 1+?", ["lol"])
    } catch (error) {
        console.log({message: "SQL stuff got fucked up", error});
    }
}

lol();