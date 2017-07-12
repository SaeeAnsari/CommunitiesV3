export interface Community {
    id:number;
    name:string;
    description?: string;
    imageURL?: string;
    lastUpdate?: Date;
    typeID: number;
    typeName: string;
    ownerID: number;
    ownerName: string;
    location: {
        lat: number;
        lng: number;
    }
}
