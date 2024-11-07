// models/Actor.ts
import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Movie } from '../../movie'; // Make sure to import the Movie model
import { MovieActor } from '../../movie_actor'; // Ensure the correct path for MovieActor

@Table({ tableName: 'actors' })
export class Actor extends Model<Actor> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  birth_date: string;

  // The actor has many movie-actor associations (in MovieActor table)
  @HasMany(() => MovieActor)
  movieActors: MovieActor[];

  // Many-to-many relationship between Actor and Movie
  @BelongsToMany(() => Movie, () => MovieActor)
  movies: Movie[];
}
