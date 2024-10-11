export interface User {
    id: string
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
    isDeleted: boolean
    firstName: string
    lastName: string
    email: string
    isEmailVerified: boolean
    phone: string
    isPhoneVerified: boolean
    isSubscribedToHalalOffersNotification: boolean
    isSubscribedToHalalEventsNewsletter: boolean
    profilePictureWebUrl: string
    addresses: any
}

export const defaultUser: User = {
    id: "",
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
    isDeleted: false,
    firstName: "",
    lastName: "",
    email: "",
    isEmailVerified: false,
    phone: "",
    isPhoneVerified: false,
    isSubscribedToHalalOffersNotification: false,
    isSubscribedToHalalEventsNewsletter: false,
    profilePictureWebUrl: "",
    addresses: undefined
}