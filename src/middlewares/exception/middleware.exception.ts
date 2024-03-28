export class AuthorizationTokenRequiredException extends Error {
    statusCode: number;
    constructor() {
        super("token must be required");

        this.statusCode = 401;
    }
}
export class AuthorizationUserIdRequiredException extends Error {
    statusCode: number;
    constructor() {
        super("userId must be required");

        this.statusCode = 401;
    }
}
export class ForbidenAdminRoleException extends Error {
    statusCode: number;
    constructor() {
        super("Forbidden admin role");

        this.statusCode = 403;
    }
}
