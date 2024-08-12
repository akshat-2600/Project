/**
 * I need to write the controller / logic to register a user
 */

const bcryptjs = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")

exports.signup = async (req , res)=>{
    /**
     * logic to create the user
     */

    //1. Read the request body
    const request_body = req.body  //This will give me the request body in form JS Object

    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        password : bcryptjs.hashSync(request_body.password,8)
    }

    try{
        const user_created = await user_model.create(userObj)
        /**
         * Return this user
         */

        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error while registering the user", err)
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user

}

exports.signin = async (req , res)=>{

    //Check if the userId is present in system
    const user = await user_model.findOne({userId : req.body.userId})
    if(user === null){
        return res.status(400).send({
            message : "User id is not a valid user id"
        })
    }
    //Check if password is correct
    const isPasswordValid = bcryptjs.compareSync(req.body.password , user.password)
    if(!isPasswordValid){
        return res.status(401).send({
            message : "Wrong password passed"
        })

    }
    //Using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({id : user.userId} , secret.secret , {
        expiresIn : 120
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    })

}




