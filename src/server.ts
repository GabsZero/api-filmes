import express from 'express'

import { initRoutes } from "./routes";

const app = express();
app.use(express.json())

const route = initRoutes(app)

app.use(route)


app.listen(3333, () => 'server running on port 3333')