import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import "./Home.css";
import MediaCard from "../../components/Image/ImageCard";
import axios from "axios";
import { BASE_URL, imgUrl } from "../constants/constants";

const Home = () => {
  // const products = [
  //   {
  //     pdid: "pd01",
  //     vendor: "vd01",
  //     title: "title",
  //     description: "description",
  //     imageUrl:
  //       "https://cdn.shopify.com/s/files/1/0553/3774/6621/products/MC2063-TPK_1_800x1000_crop_center.jpg?v=1650952005",
  //     price: 200,
  //   },
  //   {
  //     pdid: "pd02",
  //     vendor: "vd02",
  //     title: "title",
  //     description: "description",
  //     imageUrl:
  //       "https://cdn.shopify.com/s/files/1/0646/2563/9639/products/Blue-Vibrant-Floral-Printed-Shirt-Brumano-Pakistan-1_400x.jpg?v=1656324092",
  //     price: 200,
  //   },
  // ];

  var [isLoaded, setIsLoaded] = useState(false);
  var [products, setProducts] = useState();

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/project/getAll`);
      console.log("response", response);
      if (response.data.success) {
        setProducts(
          response.data.data.map((prod) => {
            return {
              ...prod,
              pdid: prod._id,
              imageUrl: `${imgUrl}/${prod.fileData[0]}`,
            };
          })
        );
        setIsLoaded(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <LandingNavbar />
      <Grid container xs={12} sx={{ paddingTop: "9vh", paddingBottom: "9vh" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Shirts
          </Typography>
        </Grid>
        {isLoaded ? (
          products.map((product) => (
            <Grid
              item
              xs={12}
              md={4}
              xl={3}
              sx={{
                display: "flex",
                justifyContent: "Center",
                alignItems: "center",
                pt: 2,
              }}
            >
              <MediaCard
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                data={product}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h3" gutterBottom>
            LOADING...
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Home;
