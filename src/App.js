import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
import { addInfo } from "./redux/users/userActions";
import { memo, useState } from "react";
import PrimarySearchAppBar from "./nav";
import Details from "./details";

function App(props) {
  const [latestData, setData] = useState([]);
  const [details, setDetails] = useState("");
  const [flag, setFlag] = useState(0);

  const fetchhandler = async () => {
    var tempData = [];
    let options = {
      headers: {
        Authorization: `Bearer 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`,
      },
    };
    let res = await fetch("https://api.github.com/users", options);
    let data = await res.json();

    data.map(async (it, i) => {
      if (
        it.login.toLowerCase().includes(props.username.toLowerCase()) &&
        props.username !== ""
      ) {
        let newres = await fetch(
          `https://api.github.com/users/${it.login}`,
          options
        );
        let finalData = await newres.json();
        console.log(finalData);
        tempData = [...tempData, finalData];
        // tempData.push(finalData);
      }
      setData(tempData);
      setFlag(1);
      // console.log(tempData);
    });
    console.log(tempData);
  };

  if (details === "") {
    return (
      <div className="parent">
        <div className="search">
          {" "}
          <input
            onChange={(e) => {
              props.addInfo("username", e.target.value);
            }}
            value={props.username}
            placeholder="Search a github user"
          />
          <br />
          <button onClick={fetchhandler}>Search</button>
        </div>

        <div className="res">
          {latestData.length > 0 && (
            <>
              {latestData.map((it, i) => (
                <div>
                  <img src={it.avatar_url} alt="" />
                  {it.login}{" "}
                  <button
                    onClick={() => {
                      setDetails(it);
                      props.addInfo("username", it.login);
                    }}
                  >
                    Show Profile
                  </button>
                  <div className="threecolos">
                    <p>{it.followers} Followers</p>
                    <p>{it.following} Following</p>
                    <p>{it.public_repos} Repos</p>
                  </div>
                </div>
              ))}
            </>
          )}
          {latestData.length === 0 && flag === 1 && (
            <div>
              <h1>No user found!</h1>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <PrimarySearchAppBar setDetails={setDetails} />
        <Details details={details} />
      </div>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(memo(App));
