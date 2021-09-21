import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';
import { JwtDTO } from '../dto/jwt.dto';

import config from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: JwtDTO): Promise<User> {
    const user = await this.userRepository.findOneById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Invalid resource.');
    }

    return user;
  }
}
