import { User } from 'src/modules/auth/entities/user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
