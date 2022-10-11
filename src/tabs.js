import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overviews" {...a11yProps(0)} />
          <Tab
            label={`Repositories ( ` + props.details.public_repos + ` )`}
            {...a11yProps(1)}
          />
          <Tab label="Projects" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <h2>Hi!, ! am {props.details.login}</h2>
        </div>
        <div className="intro">
          <h1>{props.details.name}</h1>
          <img src="/logo.png" alt="" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <table>
          <tr>
            <th>Repository</th>
            <th>Link</th>
            <th>Created On</th>
          </tr>
          {props.repos.map((it, i) => (
            <tr>
              <td>{it.name}</td>
              <td>
                {" "}
                <a href={it.html_url} target="blank">
                  Visit Repo
                </a>
              </td>
              <td>{it.created_at}</td>
            </tr>
          ))}
        </table>
      </TabPanel>
      <TabPanel value={value} index={2}>
        No Projects Currently....
        {/* <Button variant="contained">+ Create a new Project</Button> */}
      </TabPanel>
    </Box>
  );
}
