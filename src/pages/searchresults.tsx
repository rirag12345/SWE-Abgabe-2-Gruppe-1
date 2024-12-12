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
import SearchBookButton from '../components/SearchBookButton';

const SearchResults = () => {
  interface Book {
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

  const [books, setBooks] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);

  interface SearchCriteria {
    isbn?: string;
    title?: string;
    rating?: string;
    tsChecked?: boolean;
    jsChecked?: boolean;
    format?: string;
  }

  const fetchBooks = async (criteria: SearchCriteria) => {
    try {
      const response = await axios.get<{ _embedded: { buecher: Book[] } }>('https://localhost:3000/rest');
      let filteredBooks: Book[] = response.data._embedded.buecher;

      if (criteria.isbn) {
        filteredBooks = filteredBooks.filter((book: Book) => criteria.isbn && book.isbn.includes(criteria.isbn));
      }
      if (criteria.title) {
        filteredBooks = filteredBooks.filter((book: Book) => criteria.title && book.titel.titel.includes(criteria.title));
      }
      if (criteria.rating) {
        filteredBooks = filteredBooks.filter((book: Book) => criteria.rating && book.rating === parseInt(criteria.rating, 10));
      }
      if (criteria.tsChecked) {
        filteredBooks = filteredBooks.filter((book: Book) => book.schlagwoerter?.includes('TYPESCRIPT'));
      }
      if (criteria.jsChecked) {
        filteredBooks = filteredBooks.filter((book: Book) => book.schlagwoerter?.includes('JAVASCRIPT'));
      }
      if (criteria.format) {
        filteredBooks = filteredBooks.filter((book: Book) => book.art === criteria.format);
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
      <SearchBookButton onSearch={fetchBooks} onReset={() => { setBooks([]); }} />
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

export default SearchResults;

