import { Router, Request, Response } from "express";

const router = Router();

interface CustomRequest extends Request {
    shh_secret?: string;
}

// router.get('/product', ()=>{})
router.get('/product', (req: CustomRequest, res: Response) => {
    res.json({ message: req.shh_secret });
});
router.get('/product/:id', () => { })
router.put('/product/:id', () => { })
router.post('/product', () => { })
router.delete('/product/:id', () => { })


router.get('/update', () => { })
router.get('/update/:id', () => { })
router.put('/update/:id', () => { })
router.post('/update', () => { })
router.delete('/update/:id', () => { })

router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', () => { })
router.post('/updatepoint', () => { })
router.delete('/updatepoint/:id', () => { })

export default router;