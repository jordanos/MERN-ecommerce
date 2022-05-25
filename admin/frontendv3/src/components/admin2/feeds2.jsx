import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import url from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";

import Timestamp from "react-timestamp";

import SearchIcon from "@mui/icons-material/Search";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";

export default function RecipeReviewCard() {
  // Axios
  const [feed, setFeed] = useState([]);
  const [reload, setReload] = useState(0);
  var [search, setSearch] = useState("");
  var [Variablefeed, setVaribleFeed] = useState([]);

  /*   useEffect(() => {
           axios.get(`${url}/api/v1/feeds`)
                .then(res => {
                   
                    const mydata = res.data.data;
                    setFeed(mydata);
                    setVaribleFeed(mydata);
                })
                }, [reload]); */

  useEffect(() => {
    axios.get(`${url}/api/v1/feeds`).then((res) => {
      setFeed(res.data.data);

      setVaribleFeed(res.data.data);
    });
  }, [reload]);

  function handeldeDelete(FeedId) {
    var data = {
      token: localStorage.getItem("admin"),
      feedid: FeedId,
    };
    axios.post(`${url}/admin/removefeed`, data).then((res) => {
      setReload(reload + 1);
    });
  }
  function handleSearch(e) {
    setVaribleFeed(feed);

    setSearch(e.target.value);

    var result = feed.filter((result) => {
      return result.fullname.match(new RegExp(`${e.target.value}`, "i"));
    });

    setVaribleFeed(result);
  }
  return (
    <>
      <FilledInput
        sx={{ margin: "20px 0px 20px 0px" }}
        value={search}
        onChange={(e) => handleSearch(e)}
        placeholder="Search"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              // onClick={}
              // onMouseDown={}
              edge="start"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      ></FilledInput>
      {Variablefeed.map((feeds) => (
        <Card
          sx={{
            maxWidth: 300,
            maxHeight: 600,
            marginRight: "5%",
            marginTop: "2%",
            float: "right",
          }}
        >
          <CardHeader
            avatar={
              <Button
                onClick={(e) => handeldeDelete(feeds.id)}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            }
            title={feeds.fullname}
            subheader={<Timestamp relative date={feeds.createdAt} />}
          >
            <Button
              onClick={(e) => handeldeDelete()}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </CardHeader>
          <CardContent sx={{ maxHeight: 100 }}>
            <Typography variant="body2" color="text.secondary">
              {feeds.text}
            </Typography>
          </CardContent>

          {feeds.image && feeds.image != "" && (
            <CardMedia
              component="img"
              height="300"
              // const dates =
              image={feeds.image}
              alt="Picture"
            />
          )}

          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              {feeds.numberoflike} <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share"></IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
