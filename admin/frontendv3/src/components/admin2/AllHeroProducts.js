import * as React from "react";
import PropTypes from "prop-types";
import { format } from "timeago";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import url from "../../config";
import { useState, useEffect } from "react";
import { slide } from "react-slideshow-image";
import Button from "@mui/material/Button";
import Timestamp from "react-timestamp";
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  pauseOnHover: true,
};
function AllHeroProducts() {
  var [AllHeroProductsData, setAllHeroProductsData] = useState("");
  const [refresh, setrefresh] = useState(0);
  useEffect(() => {
    axios.get(`${url}/api/v1/app/heros`).then((res) => {
      setAllHeroProductsData(res.data.data);
    });
  }, [refresh]);

  function handeldeDelete(ProductId) {
    var data = {
      token: localStorage.getItem("admin"),
      id: ProductId,
    };
    axios
      .delete(`${url}/api/v1/app/heros/${ProductId}`, { data })
      .then((res) => {
        console.log(ProductId);
        setrefresh(refresh + 1);
      });
  }


  return (
    <>
      {AllHeroProductsData &&
        AllHeroProductsData.map((row) => (
          <Grid item xs={12} md={11} mb={5}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {row.name}
                  </Typography>
                  <br />

                  <Typography variant="subtitle1" color="text.secondary">
                    Id: {row._id}
                  </Typography>
                  <Typography>
                    <br />

                    <Button
                      onClick={(e) => handeldeDelete(row.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  image={row.image}
                  alt={row.name}
                />
              </Card>
            </CardActionArea>
          </Grid>
        ))}
    </>
  );
}

export default AllHeroProducts;
