import { Container, Typography, Box, Rating, Paper } from '@mui/material';
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
        </Typography>
        <Typography variant="body1">Lade Buchdetails...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
        </Typography>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Buchtitel:</Typography>
          <Typography variant="body1">{book.titel.titel}</Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">ISBN:</Typography>
          <Typography variant="body1">{book.isbn}</Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Lieferbarkeit:</Typography>
          <Typography variant="body1">
            Buch kann {book.lieferbar ? 'geliefert werden' : 'nicht geliefert werden'}
          </Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Art:</Typography>
          <Typography variant="body1">{book.art}</Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Schlagwörter:</Typography>
          <Typography variant="body1">
            {book.schlagwoerter ? book.schlagwoerter.join(', ') : 'Keine'}
          </Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Preis:</Typography>
          <Typography variant="body1">{book.preis}</Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Rabatt:</Typography>
          <Typography variant="body1">{book.rabatt}</Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Datum:</Typography>
          <Typography variant="body1">{book.datum}</Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Homepage:</Typography>
          <Typography variant="body1">
            <a href={book.homepage} target="_blank" rel="noopener noreferrer">
              {book.homepage}
            </a>
          </Typography>
        </Box>
        <Box style={{ marginBottom: '10px' }}>
          <Typography variant="h6">Bewertung:</Typography>
          <Rating name="read-only" value={book.rating} precision={0.5} readOnly />
        </Box>
      </Paper>
    </Container>
  );
};
