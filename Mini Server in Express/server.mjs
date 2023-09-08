import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const port = 3000;

app.get('/' , (req, res)=>{

    res.send("Home Page Here")
})
app.get('/admin' , (req, res)=>{

    res.send({
        username : "Admin",
        password : 123,
    })
})

app.listen(port , ()=>{

    console.log(`App is Running on Port ${port}` )
})

