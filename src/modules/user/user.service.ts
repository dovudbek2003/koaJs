import { ResonseData } from "../../common/responseData";
import { hash, isMatch } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { ILoginDto, UserDto } from "./dto/user-create.dto";
import { UserEntity } from "./entity/user.entity";
import { LoginOrPasswordWrong, UserAlreadyExist, UserNotFound } from "./exception/user.exception";
import { ILoginData } from "./interfaces/user.interface";
import { UserRepository } from "./user.repository";

export class UserService {
  private readonly repository;
  constructor() {
    this.repository = new UserRepository();
  }

  async create(dto: UserDto) {
    const foundUser = await this.findByPhoneNumber(dto.phoneNumber)
    if (foundUser) {
      throw new UserAlreadyExist()
    }

    let entity = UserEntity.builder(dto);
    entity.password = hash(entity.password)
    const data = await this.repository.insert(entity);
    const token = generateToken({ id: data.id })
    const resData = new ResonseData<ILoginData>("created", 201, { user: data, token });
    return resData;
  }

  // READE
  async login(dto: ILoginDto) {
    const foundUser = await this.findByPhoneNumber(dto.phoneNumber)
    if (!foundUser) {
      throw new LoginOrPasswordWrong()
    }

    if (!isMatch(dto.password, foundUser.password)) {
      throw new LoginOrPasswordWrong()
    }

    const token = generateToken({ id: foundUser.id })

    return new ResonseData<ILoginData>('success', 200, { user: foundUser, token })
  }

  async findAll(): Promise<ResonseData<UserEntity[]>> {
    const users = await this.repository.findAll()
    return new ResonseData<UserEntity[]>('get all', 200, users)
  }

  async findOne(id: number): Promise<ResonseData<UserEntity>> {
    const foundUser = await this.repository.findById(id)
    if (!foundUser) {
      throw new UserNotFound()
    }

    return new ResonseData<UserEntity>('get one', 200, foundUser)
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserEntity | null> {
    return await this.repository.findByPhoneNumber(phoneNumber)
  }

  // UPDATE
  async update(id: number, updateUserDto: UserDto): Promise<ResonseData<UserEntity>> {
    const { data: foundUser } = await this.findOne(id)
    if (!foundUser) {
      throw new UserNotFound()
    }

    if (updateUserDto.phoneNumber) {
      const foundUserByPhoneNumber = await this.findByPhoneNumber(updateUserDto.phoneNumber)
      if (foundUserByPhoneNumber) {
        if (foundUserByPhoneNumber?.id !== id) {
          throw new UserAlreadyExist()
        }
      }
    }

    const newUser = Object.assign(foundUser, updateUserDto)
    newUser.phone_number = newUser.phoneNumber

    const updatedUser = await this.repository.update(id, newUser)
    console.log('updateUser', updatedUser);

    return new ResonseData<UserEntity>('update', 200, updatedUser)
  }

  // DELETE
  async remove(id: number): Promise<ResonseData<UserEntity>> {
    await this.findOne(id)
    const deletedUser = await this.repository.remove(id)
    return new ResonseData<UserEntity>('delete', 200, deletedUser)
  }
}
