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
      const movie = await Movie.findByIdAndRemove(id);
  
      if (!movie) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
  
      res.json({ msg: 'Movie removed' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };
  
  export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, release_date, poster_path, overview, rating } = req.body;
    try {
      let movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
      movie.title = title;
      movie.release_date = release_date;
      movie.poster_path = poster_path;
      movie.overview = overview;
      movie.rating = rating;
      await movie.save();
      res.json(movie);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };
  export const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };
  export const listMovies = async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };
  export const syncMovies = async (req, res) => {
    try {
      const movies = await savePopularMovies();
      await Movie.deleteMany();
      await Movie.insertMany(movies);
      res.json({ msg: 'Movies synced' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  };