import { Grid } from "@mui/material"
import { BooksItem } from "./BookItem"

export const BookList = ({ books, deleteBook, editBook, onBookClick }) => {
  const clickOnBook = (id) => {
    onBookClick(id)
  }
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <BooksItem
          key={book.id}
          bookItem={book}
          deleteBook={deleteBook}
          editBook={editBook}
          onBookClick={clickOnBook}
        />
      ))}
    </Grid>
  )
}
