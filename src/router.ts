import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {  createProduct, deleteProduct, getOneProduct, getProducts } from "./handlers/product";
import { getUpdates, createUpdate, updatedUpdate, deleteUpdates } from "./handlers/test";

const router = Router();


router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id',body('name').isString(), handleInputErrors)
router.post('/product',[body('name').isString()], handleInputErrors ,createProduct)

router.delete('/product/:id', deleteProduct)


router.get('/update', getUpdates)
router.get('/update/:id', getOneProduct)


router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional(), 
    body('asset').optional().isString(),
    updatedUpdate)


router.post('/update', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional().isNumeric(), 
   createUpdate)

     
router.delete('/update/:id', deleteUpdates)

router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
 () => { })
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => { })
router.delete('/updatepoint/:id', () => { })

router.use((err, req, res, next) =>{
    console.log(err)
    res.json({message: "In route error"})
})

export default router;