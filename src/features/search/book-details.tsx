import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../book/types/book';
import { fetchBooks as fetchBooksFromFilter } from './lib/search-filter';

export const BookDetails = () => {
    const { isbn } = useParams<{ isbn: string }>();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const books = await fetchBooksFromFilter({ isbn });
                if (books && books.length > 0) {
                    setBook(books[0]);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [isbn]);

    if (!book) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Buchdetails
                </Typography>
                <Typography variant="body1">Lade Buchdetails...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Buchdetails
            </Typography>
            <Typography variant="body1">
                Buchtitel: {book.titel.titel}
            </Typography>
            <Typography variant="body1">ISBN: {book.isbn}</Typography>
            <Typography variant="body1">
                Buch kann{' '}
                {book.lieferbar ? 'geliefert werden' : 'nicht geliefert werden'}
            </Typography>
            <Typography variant="body1">Art: {book.art}</Typography>
            <Typography variant="body1">
                Schlagwörter:{' '}
                {book.schlagwoerter ? book.schlagwoerter.join(', ') : 'Keine'}
            </Typography>
            <Typography variant="body1">Preis: {book.preis}</Typography>
            <Typography variant="body1">Rabatt: {book.rabatt}</Typography>
            <Typography variant="body1">Datum: {book.datum}</Typography>
            <Typography variant="body1">
                Homepage:{' '}
                <a
                    href={book.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {book.homepage}
                </a>
            </Typography>
        </Container>
    );
};
