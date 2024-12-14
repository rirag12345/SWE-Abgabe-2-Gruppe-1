import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import { Book } from '../book/types/book';
import { fetchBooks as fetchBooksFromFilter } from './lib/search-filter';
import { SearchBookButton } from './search-book-button';
import { SearchCriteria } from './types/search';

export const SearchResults = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(
    null,
  );

  useEffect(() => {
    if (!searchCriteria) return;

    const fetchBooks = async () => {
      try {
        const filteredBooks = await fetchBooksFromFilter(searchCriteria);
        if (filteredBooks) {
          setBooks(filteredBooks);
          setShowResults(true);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    void fetchBooks();
  }, [searchCriteria]);

  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <Container>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <SearchBookButton onSearch={handleSearch} />
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
                      <a
                        href={book.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {book.homepage}
                      </a>
                    </TableCell>
                    <TableCell>
                      {book.schlagwoerter ? book.schlagwoerter.join(', ') : ''}
                    </TableCell>
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
