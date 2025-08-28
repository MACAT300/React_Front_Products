import { useState } from "react";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Add category
  const handleAdd = () => {
    if (newCategory.trim() === "") return;
    setCategories([
      ...categories,
      { id: Date.now(), name: newCategory.trim() },
    ]);
    setNewCategory("");
  };

  // Delete category
  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Start editing
  const handleEdit = (cat) => {
    setEditId(cat.id);
    setEditValue(cat.name);
  };

  // Save edit
  const handleSave = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, name: editValue } : cat
      )
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <Container>
      <Header current="categories" title="Category" />
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>

      {/* Add Form */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          border: "1px solid #ccc",
          p: 2,
        }}
      >
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          ADD
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>
                  {editId === cat.id ? (
                    <TextField
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      size="small"
                    />
                  ) : (
                    cat.name
                  )}
                </TableCell>
                <TableCell>
                  {editId === cat.id ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleSave(cat.id)}
                      sx={{ mr: 1 }}
                    >
                      SAVE
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(cat)}
                      sx={{ mr: 1 }}
                    >
                      EDIT
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(cat.id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CategoriesPage;
