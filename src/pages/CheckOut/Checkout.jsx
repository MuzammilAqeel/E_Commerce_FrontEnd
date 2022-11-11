import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { imageUrl, url } from "../../baseUrl";
import DatatablePage from "../../components/DataTable/DataTable";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
// import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import {
  darkButton,
  darkText,
  lightBackground,
  lightText,
  white,
} from "../../assets/Theme/ThemeColors";
import { useDispatch, useSelector } from "react-redux";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import BasicSelect from "../../Components/CustomSelect/Select";
import { Category } from "@mui/icons-material";
// import FormDialog from "../../Components/Popup/Popup";
// import CustomImage from "../../Components/Image/CustomImage";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { clearCart } from "../../redux/actions/cartAction";

const Checkout = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const state = useSelector((state) => state.user?.data);
  const cart = useSelector((state) => state.cart?.data);
  console.log("state", state);

  useEffect(() => {
    if (state?.userType == "Customer") {
      console.log("data");
    } else if (state?.userType == "Vendor") {
      console.log("data");
      Navigate("/product/list");
    } else {
      alert("session expired!");
      Navigate("/signin");
    }
  }, []);
  const totalAmount = () => {
    let amount = 0;
    cart.map((am) => {
      amount = amount + am.price;
    });
    return amount;
  };

  useEffect(() => {
    if (state?.userType == "Customer") {
      console.log("data");
    } else if (state?.userType == "Vendor") {
      console.log("data");
      Navigate("/product/list");
    } else {
      alert("session expired!");
      Navigate("/signin");
    }
  }, []);

  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [category, setCategory] = useState("animations");
  const [subCategory, setSubCategory] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState();

  const [categoryOpt, setCategoryOpt] = useState([
    {
      key: "animation",
      value: "Animation",
    },
    {
      key: "illustrations",
      value: "Illustrations",
    },
    {
      key: "graphicdesigning",
      value: "Graphic Designing",
    },
    {
      key: "bookillustration",
      value: "Book Illustration",
    },
  ]);
  const [subCategoryOpt, setSubCategoryOpt] = useState([
    {
      key: "animation",
      value: "Animation",
    },
    {
      key: "illustrations",
      value: "Illustrations",
    },
    {
      key: "graphicdesigning",
      value: "Graphic Designing",
    },
    {
      key: "bookillustration",
      value: "Book Illustration",
    },
  ]);
  let navigate = useNavigate();
  // const navigate = useNavigate();
  const handleClickOpen = (item) => {
    setSelectedContent({
      ...item,
    });
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);

    getAllContent();
  };
  const columns = [
    {
      label: "Action",
      field: "action",
      sort: "asc",
      width: 100,
    },
    {
      label: "Category",
      field: "categoryType",
      sort: "asc",
      width: 100,
    },
    {
      label: "Sub Category",
      field: "subCategory",
      sort: "asc",
      width: 100,
    },
    {
      label: "Sub Category",
      field: "subCategory",
      sort: "asc",
      width: 100,
    },

    {
      label: "updated At",
      field: "updatedAt",
      sort: "asc",
      width: 200,
    },

    {
      label: "Content",
      field: "content",
      sort: "asc",
      width: 250,
    },
  ];
  useEffect(() => {
    getAllContent();
  }, []);

  const getAllContent = async () => {
    try {
      setIsLoaded(true);
      const response = await axios
        .get(
          `${BASE_URL}/project/filterProjects?category=${"illustrations"}&subCategory=${"logo"}`
        )
        .then((data) => {
          console.log("data images", data.data.data);

          setData({
            columns,
            rows: data.data.data.map((item) => ({
              ...item,
              updatedAt: item.updatedAt.split("T")[0],
              // content: (
              //   // <img
              //   //   src={imageUrl + item.fileData[0]}
              //   //   style={{ height: "40px", width: "50px", borderRadius: "5px" }}
              //   // />
              //   // <CustomImage url={imageUrl + item.fileData[0]} />
              // ),
              action: (
                <>
                  <span
                    onClick={(e) => {
                      handleClickOpen(item);
                    }}
                    style={{ color: `${lightBackground}`, cursor: "pointer" }}
                    title="Upload New File"
                  >
                    <CloudUploadIcon />
                  </span>
                </>
              ),
            })),
          });
          setIsOpen(true);
          setMessage("Data Loaded!");
          setSeverity("success");
          setIsLoaded(false);
        });
    } catch (error) {
      console.log("error", error.message);
      setIsLoaded(false);
      setIsOpen(true);
      setMessage(error.message);
      setSeverity("error");
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <LandingNavbar />
      <Container
        style={{
          maxWidth: "100%",
          padding: "0px",
          overflowY: "scroll",
          height: "100vh",
          paddingTop: "9vh",
        }}
      >
        <Paper fullWidth sx={{ m: 1, p: 2, maxWidth: "100%" }}>
          <Grid>
            <Typography variant="h6" gutterBottom>
              Customer Name : {state.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Customer Email : {state.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              No of products : {cart?.length}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total amount : {totalAmount()} $
            </Typography>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end" }}
              xs={6}
            >
              <Button
                variant="contained"
                sx={{ background: "maroon", color: "white", mr: 2 }}
                onClick={() => {
                  Navigate("/");
                  clearCart(dispatch);
                  alert("Thank you for order!");
                }}
              >
                Pay now
              </Button>
              <Button
                variant="contained"
                sx={{ background: "maroon", color: "white", mr: 2 }}
                onClick={() => {
                  clearCart(dispatch);
                  alert("Thank you for order!");
                  Navigate("/");
                }}
              >
                Cash on delivery
              </Button>
              <Button
                variant="outlined"
                sx={{ border: "2px solid maroon", color: "maroon" }}
                onClick={() => {
                  Navigate("/");
                  clearCart(dispatch);
                }}
              >
                cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      {/* <FormDialog
          open={openDialog}
          handleClose={handleClose}
          selectedContent={selectedContent}
        />
        <CustomizedSnackbars
          isOpen={isOpen}
          severity={severity}
          message={message}
        /> */}
    </>
  );
};

export default Checkout;
