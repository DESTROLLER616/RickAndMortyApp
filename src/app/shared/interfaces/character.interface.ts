export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    image: string;
    gender: string;
    created: string;
    origin:  {
        name: string;
        url: string;
    }
    location: {
        name: string;
        url: string;
    }
    episode: string[];
}