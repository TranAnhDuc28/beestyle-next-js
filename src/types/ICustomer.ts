interface ICustomer{
    id: number,
    fullName: string,
    password: string,
    dateOfBirth: string,
    gender: string,
    phoneNumber: string,
    email: string,
    status: string,
    addresses: any,
    createdAt?: string,
    updatedAt?: string,
}