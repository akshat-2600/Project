/**
 * POST localhost:8080/ecom/api/v1/auth/signup
 * 
 * I need to intercept this
 */


const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")


module.exports = (app)=>{
    app.post("/ecom/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)
    
    /**
     * route for
     * POST localhost:8080/ecom/api/v1/auth/signin
     */
    app.post("/ecom/api/v1/auth/signin" , [authMW.verifySignInBody] , authController.signin)

}