import {Router} from "express";

const router = Router();


// Product 
router.get('/product', (req, res) =>{
    res.json({message: "Hello this response of result"})
})
router.get('/product/:id', () =>{})
router.put('/product/:id', () =>{})
router.post('/product/', () =>{})
router.delete('/product/:id', () =>{})


// Update

router.get('/update', () =>{})
router.get('/update/:id', () =>{})
router.put('/update/:id', () =>{})
router.post('/update/', () =>{})
router.delete('/update/:id', () =>{})


// UpdatePoint
router.get('/updatedpoint', () =>{})
router.get('/updatedpoint/:id', () =>{})
router.put('/updatedpoint/:id', () =>{})
router.post('/updatedpoint/', () =>{})
router.delete('/updatedpoint/:id', () =>{})

export default router;