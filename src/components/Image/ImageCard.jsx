import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";

export default function MediaCard({
  title,
  description,
  price,
  imageUrl,
  data,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const state = useSelector((state) => state);
  console.log("state", state);
  console.log("first", title, description, price, imageUrl, data);

  const addCart = () => {
    if (state.cart?.data?.length > 0) {
      console.log("added");
      addToCart([...state.cart?.data, data], dispatch);
      alert("Product Added");
    } else {
      console.log("added 2");
      addToCart([data], dispatch);
      alert("Product Added");
    }
    console.log("added");
  };

  return (
    <Card
      sx={{
        minWidth: 345,
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <CardMedia component="img" height="200" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}{" "}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={user?.userType != "Customer"}
          onClick={addCart}
          size="small"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
