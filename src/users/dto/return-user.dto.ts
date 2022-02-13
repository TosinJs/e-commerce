import { Address } from "../schemas/user.schema";

export class ReturnUserDto {
    id: string;
    username: string;
    seller: boolean;
    address: Address;
}