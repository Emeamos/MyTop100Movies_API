import { createMovie } from '../controller/movies.js';
import Movie from '../model/movies.js';

describe('createMovie', () => {
  let req;
  let res;
  let movie;

  beforeEach(() => {
    req = {
      body: {
        title: 'Movie 1',
        release_date: '2022-05-01',
        poster_path: '/movie1.jpg',
        overview: 'A great movie',
        rating: 8.5,
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    movie = {
      save: jest.fn(),
    };
  });

  it('should create a new movie', async () => {
    Movie.mockReturnValueOnce(movie);
    movie.save.mockResolvedValueOnce({
      title: 'Movie 1',
      release_date: '2022-05-01',
      poster_path: '/movie1.jpg',
      overview: 'A great movie',
      rating: 8.5,
      _id: '609cf79d80a1c45ff8d87738',
    });

    await createMovie(req, res);

    expect(Movie).toHaveBeenCalledWith({
      title: 'Movie 1',
      release_date: '2022-05-01',
      poster_path: '/movie1.jpg',
      overview: 'A great movie',
      rating: 8.5,
    });
    expect(movie.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      title: 'Movie 1',
      release_date: '2022-05-01',
      poster_path: '/movie1.jpg',
      overview: 'A great movie',
      rating: 8.5,
      _id: '609cf79d80a1c45ff8d87738',
    });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error saving movie';
    Movie.mockReturnValueOnce(movie);
    movie.save.mockRejectedValueOnce(new Error(errorMessage));

    await createMovie(req, res);

    expect(Movie).toHaveBeenCalledWith({
      title: 'Movie 1',
      release_date: '2022-05-01',
      poster_path: '/movie1.jpg',
      overview: 'A great movie',
      rating: 8.5,
    });
    expect(movie.save).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server error');
  });
});
