import express from "express"; 
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
const Port = 3000;

let users = [];

app.get('/user' , (req,res)=>{

    res.send(users)
})

app.post('/user' , (req,res)=>{

    users.push(req.body)
    console.log(req.body)

    res.send("User Created")
})

app.listen(Port , ()=>{

    console.log(`App is Running On Port ${Port}`)
})