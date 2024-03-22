import { Body, Controller, HttpException, HttpStatus, Post , Get, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/logIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private profileService: ProfileService
        ) {}

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        try {
            const token = await this.authService.signUp(signUpDto);
            return  token ;
        } catch (error) {
            throw new HttpException(`Failed to sign up ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('/login')
        login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
         return this.authService.login(loginDto);
  }
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req): Promise<ProfileDto | null> {
      const userId = req.user.id; 
      return await this.profileService.getProfile(userId); 
  }
}