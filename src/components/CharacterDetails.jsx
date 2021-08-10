import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams , NavLink } from "react-router-dom";
import "../styles/characterdetails.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";

function CharacterDetails() {
  const { id } = useParams();
  const [charDetails, setCharDetails] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.breakingbadapi.com/api/characters/${id}`)
      .then((response) => {
        setCharDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.breakingbadapi.com/api/quotes/${id}`)
      .then((response) => {
        setQuoteDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (loading) {
    return (
      <CircularProgress
        color="secondary"
        size="5rem"
        style={{ marginTop: "40vh", marginLeft: "43vw" }}
      />
    );
  } else{
    return (
      <>
        {charDetails.map((char) => (
          <div key={char.char_id} className="character_box">
            <div className="character_imge">
              <img src={char.img} className="char_poster" />
              <h2>
                <span className="char_name">{char.name}</span>
              </h2>
              <h2>NickName
                <span className="char_nick_name"> {char.nickname}</span>
              </h2>
            </div>
            <div className="char_details">
              <h2>
                Profession <span className="char_birth"> {char.occupation} </span>
              </h2>
              <h2>
                Born
                <span className="char_occapation"> {char.birthday} </span>
              </h2>
              <h2>
                Status <span className="char_status"> {char.status}</span>
              </h2>
              <h2>
                Act By
                <span className="char_portrayed"> {char.portrayed}</span>
              </h2>
              <h2>
                Appearnces
                <span className="char_appearence"> {char.appearance}</span>
              </h2>
            </div>
            {quoteDetails.map((quotes) => (
              <div key={quotes.quote_id} className="char_quotes">
                <h3>
                  Quotes <span className="quotes_note"> {quotes.quote}</span>
                </h3>
                <NavLink to="/character" style={{textDecoration:"none"}}>
                <Button variant="outlined" color="secondary" style={{marginTop:"2vh",marginLeft:"1vw"}} id="previous_btn">Previous</Button>
                </NavLink>
              </div>
            ))}
          </div>
        ))}
      </>
    );
  }
}

export default CharacterDetails;
