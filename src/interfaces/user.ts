export interface User{
    id: number,
    firstName: string,
    lastName: string,
    active: boolean,
    authenticationPortalID: number,
    imageURL:string,
    email: string,
    password?: string
}