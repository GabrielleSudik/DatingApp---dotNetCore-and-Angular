// created lesson 83
// this model will be the same (in TS) as the
// UserForListDto in the API
// and UserForDetailsDto.

import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;

    // these 4 are for the details. And they are optional.
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[]; // need to create the Photo interface. Because it's a type. And import it.
}
