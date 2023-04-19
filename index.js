import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'; 
dotenv.config()

import express from 'express';
import bodyParser from "body-parser"; 
import cors from 'cors';

const configuration = new Configuration({
    organization: "org-8kbGXKeNKcfXEx12Ogd141iU",
    apiKey: "",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());


app.post("/send", async (req, res) => {
    const { message } = req.body;
    // try{
    //     console.log('message', messgae)
    //     return res.status(200).json({
    //         messgae: 'working'
    //     })
    // }
    // catch(error){
    //     console.log('error', error)
    // }
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "user", content: `${message}` },
        ],
        max_tokens: 1000
    });

    return res.status(200).json({
                messgae: 'working'
            })

    // return res.json({
    //     completion: completion.data.choices[0].message
    // })
})

app.listen(port, () => {
    console.log(`Chat GPT app is listening at http://localhost:${port}`)
})
