import { isDataView } from "util/types";
import prisma from "../db";
import { json } from "stream/consumers";
import { body } from "express-validator";

export const getOneUpdate = async (req, res) =>{
    const userId = req.user.id

    const update = await prisma.update.findFirst({
        where:{
            id: req.params.id,
            product: {
                belongsToId: userId
            }
        }
    })

    if(!update){
        return res.json({message: "Update not found or unauthorized"})
    }

    res.json({data: update})
}

export const getUpdates = async (req, res) =>{
    const userId = req.user.id

    const updates = await prisma.update.findMany({
        where:{
            product:{
                belongsToId: userId,
            }
        },
        include: {
            product: true
        }
    })

    if(updates.length === 0){
        return res.status(404).json({message: "No update found for your product."})
    }
    res.json({data: updates})
}
// export const createUpdate = async (req, res) =>{
//     const userId = req.user.id
//     const product = await prisma.product.findUnique({
//         where:{
//             id: req.body.productId
//         },
//     });

//     if(!product || product.belongsToId !== userId){
//       return  res.status(401).json({message: "Not authorized to add an update to the product"})
//     }

//     const update = await prisma.update.create({
//         data: {
//             title: req.body.title,
//             body: req.body.body,
//             product:{
//                 connect: {
//                     id: req.body.productId
//                 }
//             }
//         }
       
//     })
//  res.json({data: update})
// }


// export const createUpdate = async (req , res) =>{
//     const userId = req.user.id;
//     const {productId, title, body,status, version} = req.body
// try{

//     const product = await prisma.product.findUnique({
//         where:{
//             id: productId
//         }
//     })

//     if(!product || product.belongsToId !== userId){
//     return res.status(403).json({message: "Not authorized to make these chagnes"})
//     }

//     const update = await prisma.update.create({
//         data:{
//             title,
//             body,
//             status, 
//             version,
//             product:{
//                 connect:{
//                     id: productId
//                 }
//             }
//         }
//     })
//     res.json({data: update})
// }
// catch(e){
//     console.log(e)
//     res.json({message: "Something went wrong"})
// }
// }

export const createUpdate = async (req, res) => {
    const userId = req.user.id;
    const { productId, title, body, status, version } = req.body;
  
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
  
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId
        }
      });
  
      if (!product || product.belongsToId !== userId) {
        return res.status(403).json({ message: "Not authorized to make these changes" });
      }
  
      const update = await prisma.update.create({
        data: {
          title,
          body,
          status,
          version,
          product: {
            connect: {
              id: productId
            }
          }
        }
      });
  
      res.json({ data: update });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  

export const updatedUpdate = async (req ,res) =>{
    const userId = req.user.id
    try{
        const existingUpdate = await prisma.update.findFirst({
            where:{
                id: req.params.id,
                product:{
                    belongsToId: userId
                }

            }
        })

        if(!existingUpdate){
         return res.status(404).json({message: "Update not exits or unauthorized"})
        }
        console.log("BODY:", req.body); // Confirm asset is here

        const update = await prisma.update.update({
            where:{
                id: req.params.id
            },
            data:{
                title: req.body.title,
                body: req.body.body,
                status: req.body.status,
                version: req.body.version,
                asset: req.body.asset
            }
        })

        res.json({data: update})

    }
    catch(e){
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
}

export const deleteUpdates = async (req , res) =>{
    const userId = req.user.id;

    try{
        const existingUpdate = await prisma.update.findFirst({
            where:{
                id: req.params.id,
                product:{
                    belongsToId: userId
                }
            }
        })
        if(!existingUpdate){
            return res.status(404).json({message: "Update do not exist or unauthorized"})
        }

        const deletedUpdate = await prisma.update.delete({
            where:{
                id: req.params.id
            }
        })

        res.json({data: deletedUpdate});
    }

    catch(e){
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
}   