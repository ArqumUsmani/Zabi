export interface Location {
    name?: string,
    latitude: number,
    longitude: number
}

export interface locationsOpts {
    location: Location | undefined,
    keyword: string | undefined
}

export interface Country {
    name: string;
    iso2: string;
    dialCode: string;
    flag: string;
}

export interface Restaurant {
    location: Location,
    page?: number | null,
    pageSize?: number | null,
    keyword?: string,
    cuisine?: string | null,
    orderBy?: string,
    sortOrder?: string
}

export interface Cuisine {
    placeLocation: Location,
    orderBy?: string,
    sortOrder?: string
}