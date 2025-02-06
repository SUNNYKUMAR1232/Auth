export interface IGoogleProfile {
    id: string;
    emails: { value: string }[];
    displayName: string;
    photos: { value: string }[];
}