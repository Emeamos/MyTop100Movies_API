import request from 'supertest';
import app from '../app.js'
import Movie from '../model/movies.js';

// Mocked movie data
const movieData = {
  title: 'Inception',
  overview: "Great movie",
  release_date: "01-20-2010",
  poster_path: "/picture.jpeg",
  vote_average: 9
};

beforeAll(async () => {
  // Connect to the databaseee
  await connectDatabase();

  // Clear the movie collection before running the tests
  await Movie.deleteMany({});
});

afterAll(async () => {
  // Disconnect from the database
  await disconnectDatabase();
});

describe('CRUD Operations', () => {
  let movieId;

  test('Create a movie', async () => {
    const response = await request(app)
      .post('/movies')
      .send(movieData)
      .expect(201);

    const movie = response.body;
    expect(movie.title).toBe(movieData.title);
    expect(movie.release_date).toBe(movieData.release_date);
    expect(movie.genre).toBe(movieData.genre);

    movieId = movie._id;
  });

  test('Get all movies', async () => {
    const response = await request(app)
      .get('/movies')
      .expect(200);

    const movies = response.body;
    expect(movies.length).toBeGreaterThan(0);
  });

  test('Get a movie by ID', async () => {
    const response = await request(app)
      .get(`/movies/${movieId}`)
      .expect(200);

    const movie = response.body;
    expect(movie._id).toBe(movieId);
    expect(movie.title).toBe(movieData.title);
    expect(movie.release_date).toBe(movieData.release_date);
    expect(movie.overview).toBe(movieData.overview);
    expect(movie.poster_path).toBe(movieData.poster_path);
    expect(movie.vote_average).toBe(movieData.vote_average);
  });

  test('Update a movie', async () => {
    const updatedData = {
        title: 'Baby driver',
        overview: "Great movie",
        release_date: "02-19-2010",
        poster_path: "/picture.jpeg",
        vote_average: 9
    };

    const response = await request(app)
      .put(`/movies/${movieId}`)
      .send(updatedData)
      .expect(200);

    const movie = response.body;
    expect(movie._id).toBe(movieId);
    expect(movie.title).toBe(movieData.title);
    expect(movie.release_date).toBe(movieData.release_date);
    expect(movie.overview).toBe(movieData.overview);
    expect(movie.poster_path).toBe(movieData.poster_path);
    expect(movie.vote_average).toBe(movieData.vote_average);
  });

  test('Delete a movie', async () => {
    await request(app)
      .delete(`/movies/${movieId}`)
      .expect(200);

    const deletedMovie = await Movie.findById(movieId);
    expect(deletedMovie).toBeNull();
  });
});
