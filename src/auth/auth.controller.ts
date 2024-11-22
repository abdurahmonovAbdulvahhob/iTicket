import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SignInDto } from "./dto/signIn.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign up for the new user" })
  @ApiResponse({
    status:201,
    description: "ro'yxatdan o'tdi",
    type:String,
  })
  @Post("signup")
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUp(createAdminDto);
  }

  @ApiOperation({ summary: "Sign in for the signed up user" })
  @HttpCode(200)
  @Post("signin")
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
