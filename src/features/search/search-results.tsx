import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import SearchBookButton from './search-book-button';
import { SearchCriteria } from './types/search';
import { Book } from '../book/types/book';

export const SearchResults = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);

  const fetchBooks = async (criteria: SearchCriteria) => {
    try {
      const { data } = await axios.get<{ _embedded: { buecher: Book[] } }>('https://localhost:3000/rest');
      let filteredBooks = data._embedded.buecher;

      if (criteria.isbn) {
        filteredBooks = filteredBooks.filter((book) => criteria.isbn && book.isbn.includes(criteria.isbn));
      }
      if (criteria.title) {
        filteredBooks = filteredBooks.filter((book) => criteria.title && book.titel.titel.includes(criteria.title));
      }
      if (criteria.rating) {
        filteredBooks = filteredBooks.filter((book) => criteria.rating && book.rating === parseInt(criteria.rating, 10));
      }
      if (criteria.tsChecked) {
        filteredBooks = filteredBooks.filter((book) => book.schlagwoerter?.includes('TYPESCRIPT'));
      }
      if (criteria.jsChecked) {
        filteredBooks = filteredBooks.filter((book) => book.schlagwoerter?.includes('JAVASCRIPT'));
      }
      if (criteria.format) {
        filteredBooks = filteredBooks.filter((book) => book.art === criteria.format);
      }

      setBooks(filteredBooks);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <Container>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <SearchBookButton onSearch={fetchBooks} />
      {showResults && (
        <>
          <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
            Suchergebnisse
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Art</TableCell>
                  <TableCell>Preis</TableCell>
                  <TableCell>Rabatt</TableCell>
                  <TableCell>Lieferbar</TableCell>
                  <TableCell>Datum</TableCell>
                  <TableCell>Homepage</TableCell>
                  <TableCell>Schlagwörter</TableCell>
                  <TableCell>Titel</TableCell>
                  <TableCell>Untertitel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.isbn}>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>
                      <Rating
                        name={`rating-${book.isbn}`}
                        value={book.rating}
                        precision={0.5}
                        readOnly
                      />
                    </TableCell>
                    <TableCell>{book.art}</TableCell>
                    <TableCell>{book.preis}</TableCell>
                    <TableCell>{book.rabatt}</TableCell>
                    <TableCell>{book.lieferbar ? 'Ja' : 'Nein'}</TableCell>
                    <TableCell>{book.datum}</TableCell>
                    <TableCell>
                      <a href={book.homepage} target="_blank" rel="noopener noreferrer">
                        {book.homepage}
                      </a>
                    </TableCell>
                    <TableCell>{book.schlagwoerter ? book.schlagwoerter.join(', ') : ''}</TableCell>
                    <TableCell>{book.titel.titel}</TableCell>
                    <TableCell>{book.titel.untertitel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};
