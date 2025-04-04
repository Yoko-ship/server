import express from "express"
import { GoogleGenAI } from "@google/genai"
import "dotenv/config"
import { configDotenv } from "dotenv"
configDotenv({path:'../.env'})
import cors from "cors"
const promptInstructions = `
Представь, что ты профессиональный эксперт.Ты знаешь абсолютно всё умеешь объяснять даже самым начинающим. Объясни мне просто, как будто мне 5 лет, используя доступные слова,молодежные сленги,возможно мемы, примеры и аналогии. Добавь в конец вопросы по теме,и Проверь себя ! Тема: 
`
const app = express()
app.use(express.json())

app.use(cors())
const apiKey = process.env.APIKEY
const ai = new GoogleGenAI({apiKey:apiKey})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    next();
  });
  

  app.get('/TEST', (req, res) => {
    return "TESTING"
  });

app.post("/AI",async(req,res) =>{
    const value = req.body
    const content = value.description
    if(!content){
      return res.status(400).json({message: "No valid data"})
    }
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:promptInstructions + content,
    });
    const result = response.text
    if(!result){
      return res.status(400).json({message: "Failed to get data. Please try again"})
    }
    res.json({event:result})

})

export default app