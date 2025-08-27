import { useState, useEffect } from "react";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import { getOrders, deleteOrder, updateOrder } from "../utils/api_orders";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import Swal from "sweetalert2";

const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        // putting the data into orders state
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page load

  const getTotal = (order) => {
    if (Array.isArray(order?.products)) {
      return order.products.reduce(
        (sum, p) => sum + (p.price || 0) * (p.quantity || 1),
        0
      );
    }
    return 0;
  };

  const handleUpdate = async (_id, status) => {
    try {
      await updateOrder(_id, status);
      toast.success("Product has been updated");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handleDelete = async (_id) => {
    await deleteOrder(_id);

    const updateOrders = await getOrders(_id);
    setOrders(updateOrders);

    toast.success("Product has been deleted");
  };

  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customers</TableCell>
                <TableCell align="right">Products</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Payment Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.customerName}
                      <br />({order.customerEmail})
                    </TableCell>
                    <TableCell>
                      {Array.isArray(order?.products) && order.products.length
                        ? order.products.map((p) => (
                            <Box key={p._id || p.name} sx={{ mb: 0.5 }}>
                              {p.name}
                            </Box>
                          ))
                        : "—"}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {getTotal(order).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={order.status}
                          label="Status"
                          onChange={(event) =>
                            handleUpdate(order._id, event.target.value)
                          }
                          disabled={order.status === "pending" ? true : false}
                        >
                          <MenuItem value={"pending"} disabled>
                            Pending
                          </MenuItem>
                          <MenuItem value={"paid"}>Paid</MenuItem>
                          <MenuItem value={"failed"}>Failed</MenuItem>
                          <MenuItem value={"completed"}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">{order.paid_at}</TableCell>
                    <TableCell>
                      {order.status === "pending" ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            handleDelete(order._id);
                          }}
                        >
                          Delete
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    No product has been added to order yet
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrdersPage;
