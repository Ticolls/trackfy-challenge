import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  googleLogin(user: any) {
    if (!user) {
      return 'No user from Google';
    }

    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      message: 'Login realizado com sucesso!',
      user: payload,
      access_token: jwt,
    };
  }
}
