import express from "express";
import cors from "cors"
import { nanoid } from "nanoid";

const app = express()
app.use(express.json())
app.use(cors())

const Port = 3000;

let userBase = []; // Local DataBase

app.post("/signup", (req, res) => {

    let body = req.body;

    if (!body.fullName
        || !body.email
        || !body.password) {
        res.status(400).send(`
        
        required field missing , request example:
        {
            fullName : "Abc",
            email: "abc@gmail.com",
            password: "abc1234"
        }`
        );
        return;
    }

    let isFound = false;

    for(let i = 0; i<userBase.length; i++){

        if(userBase[i].email === body.email){

            isFound = true;
            break;
        }
    }

    if(isFound){
        res.status(400).send({
        
            message : `<b>${body.email}</b> already exist.`
        })
        return;
    }


    let newUser = {
        userId: nanoid(),
        fullName: body.fullName,
        email: body.email,
        password: body.password
    }

    userBase.push(newUser)

    res.status(201).send({
        
        message: "User is created...",
    })
    

})

app.post("/login", (req, res) => {

    let body = req.body;

    if (!body.email
        || !body.password) {
        res.status(400).send(`
            required field missing , request example
            {
                email : "abc@gmail.com",
                password : "abc123"
            }`
        )
        return;
    }

    let isFound = false;

    for (let i = 0; i < userBase.length; i++) {

        if (userBase[i].email === body.email) {

            isFound = true;

            if (userBase[i].password === body.password) {

                res.status(200).send({

                    userId: userBase[i].userId,
                    fullName: userBase[i].fullName,
                    email: userBase[i].email,
                    message: "Login Successfull.."
                })
                return;

            }
            else {
                res.status(401).send({
                    message: "Incorrect Password"
                })
                return;
            }
        }
    }
    if (!isFound) {
        res.status(404).send({

            message: "user not found"
        })
        return;
    }
})

app.listen(Port, () => {

    console.log(`App is listening on port ${Port}`)
})

