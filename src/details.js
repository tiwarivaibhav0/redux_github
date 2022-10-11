import React, { memo, useEffect, useState } from "react";
import BasicTabs from "./tabs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import PeopleIcon from "@mui/icons-material/People";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { connect } from "react-redux";
import { addInfo } from "./redux/users/userActions";
function Details(props) {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${props.username}/repos`)
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, []);
  return (
    <div className="details">
      <div className="profile">
        <div>
          <img src={props.details.avatar_url} alt="" />
          <p id="name">{props.details.name}</p>

          <p>{props.details.login}</p>
          <br />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <div className="btns">
            <button>Follow</button>
            <button>
              <FavoriteBorderIcon />
              Sponsor
            </button>
            <button>...</button>
          </div>
          <div className="threecolos">
            <p>
              <PeopleIcon />
            </p>
            <p>{props.details.followers} Followers</p>
            <p>{props.details.following} Following</p>
          </div>
          <p>
            <StarBorderIcon /> {props.details.public_gists}
          </p>

          <div>
            <p>
              <LocationOnIcon /> {props.details.location}
            </p>
            <p>
              <EmailIcon /> {props.details.email}
            </p>
            <p>
              <LanguageIcon /> {props.details.blog}
            </p>
            <p>
              <TwitterIcon /> @{props.details.twitter_username}
            </p>
          </div>
        </div>
      </div>
      <div className="profileDetails">
        <BasicTabs details={props.details} repos={repos} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {
      username: state.username,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addInfo: (field, value) => dispatch(addInfo(field, value)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(memo(Details));
