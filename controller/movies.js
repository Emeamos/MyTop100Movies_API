import axios from "axios";
import Movie from "../model/movies.js";
import axiosConfig from "../utils/axiosConfig.js";

export const savePopularMovies = async () => {
    try {
      const response = await axios.get(`${axiosConfig.baseURL}movie/popular?api_key=${axiosConfig.apiKey}`);
      const movies = response.data.results;
  
      for (const movieData of movies) {
        const movie = new Movie({
          title: movieData.title,
          release_date: movieData.release_date,
          poster_path: movieData.poster_path,
          overview: movieData.overview,
          rating: movieData.vote_average,
        });
  
        try {
          const savedMovie = await movie.save();
          console.log(`Saved movie: ${savedMovie.title}`);
        } catch (error) {
          console.log(`Error saving movie: ${movie.title}`, error);
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(`Error saving movies: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        console.log(`Error sending request to save movies: ${error.request}`);
      } else {
        console.log(`Error saving movies: ${error.message}`);
      }
    }
  };
export const createMovie = async (req, res) => {
    const { title, release_date, poster_path, overview, rating } = req.body;
    const movie = new Movie({
      title,
      release_date,
      poster_path,
      overview,
      rating,
    });
    try {
      const savedMovie = await movie.save();
      res.json(savedMovie);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };
export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      let movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
      await movie.remove();
      res.json({ msg: 'Movie removed' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };