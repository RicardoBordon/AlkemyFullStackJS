import React from "react";
import { List, ListItem, Divider, Button } from "@mui/material";

const ListM = () => {
  const url = window.location.pathname;
  return (
    <div>
      <List component="nav" aria-label="cicle">
        <ListItem button></ListItem>
        <Divider />
        <ListItem button>
          {url === "/home" ? (
            <Button
              href="/home/abm"
              variant="contained"
              color="success"
              size="large"
            >
              ABM
            </Button>
          ) : (
            <Button
              href="/home"
              variant="contained"
              color="primary"
              size="large"
            >
              HOME
            </Button>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          {url !== "/home" ? (
              <Button
              href="/home/abm/add"
              variant="contained"
              color="success"
              size="large">ADD...</Button>)
              :
              (<Button></Button>
           )}
            <Divider />
            </ListItem> 
      </List>
      <Divider />
    </div>
  );
};

export default ListM;

export const Title = () => {
  const url = window.location.pathname;
  return( 
    <>
  {url === "/home" ? (
    <h4>HOME</h4>
  ) : (
    <h4>ABM</h4>
  )}
  </>
  )

}
