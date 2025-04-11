import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {  createProduct, deleteProduct, getOneProduct, getProducts } from "./handlers/product";

const router = Router();

// interface CustomRequest extends Request {
//     shh_secret?: string;
// }

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id',body('name').isString(), handleInputErrors)
router.post('/product',[body('name').isString()], handleInputErrors ,createProduct)

router.delete('/product/:id', deleteProduct)


router.get('/update', () => { })
router.get('/update/:id', getOneProduct)


router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional(), 
    () => { })


router.post('/update', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    body('status').isIn(['IN_PROGESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').exists(), 
    () => { })

     
router.delete('/update/:id', () => { })

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

export default router;