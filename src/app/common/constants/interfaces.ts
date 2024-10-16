export interface Location {
    name: string,
    lat: number,
    lng: number
}

export interface locationsOpts {
    location: Location | undefined,
    keyword: string | undefined
}