import axios from 'axios';
import Movie from '../model/movies';

const baseURL = 'https://api.themoviedb.org/3/';
const apiKey = process.env.TMDB_API_KEY;

const axiosConfig = async () => {
  try {
    const response = await axios.get(`${baseURL}movie/popular?api_key=${apiKey}`);
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
    console.log(error);
  }
};

export default axiosConfig;
