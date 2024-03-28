import { UserEntity } from "../entity/user.entity";

export interface ILoginData {
    user: UserEntity;
    token: string;
}