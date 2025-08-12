import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    
    @Post("/login")
    @UsePipes(new ValidationPipe())
    login(@Body() data: LoginDto){
        return  this.authService.loginUser(data);
    }
}
