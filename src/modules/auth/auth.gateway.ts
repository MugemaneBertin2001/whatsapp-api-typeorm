import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/logIn.dto';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('signup')
  async handleSignup(client: any, payload: SignUpDto): Promise<void> {
    try {
      const { token } = await this.authService.signUp(payload);
      client.emit('signupSuccess', { token });
    } catch (error) {
      client.emit('signupFail', { message: error.message });
    }
  }

  @SubscribeMessage('login')
  async handleLogin(client: any, payload: LoginDto): Promise<void> {
    try {
      const { token } = await this.authService.login(payload);
      client.emit('loginSuccess', { token });
    } catch (error) {
      client.emit('loginFail', { message: error.message });
    }
  }
}
