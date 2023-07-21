import React, { useState, useEffect } from "react"
import "./App.css"
import { Container } from "@mui/material"
import { initData, validationErr } from "./components/constants"
import { Header } from "./components/Header"

import { BookList } from "./components/BooksList"
import { AddBookForm } from "./components/AddBookForm"
import { Search } from "./components/Search"

function App() {
  const [bookData, setBookData] = useState([])
  const [records, setRecords] = useState([])
  const [newBookData, setNewBook] = useState(initData)
  const [formErrors, setFormErrors] = useState(validationErr)

  const url = "http://localhost:4000/books"

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBookData(data)
        setRecords(data)
      })
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const addBook = () => {
    if (!validateForm()) {
      return
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBookData),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setBookData([...bookData, result])
        setRecords([...records, result])
        setNewBook({
          name: "",
          description: "",
          price: "",
          discount: "",
          imageUrl: "",
        })
      })
  }

  const setNewBookValues = (e, inputLabel) => {
    if (newBookData.hasOwnProperty(inputLabel)) {
      setNewBook({ ...newBookData, [inputLabel]: e.target.value })
    }
  }
  const validateForm = () => {
    const errors = {
      name:
        newBookData.name.trim() === "" || newBookData.name.trim() === undefined,
      description:
        newBookData.description.trim() === "" ||
        newBookData.description.trim() === undefined,
      price: newBookData.price === "" || isNaN(newBookData.price),
    }

    setFormErrors(errors)
    return !Object.values(errors).some((error) => error)
  }

  const searchFilter = (e) => {
    let searchTerm = ""
    searchTerm = e.target.value.toLowerCase()

    if (searchTerm.length >= 3) {
      setRecords(
        bookData.filter((book) =>
          Object.values(book).some(
            (field) =>
              typeof field === "string" &&
              field.toLowerCase().includes(searchTerm)
          )
        )
      )
    } else {
      setRecords(bookData)
    }
  }

  const deleteBook = (id) => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        setBookData((prevData) => prevData.filter((book) => book.id !== id))
        setRecords((prevRecords) =>
          prevRecords.filter((book) => book.id !== id)
        )
      })
      .catch((error) => console.error("Error deleting book:", error))
  }

  const editBook = (id, updatedBookData) => {
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedBookData),
    })
      .then((resp) => resp.json())
      .then(() => {
        setBookData((prevData) =>
          prevData.map((book) => (book.id === id ? updatedBookData : book))
        )
        setRecords((prevRecords) =>
          prevRecords.map((book) => (book.id === id ? updatedBookData : book))
        )
      })
      .catch((error) => console.error("Error editing book:", error))
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: "1rem" }}>
        <Search onChange={searchFilter} />

        <AddBookForm
          newBookData={newBookData}
          formErrors={formErrors}
          setNewBookValues={setNewBookValues}
          addBook={addBook}
          setFormErrors={setFormErrors}
        />

        <BookList books={records} deleteBook={deleteBook} editBook={editBook} />
      </Container>
    </>
  )
}

export default App
