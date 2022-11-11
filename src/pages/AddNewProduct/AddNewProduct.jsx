import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { lightBackground, white } from "../../assets/Theme/ThemeColors";
import { BASE_URL } from "../constants/constants";
// import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";

const AddNewProduct = () => {
  const Navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  console.log("state", user);

  useEffect(() => {
    if (user?.name) {
      console.log("data");
    } else {
      alert("session expired!");
      Navigate("/signin");
    }
  }, []);

  const [title, setTitle] = React.useState();
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState();
  const [fileData, setFileData] = React.useState([]);

  const [isClicked, setIsClicked] = React.useState(false);

  const handleSubmit = async () => {
    setIsClicked(true);
    let obj = {
      title,
      price,
      description,
      fileData,
    };
    console.log("submit", obj);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("fileData", fileData);

    if (title && price && description && fileData) {
      try {
        const response = await axios.post(
          `${BASE_URL}/project/addProject`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
          user.token
        );
        console.log("response", response);

        if (response.data.success) {
          alert("Product Added Successful.");
          setTimeout(() => {
            Navigate("/product/list");
          }, 2000);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("error");
      }
    } else {
      alert("Fill the following fields");
      setIsClicked(false);
    }
  };

  return (
    <>
      <Container
        style={{
          maxWidth: "100%",
          padding: "0px",
          overflowY: "scroll",
          height: "90vh",
        }}
      >
        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3, mr: 2, ml: 2 }}>
            <Grid container sx={{ mt: 1, p: 3 }}>
              <Typography variant="h5" color="Primary">
                Add new product
              </Typography>
            </Grid>
            <Grid container className="Row">
              <Grid item container md={4} xs={12} sx={{ p: 1 }}>
                <TextField
                  name="title"
                  label="Product Title"
                  type="text"
                  margin="normal"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item container md={4} xs={12} sx={{ p: 1 }}>
                <TextField
                  name="price"
                  label="Price"
                  type="text"
                  margin="normal"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item container md={4} xs={12} sx={{ p: 1 }}>
                <TextField
                  name="description"
                  label="Description"
                  type="text"
                  margin="normal"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item container md={4} xs={12} sx={{ p: 1 }}>
                <Input
                  name="image"
                  label="Select Product Image"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  type="file"
                  value={fileData[0]?.name}
                  onChange={(e) => {
                    setFileData(e.target.files[0]);
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end" }}
              xs={6}
            >
              <Button
                variant="contained"
                sx={{ background: "maroon", color: "white" }}
                disabled={isClicked}
                onClick={() => {
                  // Navigate("/product");
                  handleSubmit();
                }}
              >
                Post
              </Button>
              <Button
                variant="outlined"
                sx={{ border: "2px solid maroon", color: "maroon", ml: 2 }}
                onClick={() => {
                  Navigate("/product/list");
                }}
              >
                Back
              </Button>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AddNewProduct;
