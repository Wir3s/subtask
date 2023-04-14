import React, { useState } from "react";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";

import SubTasks from "../components/subTasks";
import TaskList from "../components/taskList";

import ListContext from "../components/listContext";

import ActiveUserContext from "../components/activeUserContext";
import { useQuery } from "@apollo/client";
import { GET_ME_LISTS } from "../utils/queries";

import NewListDialog from "../components/newListDialog";

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "30px",
  },

};

const Dashboard = () => {
  const [activeList, setData] = useState("default");
  const [activeUser, setUser] = useState("None");

  const { loading, error, data } = useQuery(GET_ME_LISTS);

  if (!Auth.loggedIn()) {
    return (
      <div>
        {console.log("Not logged in. Redirecting...")}
        <Navigate to="/login" />
      </div>
    );
  }

  if (loading) return <p>Setting Active User...</p>;
  if (error) return <p>Error setting active user</p>;

  const activeUserDetails = data;

  console.log(activeUserDetails);

  if (activeUser === "None") {
    setUser(activeUserDetails.me._id);
  }

  return (
    <ActiveUserContext.Provider value={{ activeUser, setUser }}>
      
  
          
          <header style={styles.header}>
            <h1>TaskMaster</h1>
            <div>
              <div>Welcome {activeUserDetails.me.username}</div>
              <div>DATE</div>
            </div>
            <div>Settings BTN</div>
          </header>
            
          <Grid container spacing={1}>
             
          {/* <div style={styles.main}> */}
            <Grid item xs={12}>
              <div>
              <h3>Your Task Lists</h3>
              <NewListDialog />
              </div>
              <ListContext.Provider value={{ activeList, setData }}>
                <TaskList />
              </ListContext.Provider>
            </Grid>

            <Grid item xs={12}>
              <ListContext.Provider value={{ activeList, setData }}>
                <SubTasks />
              </ListContext.Provider>
            </Grid>
          {/* </div> */}
        </Grid>
      
    </ActiveUserContext.Provider>
  );
};

export default Dashboard;
