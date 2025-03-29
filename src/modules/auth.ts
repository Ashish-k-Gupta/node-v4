import jwt from 'jsonwebtoken'

export const createToken = (user) =>{
    const token = jwt.sign({
        id: user.id, 
        name: user.name}, 
        process.env.JWT_SECRET)

    return token;
}

export const protect = (req, res, next) =>{
    const bearer = req.headers.authorization;
    console.log(bearer)

    if(!bearer){
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }


    const [, token] = bearer.split(' ')
    if(!token){
        res.status(401);
        res.json({message: 'Not a valid token'})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user;
        next();
    }
    catch (e) {
        console.log(e)
        res.status(401)
        res.json({message: 'not valid token '})
    }
}