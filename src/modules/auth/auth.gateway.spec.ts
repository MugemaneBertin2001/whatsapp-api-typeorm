import { Test, TestingModule } from '@nestjs/testing';
import { AuthGateway } from './auth.gateway';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/logIn.dto';

describe('AuthGateway', () => {
  let gateway: AuthGateway;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGateway,
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<AuthGateway>(AuthGateway);
    authService = module.get<AuthService>(AuthService);
  });

  it('should handle signup successfully', async () => {
    const client = { emit: jest.fn() };
    const signUpDto: SignUpDto = {
      name: '',
      email: '',
      password: '',
    };
    const token = 'sample_token';
    (authService.signUp as jest.Mock).mockResolvedValueOnce({ token });

    await gateway.handleSignup(client, signUpDto);

    expect(client.emit).toHaveBeenCalledWith('signupSuccess', { token });
  });

  it('should handle login successfully', async () => {
    const client = { emit: jest.fn() };
    const loginDto: LoginDto = {
      email: '',
      password: '',
    };
    const token = 'sample_token';
    (authService.login as jest.Mock).mockResolvedValueOnce({ token });

    await gateway.handleLogin(client, loginDto);

    expect(client.emit).toHaveBeenCalledWith('loginSuccess', { token });
  });
});
