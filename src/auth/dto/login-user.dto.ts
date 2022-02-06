import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @ApiProperty({description: "Unique Username"})
    @IsString()
    @IsNotEmpty({ message: "No Username/Password" })
    username: string;

    @ApiProperty({description: "Password Length > 6 Chars"})
    @IsString()
    @IsNotEmpty({ message: "No Username/Password"})
    password: string
}