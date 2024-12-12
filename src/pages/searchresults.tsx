import { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
  }

  const fetchBooks = async (criteria: SearchCriteria) => {
    try {
      const response = await axios.get<{ _embedded: { buecher: Book[] } }>('https://localhost:3000/rest');
      let filteredBooks: Book[] = response.data._embedded.buecher;

      if (criteria.isbn) {
        filteredBooks = filteredBooks.filter((book: Book) => criteria.isbn && book.isbn.includes(criteria.isbn));
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
                    <TableCell>{book.rating}</TableCell>
                    <TableCell>{book.art}</TableCell>
                    <TableCell>{book.preis}</TableCell>
                    <TableCell>{book.rabatt}</TableCell>
                    <TableCell>{book.lieferbar ? 'Ja' : 'Nein'}</TableCell>
                    <TableCell>{book.datum}</TableCell>
                    <TableCell><a href={book.homepage} target="_blank" rel="noopener noreferrer">{book.homepage}</a></TableCell>
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
