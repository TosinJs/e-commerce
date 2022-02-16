import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class Address {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    addr1: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    addr2?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    zip: string
}

export class CreateUserDto {

    @ApiProperty({description: "Unique Username"})
    @IsString()
    @IsNotEmpty({ message: "No Username/Password" })
    username: string;

    @ApiProperty({description: "Password Length > 6 Chars"})
    @IsString()
    @IsNotEmpty({ message: "No Username/Password"})
    password: string;

    @ApiProperty({description: "User Address"})
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    address: Address;
    
}
