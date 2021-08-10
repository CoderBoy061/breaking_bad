import React from "react";
import "../styles/characterlist.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";

function CharacterList({ posts, loading }) {
  if (loading) {
    return (
      <CircularProgress
        color="secondary"
        size="5rem"
        style={{ marginTop: "38vh" }}
      />
    );
  } else {
    return (
      <div className="character_deatils">
        {posts.map((post) => (
          <div key={post.char_id} className="breaking_bad_character">
            <div id="char_details">
              <h3 className="post_name">
                Name : <span className="span_post_name">{post.name}</span>
              </h3>
              <h3 className="post_occapation">
                <span className="span_post_occupation">{post.occupation}</span>
              </h3>
              <NavLink to={`/characterDetails/${post.char_id}`}>
                <button className="seemore_btn">See More</button>
              </NavLink>
            </div>

            <img
              src={post.img || <CircularProgress color="secondary" />}
              className="post_img"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default CharacterList;
