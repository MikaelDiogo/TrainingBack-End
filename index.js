const express = require('express')
const app = express()
const mongoose = require('mongoose')




    app.use(
        express.urlencoded({
            extended: true,
        }),
    )
  //minha senha cluster:  4Ad3aqzUm07dKsTD
    app.use(express.json())

    const personRoutes = require('./routes/personRoutes') 
    app.use('/person', personRoutes)

    app.get('/', (req, res) => {

        res.json({message: 'hi express!'})
    })

    const DB_USER = "mikael"
    const DB_PASSWORD = encodeURIComponent('4Ad3aqzUm07dKsTD')



    mongoose.connect(
        `mongodb+srv://Mikael:4Ad3aqzUm07dKsTD@cluster0.4uxyuli.mongodb.net/?retryWrites=true&w=majority`
        )
    .then(  () =>{
        console.log("MongoDB has been connected")
        app.listen(3000)
    })
    .catch((err) => console.log(err))

    app.listen(3001)


   