export interface Address {
    id?: string,
    name: string,
    physicalAddress: string,
    locationInstructions: string,
    deliveryInstructions: string,
    latitude: string,
    longitude: string,
    label: string,
    isDefault: boolean
}