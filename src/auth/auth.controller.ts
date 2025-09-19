import { Controller, Get, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login-info')
  @ApiOperation({
    summary: 'Como fazer login com Google',
    description:
      'Retorna as instruções e URL para fazer login com Google. Use a URL em uma nova aba do navegador.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Informações de login com Google',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Para fazer login, abra a URL abaixo em uma nova aba do navegador',
        },
        loginUrl: {
          type: 'string',
          example: 'http://localhost:3001/auth/google',
        },
        callbackInfo: {
          type: 'string',
          example:
            'Após o login, você receberá um JWT access_token que deve ser usado nas requisições autenticadas',
        },
        howToUse: {
          type: 'array',
          items: { type: 'string' },
          example: [
            '1. Clique ou copie a loginUrl',
            '2. Abra em uma nova aba do navegador',
            '3. Faça login com sua conta Google',
            '4. Copie o JWT access_token retornado',
            '5. Use o JWT no botão "Authorize" do Swagger (Bearer Token)',
          ],
        },
      },
    },
  })
  getLoginInfo(@Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return {
      message:
        'Para fazer login, abra a URL abaixo em uma nova aba do navegador',
      loginUrl: `${baseUrl}/auth/google`,
      callbackInfo:
        'Após o login, você receberá um JWT access_token que deve ser usado nas requisições autenticadas',
      howToUse: [
        '1. Clique ou copie a loginUrl',
        '2. Abra em uma nova aba do navegador',
        '3. Faça login com sua conta Google',
        '4. Copie o JWT access_token retornado',
        '5. Use o JWT no botão "Authorize" do Swagger (Bearer Token)',
      ],
    };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  googleCallback(@Req() req: Request) {
    return this.authService.googleLogin(req.user);
  }

  @Get('self')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Obter dados do usuário autenticado',
    description: 'Retorna os dados básicos do usuário autenticado pelo JWT',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário autenticado retornado com sucesso',
    type: AuthUserDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Token JWT inválido ou ausente - faça login primeiro em /auth/login-info',
  })
  @ApiBearerAuth()
  self(@Req() req: Request) {
    return req.user;
  }
}
