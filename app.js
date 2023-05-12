import express from "express";
import dotenv from "dotenv";

import bodyparser from "body-parser";
import cors from "cors";
dotenv.config({path:'./.env'});

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true}))

app.use(cors({credentials: true, origin: 'http://127.0.0.1:7007'}));

const PORT = process.env.PORT || 7007
app.listen(PORT,console.log(`Server is running at ${PORT}`))