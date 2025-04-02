import express, {NextFunction, Request, Response} from 'express'
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
const app = express();

interface CustomRequest  extends Request{
    shh_secret?: string
}

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req: CustomRequest, res: Response, next: NextFunction) =>{
    req.shh_secret = 'doggy'
    next()
})


app.get('/', (req: Request, res: Response)=>{
    res.send("Hello, TypeScript with Express");
    console.log('Hello from express')
    res.status(200)
})

app.get('/private', (req,res) =>{
    res.json({message: "This is a protected route"})
})


app.use('/api',protect, router);
app.post('/user', createNewUser )
app.post('/signin', signin)
export default app;