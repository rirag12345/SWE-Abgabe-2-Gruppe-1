import axios from 'axios';
import { Book } from '../../book/types/book';
import { SearchCriteria } from '../types/search';

export const fetchBooks = async (criteria: SearchCriteria) => {
    try {
        const { data } = await axios.get<{ _embedded: { buecher: Book[] } }>(
            'https://localhost:3000/rest',
        );
        let filteredBooks = data._embedded.buecher;

        if (criteria.isbn) {
            filteredBooks = filteredBooks.filter(
                (book) => criteria.isbn && book.isbn.includes(criteria.isbn),
            );
        }
        if (criteria.title) {
            filteredBooks = filteredBooks.filter(
                (book) =>
                    criteria.title && book.titel.titel.includes(criteria.title),
            );
        }
        if (criteria.rating) {
            filteredBooks = filteredBooks.filter(
                (book) =>
                    criteria.rating &&
                    book.rating === parseInt(criteria.rating, 10),
            );
        }
        if (criteria.tsChecked) {
            filteredBooks = filteredBooks.filter((book) =>
                book.schlagwoerter?.includes('TYPESCRIPT'),
            );
        }
        if (criteria.jsChecked) {
            filteredBooks = filteredBooks.filter((book) =>
                book.schlagwoerter?.includes('JAVASCRIPT'),
            );
        }
        if (criteria.pyChecked) {
            filteredBooks = filteredBooks.filter((book) =>
                book.schlagwoerter?.includes('PYTHON'),
            );
        }
        if (criteria.jaChecked) {
            filteredBooks = filteredBooks.filter((book) =>
                book.schlagwoerter?.includes('JAVA'),
            );
        }
        if (criteria.art) {
            filteredBooks = filteredBooks.filter(
                (book) => book.art === criteria.art,
            );
        }
        if (criteria.lieferbar !== undefined) {
            filteredBooks = filteredBooks.filter(
                (book) => book.lieferbar === criteria.lieferbar,
            );
        }
        return filteredBooks;
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Error fetching books');
    }
};
