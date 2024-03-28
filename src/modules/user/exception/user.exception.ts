export class UserNotFound extends Error {
    statusCode: number;
    constructor() {
        super('User Not Found')
        this.statusCode = 404
    }
}

export class UserAlreadyExist extends Error {
    statusCode: number;

    constructor() {
        super('User Already Exist')
        this.statusCode = 400
    }
}

export class LoginOrPasswordWrong extends Error {
    statusCode: number;

    constructor() {
        super('login or password wrong')
        this.statusCode = 400
    }
}