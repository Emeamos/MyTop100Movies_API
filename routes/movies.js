import express from "express";
import { createMovie, deleteMovie, getMovieById, listMovies, syncMovies, updateMovie } from "../controller/movies.js";

const movieRouter = express.Router();

movieRouter.get("/", listMovies);
movieRouter.post("/", createMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.post("/sync", syncMovies);

export default movieRouter;