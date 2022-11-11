import { Badge, Box, Grid } from "@mui/material";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./LandingNavbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AspectRatio } from "@mui/joy";
import logo from "../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { clearCart } from "../../redux/actions/cartAction";

const LandingNavbar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.data);

  // useEffect(() => {
  //   if (user?.name) {
  //     console.log("data");
  //   } else {
  //     alert("session expired!");
  //     Navigate("/signin");
  //   }
  // }, []);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Grid
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3 style={{ minHeight: "8vh", width: "100%" }} className="flex">
        FASHION
      </h3>
      <List>
        <Divider />
        <Link to="/">
          <ListItem key={"Shirts"} disablePadding>
            <ListItemButton>
              <ListItemIcon>{<ArrowForwardIosIcon />}</ListItemIcon>
              <ListItemText primary={"SHIRTS"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/signin">
          <ListItem key={"SIGN IN"} disablePadding>
            <ListItemButton>
              <ListItemIcon>{<ArrowForwardIosIcon />}</ListItemIcon>
              <ListItemText primary={"SIGNIN"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/signup">
          <ListItem key={"SIGN UP"} disablePadding>
            <ListItemButton>
              <ListItemIcon>{<ArrowForwardIosIcon />}</ListItemIcon>
              <ListItemText primary={"SIGN UP"} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Link>
        <Link to="/cart">
          <ListItem key={"CART"} disablePadding>
            <ListItemButton>
              <ListItemIcon>{<ArrowForwardIosIcon />}</ListItemIcon>
              <ListItemText primary={"CART"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
      </List>
    </Grid>
  );
  return (
    <>
      <Grid container className="mainNavbar">
        <Box
          item
          container
          md={0.5}
          sx={{ display: { xs: "none", md: "block" } }}
        ></Box>
        <Grid
          item
          container
          md={1.5}
          xs={10}
          style={{ height: "100%", color: "BLACK" }}
          className="flex"
        >
          {" "}
          <AspectRatio
            className="images"
            ratio="1"
            sx={{
              minWidth: 40,
              borderRadius: "sm",
              overflow: "auto",
            }}
          >
            <img
              // style={{ background: "black", margin: "10px 0px" }}
              height="100%"
              width="100%"
              src={logo}
              // srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              alt={"item.titl"}
            />
          </AspectRatio>{" "}
          <b>FASHION</b>
        </Grid>
        <Box
          item
          container
          md={4}
          sx={{ display: { xs: "none", md: "block" } }}
        ></Box>
        <Box
          item
          container
          sx={{
            display: { xs: "none", md: "flex" },
            width: "50%",
            marginLeft: "30%",
          }}
          style={{ height: "100%" }}
        >
          <Grid item md={12} className="flex menuOptions">
            <Button style={{ color: "black" }}>
              <Link to="/" style={{ fontSize: "15px" }}>
                <b>SHIRTS</b>
              </Link>
            </Button>
            <Button style={{ color: "black" }}>
              <Link to="/signin" style={{ fontSize: "15px" }}>
                <b>SIGN IN</b>
              </Link>
            </Button>
            <Button style={{ color: "black", fontSize: "15px" }}>
              <Link to="/signup" style={{ fontSize: "15px" }}>
                <b>SIGN UP</b>
              </Link>
            </Button>
            <Button style={{ color: "black", fontSize: "15px" }}>
              <Link to="/product/list" style={{ fontSize: "15px" }}>
                {user?.userType == "Vendor" ? (
                  <b>PRODUCTS</b>
                ) : (
                  <Badge color="secondary" badgeContent={cart?.length}>
                    <b>CART</b>
                  </Badge>
                )}
              </Link>
            </Button>

            {user?.name ? (
              <>
                <Grid sx={{ background: "GREY" }}>
                  <Button style={{ color: "white", fontSize: "15px" }}>
                    <b>{user.name}</b>
                  </Button>
                  <Button
                    style={{
                      color: "white",
                      fontSize: "15px",
                      background: "Maroon",
                    }}
                    onClick={() => {
                      logout(dispatch);
                      clearCart(dispatch);
                      Navigate("/");
                    }}
                  >
                    <b>SIGN OUT</b>
                  </Button>
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>
        </Box>
        <Box
          item
          container
          xs={2}
          display={{ md: "none" }}
          style={{ height: "100%" }}
        >
          <Box
            item
            xs={12}
            display={{ md: "none" }}
            style={{ height: "100%" }}
            className="flex menuOptions"
          >
            <span onClick={toggleDrawer("right", true)}>
              <MenuIcon style={{ fontSize: "32px" }} />
            </span>
          </Box>
        </Box>
        <Box
          item
          container
          md={1}
          sx={{ display: { xs: "none", md: "block" } }}
        ></Box>
        <div>
          {["left", "right", "top", "bottom"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </Grid>
    </>
  );
};

export default LandingNavbar;
