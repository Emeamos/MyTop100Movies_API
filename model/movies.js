import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  poster_path: {
    type: String
  },
  vote_average: {
    type: Number
  },
  user_ranking: {
    type: Number,
    required: true,
    default: 0
  }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie