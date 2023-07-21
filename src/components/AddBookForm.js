import React, { useState } from "react"
import { Box, Button, TextField } from "@mui/material"

export const AddBookForm = ({
  newBookData,
  formErrors,
  setNewBookValues,
  addBook,
  setFormErrors,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }

  const addBookComplate = () => {
    if (!isFormVisible) {
      toggleFormVisibility()
    } else {
      if (validateForm()) {
        addBook()
        toggleFormVisibility()
      }
    }
  }

  const cancelAddBook = () => {
    setNewBookValues({
      name: "",
      description: "",
      price: "",
      discount: "",
      imageUrl: "",
    })

    setFormErrors({
      name: false,
      description: false,
      price: false,
    })
    toggleFormVisibility()
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

  return (
    <>
      {!isFormVisible && (
        <Button variant="outlined" color="primary" onClick={addBookComplate}>
          Add Book
        </Button>
      )}

      {isFormVisible && (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Name"
            placeholder="Name"
            value={newBookData.name}
            onChange={(e) => setNewBookValues(e, "name")}
            error={formErrors.name}
            helperText={formErrors.name ? "Name is required." : ""}
            inputProps={{
              maxLength: 200,
            }}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            placeholder="Description"
            multiline
            rows={4}
            value={newBookData.description}
            onChange={(e) => setNewBookValues(e, "description")}
            error={formErrors.description}
            helperText={
              formErrors.description ? "Description is required." : ""
            }
            inputProps={{
              maxLength: 400,
            }}
          />
          <TextField
            required
            id="outlined-number"
            label="Price"
            placeholder="Price"
            value={newBookData.price}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setNewBookValues(e, "price")}
            error={formErrors.price}
            helperText={formErrors.price ? "Price is required." : ""}
          />
          <TextField
            id="outlined-number"
            label="Discount"
            placeholder="Discount"
            value={newBookData.discount}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setNewBookValues(e, "discount")}
          />
          <TextField
            label="Image URL"
            placeholder="Paste the image URL"
            value={newBookData.imageUrl}
            onChange={(e) => setNewBookValues(e, "imageUrl")}
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={addBookComplate}
              style={{ flexGrow: 1 }}
            >
              Add Book
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={cancelAddBook}
              style={{ flexGrow: 1 }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      )}
    </>
  )
}
