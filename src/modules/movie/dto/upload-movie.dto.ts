import { ApiProperty } from '@nestjs/swagger';
import { UploadMovieImageRequest } from '../interfaces/upload-movie.interface';
import { IsNumberString } from 'class-validator';

export class UpdateMovieDto implements Omit<UploadMovieImageRequest, 'image'>
{
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumberString()
  movieId: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  image: any;
}
