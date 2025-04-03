import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { v1 } from "./routes";

const app = express();
app.use(express.json())

const v1Routes = v1()

app.use('/api/v1', v1Routes)


app.listen(process.env.PORT, () => `server running on port ${process.env.PORT}`)

module.exports = app;
