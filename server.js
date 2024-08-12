/**
 * This will be the starting file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcryptjs = require("bcryptjs")

//Middle ware
// converting json to javascript

app.use(express.json())

/**
 * Create an admin user at the starting of the application
 * if not already present
 */

//Connection with mongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error" , ()=>{
    console.log("Error while connecting to mongo database")
})

db.once("open" , ()=>{
    console.log("Connected to MongoDB")
    init()
})



async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})


        if(user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error while reading the data")
    }
        
    
    
    try{
        user = await user_model.create({
            name : "Akshat",
            userId : "admin",
            email : "akshat@gmail.com",
            userType : "ADMIN",
            password : bcryptjs.hashSync("Welcome1",8)    
        })
        console.log("Admin created" , user)


    }catch(err){
        console.log("Error while creating admin", err)
    }


}

/**
 * Stich the route to the server
 */

//calling routes and passing app object

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)


/**
 * Start the server
 */
app.listen(server_config.PORT , ()=> {
    console.log("Server started at port num :", server_config.PORT)
})