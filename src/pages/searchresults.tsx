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

  const fetchBooks = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await axios.get('https://localhost:3000/rest');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      setBooks(response.data._embedded.buecher);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Suchergebnisse
      </Typography>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <SearchBookButton onSearch={fetchBooks} />
      {books.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '0px' }}>
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
      )}
    </Container>
  );
};

export default SearchResults;
