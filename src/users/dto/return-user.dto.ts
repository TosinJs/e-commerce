import { Address } from "../schemas/user.schema";

export class ReturnUserDto {
    username: string;
    seller: boolean;
    address: Address;
}