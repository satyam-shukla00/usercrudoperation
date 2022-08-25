import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query,Session, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { currentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize, } from 'src/interceptors/serialize.interceptors';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto) 
export class UsersController {
  constructor(private usersService: UsersService,private authService:AuthService) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@currentUser() user:User){
    return user;
  }

  @Post('/signout')
  signOut(@Session() session:any){
    return session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto,@Session() session:any) {
    const user = await this.authService.signup(body.email,body.password)
    session.userId = user.id;
    return user;
  }

  @Post("/signin")
  async signin(@Body() body:CreateUserDto,@Session() session:any){
    const user = await this.authService.signin(body.email,body.password)
    session.userId = user.id;
    return user;
  }

  @Get("/:id")
  async getUser(@Param('id') id:string){
    const user = await this.usersService.findOne(parseInt(id))
    if(!user){
        throw new NotFoundException("Sorry! not Found");
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email:string){
    return this.usersService.find(email)
  }

  @Delete("/:id")
  removeUser(@Param('id') id:string){
    return this.usersService.remove(parseInt(id))
  }

  @Patch("/:id")
  updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){

    return this.usersService.update(parseInt(id),body)
  }

}

