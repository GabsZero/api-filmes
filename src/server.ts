import express from 'express'

import { v1 } from "./routes";

const app = express();
app.use(express.json())

const v1Routes = v1()

app.use('/api/v1', v1Routes)


app.listen(3333, () => 'server running on port 3333')