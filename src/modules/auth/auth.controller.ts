import { Body, Controller, Post, Get, HttpException, HttpStatus, ValidationPipe, Res, UsePipes, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginResponse, RefreshResponse } from './interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RefreshDto, RegisterDto } from './dto';
import { DeviceService } from '../device';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService,
    private readonly deviceService: DeviceService,
  ) {}

  @ApiOperation({ summary: 'Login qilish' })
  @Post('/login')
  async signIn(
    @Body() payload: LoginDto,
    @Req() request: Request, // So'rovni olish
    @Res() response: Response
  ): Promise<void> {
    try {
      const userAgent = request.headers['user-agent'] || ''; // user-agent ni olish
      const loginResponse = await this.service.login(payload, userAgent); // user-agent ni xizmatga uzatish

      // Tokenlarni JSON formatida qaytarish
      response.status(HttpStatus.OK).json({
        success: true,
        id:loginResponse.id,
        message: 'Login muvaffaqiyatli bajarildi',
        name: loginResponse.name,
        accessToken: loginResponse.accessToken,
        refreshToken: loginResponse.refreshToken,
        email: loginResponse.email
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Login davomida xatolik yuz berdi: ' + error.message,
      });
    }
  }

  @ApiOperation({ summary: 'Register qilish' })
  @Post('/register')
  async signUp(
    @Body() payload: RegisterDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<void> { 
    try {
      const userAgent = request.headers['user-agent'] || ''; // user-agent ni olish
      const registerResponse = await this.service.register(payload, userAgent); // user-agent ni xizmatga uzatish

      // Ro'yxatdan o'tish muvaffaqiyatli bo'lsa, tokenlarni qaytarish
      response.status(HttpStatus.CREATED).json({
        success: true,
        id:registerResponse.id,
        message: 'Muvaffaqiyatli ro‘yxatdan o‘tdingiz!',
        name: registerResponse.name,
        email:registerResponse.email,
        accessToken: registerResponse.accessToken,
        refreshToken: registerResponse.refreshToken,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Royxatdan o‘tishda xato yuz berdi: ' + error.message,
      });
    }
  }

  @Get('/register')
  async showRegisterForm(@Res() response: Response) {
    response.render('register.ejs', { user: {}, message: '', title: 'Register',accessToken:"" , refreshToken:"",name:"",email:"",user_id:""});
  }

  @Get('/success')
  async showSuccessForm(@Res() response: Response) {
    response.render('success.ejs', { user: {}, message: '', title: 'Register',accessToken:"" , refreshToken:"",name:"",email:"",user_id:""});
  }

  @Get('/userdata')
  async showUserForm(@Res() response: Response) {
    response.render('userdata.ejs', { user: {}, message: '', title: 'Register',accessToken:"" , refreshToken:"",name:"",email:"",user_id:""});
  }


  @Get('/login')
  async loginForm(@Res() response: Response) {
    response.render('login.ejs', { user: {}, message: '', title: 'Login',accessToken:"" , refreshToken:"",name:"",email:"",user_id:""},);
  }
}
