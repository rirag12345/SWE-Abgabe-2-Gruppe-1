export interface Book {
    isbn: string;
    rating: number;
    art: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter?: string[];
    titel: {
        titel: string;
        untertitel: string;
    };
}
