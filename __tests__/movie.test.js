import {jest} from '@jest/globals';
import axios from 'axios';
import { savePopularMovies } from '../controller/movies.js';

jest.mock('axios');

describe('savePopularMovies', () => {
  it('should save popular movies to the database', async () => {
    const mockMovies = [
      {
        title: 'Movie 1',
        release_date: '2022-05-01',
        poster_path: '/movie1.jpg',
        overview: 'A great movie',
        rating: 8.5,
      },
      {
        title: 'Movie 2',
        release_date: '2022-05-02',
        poster_path: '/movie2.jpg',
        overview: 'Another great movie',
        rating: 9.0,
      },
    ];
    const mockResponse = {
      data: {
        results: mockMovies,
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const consoleSpy = jest.spyOn(console, 'log');

    await savePopularMovies();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY_HERE'
    );
    expect(consoleSpy).toHaveBeenCalledWith('Saved movie: Movie 1');
    expect(consoleSpy).toHaveBeenCalledWith('Saved movie: Movie 2');
  });

  it('should handle errors while saving popular movies', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to save popular movies'));

    const consoleSpy = jest.spyOn(console, 'log');

    await savePopularMovies();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY_HERE'
    );
    expect(consoleSpy).toHaveBeenCalledWith('Error saving movies: Failed to save popular movies');
  });
});
