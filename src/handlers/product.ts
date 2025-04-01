import prisma from "../db";

export const addProduct = async (req,res) =>{
    const product = await prisma.product.create({
        data:{
            name: req.body.name,
            belongsToId: req.user.id
        }
       
    })
}