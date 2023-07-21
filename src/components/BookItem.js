import React, { useState } from "react"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  TextField,
  Modal,
  Button,
  Box,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

export const BooksItem = ({ bookItem, deleteBook, editBook }) => {
  const { id, name, description, price, discount, imageUrl } = bookItem

  const [isEditing, setIsEditing] = useState(false)
  const [editedBookData, setEditedBookData] = useState({
    name,
    description,
    price,
    discount,
  })
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl)

  const editBookFn = () => {
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditedBookData({ name, description, price, discount })
    setEditedImageUrl(imageUrl)
  }

  const saveClick = () => {
    const editedBook = {
      ...editedBookData,
      imageUrl: editedImageUrl,
    }
    editBook(id, editedBook)
    setIsEditing(false)
  }

  const inputChange = (e) => {
    const { name, value } = e.target
    if (name === "imageUrl") {
      setEditedImageUrl(value)
    } else {
      setEditedBookData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }
 

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
     
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {discount && (
              <Typography variant="h6" component="h3">
                {discount}
              </Typography>
            )}
            <Typography variant="h6" component="h3">
              {name}
            </Typography>

            <CardActions>
              <IconButton
                color="primary"
                size="small"
                onClick={editBookFn}
                sx={{ marginRight: 1 }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="secondary"
                size="small"
                onClick={() => deleteBook(id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Box>

          {imageUrl && (
            <CardMedia
              component="img"
              alt={name}
              title={name}
              sx={{ height: 140, objectFit: "contain" }}
              src={imageUrl}
            />
          )}

          {!isEditing && (
            <CardContent>
              <Typography variant="h6" component="h3">
                {description}
              </Typography>
              <Typography variant="body1"> {price} </Typography>
            </CardContent>
          )}

          {isEditing && (
            <CardActions>
              <Modal open={isEditing} onClose={cancelEditing}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    padding: "20px",
                    width: "300px",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    align="center"
                    sx={{ marginBottom: 10 }}
                  >
                    Edit Book
                  </Typography>
                  <TextField
                    label="Name"
                    name="name"
                    value={editedBookData.name}
                    onChange={inputChange}
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={editedBookData.description}
                    onChange={inputChange}
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={editedBookData.price}
                    onChange={inputChange}
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Discount"
                    name="discount"
                    type="number"
                    value={editedBookData.discount}
                    onChange={inputChange}
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Image URL"
                    placeholder="Paste the image URL from the internet"
                    name="imageUrl"
                    value={editedImageUrl}
                    onChange={inputChange}
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <Button
                    variant="contained"
                    onClick={saveClick}
                    color="primary"
                    style={{ marginRight: "10px", marginTop: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={cancelEditing}
                    color="secondary"
                    style={{ marginTop: "10px" }}
                  >
                    Cancel
                  </Button>
                </div>
              </Modal>
            </CardActions>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}
