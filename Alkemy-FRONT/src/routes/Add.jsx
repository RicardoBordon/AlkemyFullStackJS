import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {
  Input,
  Grid,
  InputLabel,
  Button,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  TextareaAutosize,
  CardMedia,
  Box,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Stack from "@mui/material/Stack";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import Cookies from "universal-cookie";

const Add = () => {

  const base = import.meta.env.VITE_BASE_URL;
  const [date, setDate] = React.useState("");
  const [type, setType] = React.useState("");
  const cookies = new Cookies();
  const newDate = new Date()

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(await event.currentTarget);
    data = {
      concepto: data.get("concept"),
      monto: data.get("amount"),
      tipo: type,
      fecha: date,
      id_users: cookies.get("id"),
    };

    console.log(data)

    await axios({
      baseURL: base,
      url: "createOperation",
      method: "post",
      data: data,
      withCredentials: false,
    })
      .then(function (response) {
          console.log(response)
           window.location.href = "/";
        
      }, [])
      .catch(function (response) {
        console.log(response);
      }, []);
  };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          elevation={24}
          variant="elevation"
          sx={{ my: { xs: 1, md: 6 }, p: { xs: 1, md: 3 } }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} lg={12} sx={{ ml: 5, mt: 2, mb: 5 }}>
              <Box component="form" onSubmit={handleSubmit}>
                <InputLabel
                  sx={{ mt: 4, mb: 2, color: "blueviolet" }}
                  htmlFor="concept"
                >
                  Description:{" "}
                </InputLabel>
                <OutlinedInput
                  name="concept"
                  id="outlined-adornment-amount"
                  sx={{ width: "88%" }}
                  autoFocus
                />

                <InputLabel
                  sx={{ mt: 4, color: "blueviolet" }}
                  htmlFor="type"
                  id="type"
                >
                  Operation:{" "}
                </InputLabel>
                <Select
                  sx={{ mt: 2 }}
                  labelId="type"
                  value={type}
                  onChange={handleChangeType}
                >
                  <MenuItem value={"income"}>income</MenuItem>
                  <MenuItem value={"outflow"}>outflow</MenuItem>
                </Select>

                <InputLabel sx={{ mt: 4, color: "blueviolet" }}>
                  Date:{" "}
                </InputLabel>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3} sx={{ mt: 4, width: "88%" }}>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>

                <InputLabel
                  sx={{ mt:2, color: "blueviolet" }}
                  htmlFor="amount"
                >
                  Amount:{" "}
                </InputLabel>
                <OutlinedInput
                  name="amount"
                  sx={{ mt:2, width: "88%" }}
                  id="outlined-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />

                <Button
                  sx={{ mt: 8, width: "88%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Validar Cambios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
export default Add;
