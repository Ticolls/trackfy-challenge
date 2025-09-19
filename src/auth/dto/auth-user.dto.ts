import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'Thiago' })
  firstName: string;

  @ApiProperty({ example: 'Seixas' })
  lastName: string;

  @ApiProperty({ example: 'https://lh3.googleusercontent.com/photo.jpg' })
  picture: string;
}
