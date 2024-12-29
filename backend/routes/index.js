const express = require('express')

const router = express.Router()


const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUser = require('../controller/user/allUsers')
const updataUser = require('../controller/user/updataUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetail')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/CountAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const fillterProductController = require('../controller/product/fillterProduct')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


router.get("/all-user",authToken,allUser)
router.post("/update-user",authToken,updataUser)

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)

router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)

router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

router.get("/search",searchProduct)

router.post("/filter-product",fillterProductController)



module.exports = router   