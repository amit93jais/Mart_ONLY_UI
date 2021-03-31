
export class Address {
    id : number;
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    landMark: string;
    city: string;
    postalCode: string;
    state: string;
    mobileNumber:string;
    alternateMobileNumber: string;
    addressType: string;
    isDefault: boolean;
    userId:number;

    constructor(fullName: string, mobileNumber:string, addressLine1: string, addressLine2: string, landMark: string,
        city: string, postalCode: string, state: string, alternateMobileNumber:string,
        addressType: string){
            this.fullName = fullName;
            this.mobileNumber = mobileNumber;
            this.addressLine1 = addressLine1;
            this.addressLine2 = addressLine2;
            this.landMark = landMark;
            this.city = city;
            this.postalCode = postalCode;
            this.state = state;
            this.alternateMobileNumber =alternateMobileNumber;
            this.addressType = addressType;

    }

}
