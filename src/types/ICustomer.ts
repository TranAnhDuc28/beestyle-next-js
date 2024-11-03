interface ICustomer{
    id: number,
    fullName: string,
    password: string,
    dateOfBirth?: Date,
    gender: string,
    phoneNumber: string,
    email: string,
    status: string,
    addresses: any,
    createdAt?: Date,
    updatedAt?: Date,
}