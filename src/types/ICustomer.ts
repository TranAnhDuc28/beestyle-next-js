interface ICustomer{
    id: number,
    fullName: string,
    password: string,
    dateOfBirth: Date,
    gender: string,
    phoneNumber: string,
    email: string,
    status: number,
    addresses: any,
    createdAt?: string,
    updatedAt?: string,
}