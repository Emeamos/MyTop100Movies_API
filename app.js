import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import bodyparser from "body-parser";
import cors from "cors";
import movieRouter from "./routes/movies.js";
dotenv.config({path:'./.env'});

dbConnect();
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true}))


app.use("/api/v1/movies", movieRouter)


app.use(cors({credentials: true, origin: 'http://127.0.0.1:7007'}));

const PORT = process.env.PORT || 7007
app.listen(PORT,console.log(`Server is running at ${PORT}`))