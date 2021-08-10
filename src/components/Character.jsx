import React, { useEffect, useState } from "react";
import "../styles/character.css";
import axios from "axios";
import CharacterList from "./CharacterList";
import PaginationPage from "./Pagination";
import { Button, CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { NavLink } from "react-router-dom";

function Character() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const [dialog, setDialoag] = useState(false);

  //###############################fetching data from api####################################################
  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://www.breakingbadapi.com/api/characters"
    );
    setPosts(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  //###################################timeout method for snackbar##########################################
  setTimeout(() => {
    setAlert({
      showSnackbar: false,
    });
  }, 5000);
  //###################################timeout method for snackbar##########################################
  //###################################getting the current page#############################################
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // ########################################Change page######################################################
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const searchName = async (e) => {
    e.preventDefault();
    if (search === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter any Character Name",
      });
    } else {
      setDialoag(true);
      const res = await axios.get(
        `https://www.breakingbadapi.com/api/characters?name=${search}`
      );
      setResult(res.data);
      setDialoag(false);
      setShow(true);
    }
  };
  // ###################################close diallouge method#################################################
  const closeDialog = () => {
    setDialoag(false);
  };
  //################################################search result###############################################
  const searchResult = () => {
    if (result) {
      return (
        <div className="fetched_search">
          {result.map((search_result) => (
            <div
              className="breaking_bad_character_result"
              key={search_result.char_key}
            >
              <div id="char_details_result">
                <h3 className="post_name_result">
                  Name :
                  <span className="span_post_name"> {search_result.name}</span>
                </h3>
                <h3 className="post_occapation_result">
                  <span className="span_post_occupation">
                     {search_result.occupation}
                  </span>
                </h3>
              </div>

              <img src={search_result.img} className="post_img_result" />
              <NavLink to={`/characterDetails/${search_result.char_id}`} style={{textDecoration:"none"}}>
              <button className="more_deatils">See More</button>
              </NavLink>
            </div>
          ))}
        </div>
      );
    } else {
      return <h1>Hello</h1>;
    }
  };
  return (
    <div className="main_character_page">
      <div className="search">
        <input
          type="text"
          className="input_search"
          placeholder="search here ...."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          id="search_btn"
          style={{ marginTop: "1.8vh", marginLeft: "-1.1vw" }}
          onClick={searchName}
        >
          Search
        </Button>
      </div>
      {show ? (
        searchResult()
      ) : (
        <>
          <div className="character">
            <CharacterList posts={currentPosts} loading={loading} />
          </div>
          <div className="pagination_class">
            <PaginationPage
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </div>
        </>
      )}
      {/* ######################################snackbar ############################################ */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
      />
      {/* ######################################dialouge #################################################*/}
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogContent color="black">
          <DialogContentText id="alert-dialog-description">
            <CircularProgress color="secondary"  size="3rem"/>
            <p style={{ fontFamily: "cursive", color: "blue" }}>Wait..</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Character;
