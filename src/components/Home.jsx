import React from "react";
import "../styles/Home.css";
import { Button, ButtonBase } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h2 className="heading">Welcome to BreakingBad SearchEngine</h2>
      <NavLink
        to="/character"
        style={{ textDecoration: "none", color: "yellow" }}
      >
        <Button variant="outlined" color="secondary" id="more_btn">
          CLICK HERE FOR SEARCH
        </Button>
      </NavLink>
    </div>
  );
}

export default Home;
