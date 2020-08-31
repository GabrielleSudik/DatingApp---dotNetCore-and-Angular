// lesson 83
// mimics PhotosForDetailsDto in API.

export interface Photo {
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
}
