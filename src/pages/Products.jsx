import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Typography } from "@mui/material";
import { getProducts, deleteProduct } from "../utils/api_products";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");

  // useEffect
  useEffect(() => {
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        await deleteProduct(id);
        // delete product from the state
        setProducts(products.filter((p) => p._id !== id));
        toast.success("Product has been deleted");
      }
    });
  };

  const handleAddCart = (product) => {
    // 1. 先从 localStorage 拿已有的购物车
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. 判断是否已存在
    const existing = cart.find((p) => p._id === product._id);
    if (existing) {
      existing.quantity += 1; // 已有就数量+1
    } else {
      cart.push({ ...product, quantity: 1 }); // 新商品就加进去
    }

    // 3. 存回 localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 4. hint
    toast.success("Product added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to My Store
      </Typography>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="info"
          sx={{ mr: 1 }}
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/cart">
          Cart
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6">Products</Typography>
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">
              All Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="All Categories"
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Consoles">Consoles</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          component={Link}
          to="/products/new"
          variant="contained"
          color="success"
        >
          Add New
        </Button>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={product._id}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ minHeight: "64px" }}>
                  {product.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                  }}
                >
                  <Chip label={product.price} color="success" />
                  <Chip label={product.category} color="primary" />
                </Box>
              </CardContent>
              <CardActions sx={{ display: "block", px: 3, pb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    handleAddCart({
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                    });
                  }}
                >
                  Add To Cart
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                    marginLeft: "0px",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/products/${product._id}/edit`}
                    variant="contained"
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleProductDelete(product._id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {products.length === 0 ? (
        <Typography variant="h5" align="center" py={3}>
          No more products found.
        </Typography>
      ) : null}
      <Box
        sx={{
          pt: 2,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1 ? true : false} // the button will be disabled if the page is 1
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span>Page: {page}</span>
        <Button
          variant="contained"
          disabled={products.length < 1 ? true : false} // the button will be disabled if no more products
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
}
