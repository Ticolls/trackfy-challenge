import { Request } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

    if (!clientID || !clientSecret) {
      super({
        clientID: 'dummy',
        clientSecret: 'dummy',
        callbackURL: `${baseUrl}/auth/google/callback`,
        scope: ['email', 'profile'],
        passReqToCallback: true,
      } as StrategyOptionsWithRequest);

      this.logger.warn(
        'GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set. Google OAuth will be disabled.',
      );

      return;
    }

    super({
      clientID,
      clientSecret,
      callbackURL: `${baseUrl}/auth/google/callback`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      picture: photos[0]?.value,
    };

    done(null, user);
  }
}
