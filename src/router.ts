import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

interface CustomRequest extends Request {
    shh_secret?: string;
}

router.get('/product', (req: CustomRequest, res: Response) => {
    res.json({ message: req.shh_secret });
});
router.get('/product/:id', () => { })
router.put('/product/:id',body('name').isString(), handleInputErrors ,(req, res) => { 
    
})
router.post('/product',[body('name').isString(), body('belongsToId').isString()], handleInputErrors ,(req, res) => {})
router.delete('/product/:id', () => { })


router.get('/update', () => { })
router.get('/update/:id', () => { })


router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional(), 
    () => { })


router.post('/update', 
    body('title').exists(),
    body('body').exists(),
    body('status').isIn(['IN_PROGESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).exists(),
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