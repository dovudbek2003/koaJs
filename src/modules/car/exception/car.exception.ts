export class CarNotFound extends Error {
    statusCode: number;
    constructor() {
        super("Car Not Found")
        this.statusCode = 404
    }
}

export class CarAlreadyExist extends Error{
    statusCode: number;
    constructor() {
        super("Car Already Exist")
        this.statusCode = 400
    }
}