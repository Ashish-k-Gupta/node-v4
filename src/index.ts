import * as dotenv from 'dotenv';
dotenv.config();
import config from './config';
console.log("JWT_SECRET:", process.env.JWT_SECRET);

import app from './server';

const PORT = process.env.PORT || 3001;

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
