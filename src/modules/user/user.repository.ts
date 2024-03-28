import { PostgresDriver } from "../../lib/postgresDriver";
import { UserEntity } from "./entity/user.entity";

export class UserRepository extends PostgresDriver {
  async insert(userEntity: UserEntity): Promise<UserEntity> {
    return await this.fetch(
      "insert into users (balance, password, phone_number, role) values ($1, $2, $3, $4) returning *",
      userEntity.balance,
      userEntity.password,
      userEntity.phone_number,
      userEntity.role
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.fetchAll(
      `select * from users`
    )
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.fetch(
      `select * from users where id = $1`, id
    )
  }

  async findByPhoneNumber(phone_number: string): Promise<UserEntity | null> {
    return await this.fetch(
      `select * from users where phone_number = $1`, phone_number
    )
  }

  async update(id: number, userEntity: UserEntity): Promise<UserEntity> {
    return await this.fetch(
      `update users
      set phone_number = $2, password = $3, balance = $4, role = $5
      where id = $1 returning *`,
      id,
      userEntity.phone_number,
      userEntity.password,
      userEntity.balance,
      userEntity.role
    )
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.fetch(
      `delete from users where id = $1 returning *`, id
    )
  }
}
