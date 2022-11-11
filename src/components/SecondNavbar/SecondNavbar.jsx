import { Box, Grid } from "@mui/material";
import React from "react";
import "./SecondNavbar.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  {key:"logo", value:"Logo"},
  {key:"tshirt", value:"T-Shirt"},
  {key:"banner", value:"Banner"},
  {key:"businesscard", value:"Business Card"},
  {key:"brandidentity", value:"Brand Identity"},
  {key:"socialmediapost", value:"Social Media Post"},

  // 'Logo', 'T-shirt', 'Banner', 'Business Card', 'Brand identity', 'Social media post'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SecondNavbar = ({ setSubCategory, subCategory }) => {
  const [personName, setPersonName] = React.useState('Logo');
  const theme = useTheme();
  const handleChange = (e) => {
    console.log(e)
    setPersonName(e.target.value)
    names.map((item) =>{
      if(item.value === e.target.value){
        setSubCategory(item.key)
      }
    })
  };




  return (
    <Grid container className="secondNav flex">
      <Box display={{ xs: "none", md: "block" }} className="flex">
        <button item onClick={() => setSubCategory("logo")} className={subCategory === 'logo' ? "secondNavButton" : "secondNavButtonShadow "}>
          LOGO
        </button>
        <button item onClick={() => setSubCategory("tshirt")} className={subCategory === 'tshirt' ? "secondNavButton" : "secondNavButtonShadow "}>
          T-shirt
        </button>
        <button item onClick={() => setSubCategory("banner")} className={subCategory === 'banner' ? "secondNavButton" : "secondNavButtonShadow "}>
          Banner
        </button>
        <button item onClick={() => setSubCategory("businesscard")} className={subCategory === 'businesscard' ? "secondNavButton" : "secondNavButtonShadow "}>
          Business Card
        </button>
        <button item onClick={() => setSubCategory("brandidentity")} className={subCategory === 'brandidentity' ? "secondNavButton" : "secondNavButtonShadow "}>
          Brand identity
        </button>
        <button item onClick={() => setSubCategory("socialmediapost")} className={subCategory === 'socialmediapost' ? "secondNavButton" : "secondNavButtonShadow "}>
          Social media post
        </button>
      </Box>
      <Box display={{ xs: "block", md: "none" }} className="flex" >
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Sub category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Sub category" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name.key}
                  value={name.value}
                  style={getStyles(name.key, personName, theme)}
                >
                  {name.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </Grid>
  );
};

export default SecondNavbar;
