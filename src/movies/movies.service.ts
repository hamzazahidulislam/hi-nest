import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entites/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  Getone(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found`);
    }
    return movie;
  }
  DeleteOne(id: number) {
    this.Getone(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
  create(moviedata: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...moviedata,
    });
  }
  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.Getone(id);
    this.DeleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
