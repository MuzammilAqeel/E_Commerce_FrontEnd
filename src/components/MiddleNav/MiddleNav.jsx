import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../pages/constants/constants';
import "./MiddleNav.css"
import CircularProgress from '@mui/material/CircularProgress';

const MiddleNav = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [category, setCategory] = useState("animation");
  const [subCategory, setSubCategory] = useState("2danimation");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/project/filterProjects?category=${category}&subCategory=${subCategory}`).then((response) => response.json()).then((data) => setAllFiles(data.data))
    setLoading(false);
  }, []);

  const categoryButtonClicked = async (param) => {
    setLoading(true)
    setSubCategory(param);
    await fetch(`${BASE_URL}/api/v1/project/filterProjects?category=${category}&subCategory=${param}`).then((response) => response.json()).then((data) => setAllFiles(data.data))
    setLoading(false)
  }

  return (
    <Grid container className="middleNavMain flex">
      <Grid xs={12} item style={{ height: '100%', background: 'white' }} className='flex'>

        <Grid md={6} xs={12} item style={{ height: '100%', background: 'white' }} className='flex'>
          <button
            className={subCategory === '2danimation' ? "middleNavButton" : "middleNavButtonShadow"}
            onClick={() => categoryButtonClicked('2danimation')} >2D Animation</button>
          <button
            className={subCategory === '3danimation' ? "middleNavButton" : "middleNavButtonShadow"}
            onClick={() => categoryButtonClicked('3danimation')} >3D Animation</button>
          <button
            className={subCategory === 'whiteboard' ? "middleNavButton" : "middleNavButtonShadow"}
            onClick={() => categoryButtonClicked('whiteboard')} >Whiteboard</button>
        </Grid>
      </Grid>
      <Grid item container className='gridPage flex' xs={12} >
        <Grid item container md={12} xs={11} style={{ height: "100%", justifyContent: "space-evenly", marginBottom: "20px" }} >
          {
            !loading ?
              allFiles.map((item, idx) => (
                <Grid item sm={3.8} xs={12} className="gridPageBox">
                  <img src={`${BASE_URL}${item.fileData[0]}`} alt={idx} id={idx} height="100%" width="100%" />
                </Grid>
              ))
              :
              <CircularProgress className='animationLoader' disableShrink />
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MiddleNav