import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getCart, deleteItemFromCart } from "../utils/cart";
import { useState, useEffect } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // start with empty card

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    deleteItemFromCart(id);
    setCartItems(getCart()); // update state
  };

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Title */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "700",
          }}
        >
          Cart
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="info"
            sx={{ mr: 1 }}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button variant="contained" color="primary">
            Cart
          </Button>
        </Box>
      </Box>

      {/* Cart Table */}
      {cartItems.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ my: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Typography>Tak ada bang</Typography>
                <TableCell colSpan={3} align="right">
                  <Typography variant="h6" fontWeight="bold">
                    Total:
                  </Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography variant="h6" fontWeight="bold">
                    ${grandTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Typography variant="h6" fontWeight="bold">
                    ${grandTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" color="primary" size="large">
              Checkout
            </Button>
          </Box>
        </TableContainer>
      )}
    </Container>
  );
};

export default CartPage;
