export class User {
    id : number;
    firstName : string;
    lastName : string;
    mobileNumber: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor()

    constructor(mobileNumber: string, password: string)

    constructor(mobileNumber: string, password: string, firstName: string,  lastName: string,
        email: string, confirmPassword: string)

    constructor(mobileNumber?: string,password?: string, firstName?: string, lastName?: string,
        email?: string, confirmPassword?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
