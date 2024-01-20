import { JwtService } from '@nestjs/jwt';
import { tokenMock } from './token.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(tokenMock.access_token),
  },
};
