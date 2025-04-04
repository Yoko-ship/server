const express = require("express")
const googleGenai = require("@google/genai")
const cors = require("cors")
const promptInstructions = `
Представь, что ты профессиональный эксперт.Ты знаешь абсолютно всё умеешь объяснять даже самым начинающим. Объясни мне просто, как будто мне 5 лет, используя доступные слова,молодежные сленги,возможно мемы, примеры и аналогии. Добавь в конец вопросы по теме,и Проверь себя ! Тема: 
`
const app = express()
app.use(express.json())

app.use(cors())
const apiKey = process.env.APIKEY
const ai =  new googleGenai.GoogleGenAI({apiKey:apiKey})

  app.get('/', (req, res) => {
    return "TESTING"
  });

// app.post("/AI",async(req,res) =>{
//   try{
//     const value = req.body
//     const content = value.description
//     if(!content){
//       return res.status(400).json({message: "No valid data"})
//     }
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents:promptInstructions + content,
//     });
//     const result = response.text
//     if(!result){
//       return res.status(400).json({message: "Failed to get data. Please try again"})
//     }
//     res.json({event:result})
//   }
//   catch(error){
//     res.status(500).json({message:error.message})
//   }

// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app