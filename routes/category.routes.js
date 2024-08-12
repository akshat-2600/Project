/**
 * POST localhost:8080/ecom/api/v1/categories
 */

const authConfig = require("../configs/auth.config")
const category_controller = require("../controllers/category.contoller")
auth_mw = require("../middlewares/auth.mw")


module.exports = (app)=>{
    app.post("/ecom/api/v1/categories" , [auth_mw.verifyToken , auth_mw.isAdmin]  ,category_controller.createNewCategory)
}