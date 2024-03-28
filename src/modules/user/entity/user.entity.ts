import { Role } from "../../../common/enums/role";
import { UserDto } from "../dto/user-create.dto";

export class UserEntity {
  id: number = 0;
  balance: number;
  role: Role;
  phone_number: string;
  password: string;

  constructor(dto: UserDto) {
    this.balance = dto.balance;
    this.role = dto.role;
    this.password = dto.password;
    this.phone_number = dto.phoneNumber;
  }

  static builder(dto: UserDto) {
    return new UserEntity(dto);
  }
}
