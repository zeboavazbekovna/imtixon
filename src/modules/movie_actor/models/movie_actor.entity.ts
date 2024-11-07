// models/MovieActor.ts
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Movie } from '../../movie'; 
import { Actor } from '../../actor';

@Table({ tableName: 'movie_actors' })
export class MovieActor extends Model<MovieActor> {
  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  movie_id: number; // Changed to camelCase for consistency

  @ForeignKey(() => Actor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  actor_id: number; // Changed to camelCase for consistency

  // Associations to the Movie and Actor models
  @BelongsTo(() => Movie)
  movie: Movie;

  @BelongsTo(() => Actor)
  actor: Actor;
}
