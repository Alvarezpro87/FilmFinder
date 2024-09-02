import { ReactNode } from "react";

export interface Movie {
    releaseDate: ReactNode;
    id?: number; 
    title: string;
    posterPath: string;
    rating: number;
}
