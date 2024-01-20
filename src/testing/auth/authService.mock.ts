import { AuthService } from '../../app/auth/auth.service';
import { userMock } from '../users/user.mock';
import { tokenMock } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    register: jest.fn().mockResolvedValue(userMock),
    login: jest.fn().mockResolvedValue(tokenMock),
  },
};
