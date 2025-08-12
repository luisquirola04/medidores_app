import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { UserAccess } from 'src/auth/decorators/user.decorator';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {

    constructor(private userService: UserService){}
    //@PublicAccess()
    @Post('/create')
    @UsePipes(new ValidationPipe())
    @AdminAccess()
    createUser(@Body() user:CreateUserDto){
        return this.userService.createUser(user);
    }

    @Post('/update')
    @UsePipes(new ValidationPipe())
    @AdminAccess()
    @UserAccess()
    updateUser(@Body() user:UpdateUserDto){
        return this.userService.updateUser(user);
    }
}
