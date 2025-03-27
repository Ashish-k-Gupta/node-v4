import express, {Request, Response, NextFunction} from 'express';
import router from './router';
import morgan from 'morgan'

const app = express();

// app.use('/api', morgan('dev'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req: Request,res: Response,next: NextFunction) => {
    req.shhhh_secret = "doggy";
    next();
})


app.get('/', (req, res) =>{
    console.log("Hello from express");
    res.status(200);
    res.json({message: "Hello from express"}) 
})

app.use('/api', router)



export default app;