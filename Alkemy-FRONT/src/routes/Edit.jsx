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
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Cookies from "universal-cookie";
import axios from "axios";

const Edit = () => {
  const cookies = new Cookies();
  const base = import.meta.env.VITE_BASE_URL;
  const url = `/${cookies.get("id")}/${useParams().id}`;

  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [concept, setConcept] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [tipe, setTipe] = React.useState("");


  useEffect(() => {
    axios({
      baseURL: base,
      url: "readOperation" + url,
      method: "get",
    })
      .then(function (response) {
        setData(response.data);
        setConcept(response.data.concepto);
        setAmount(response.data.monto);
        setDate(response.data.fecha);
        setTipe(response.data.tipo)
      }, [])
      .catch(function (response) {
        console.log(response);
      }, []);
  }, []);

  const handleChangeConcept = (event) => {
    setConcept(event.target.value);
    setData("");
  };
  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = {
      concepto: concept,
      monto: amount,
      fecha: date,
      id_users: cookies.get("id"),
    };

    await axios({
      baseURL: base,
      url: "updateOperation" + url,
      method: "post",
      data: data,
      withCredentials: false,
    })
      .then(function () {
        window.location.href = "/";
      }, [])
      .catch(function () {
        console.log(response);
      }, []);
  };
  
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          elevation={24}
          variant="elevation"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} lg={12} sx={{ ml: 5, mt: 2, mb: 5 }}>
              .
              <Box component="form" onSubmit={handleSubmit}>
                {tipe == "outflow" ? (
                  <Paper
                    variant="contained"
                    square
                    sx={{
                      width: "82%",
                      textAlign: "center",
                      fontSize: "30px",
                      mb: "65px",
                      color: "red",
                      border: 2,
                      p:2,
                      color: "#A11414",
                      fontWeight: 'bold',
                      typography: "letter-spacing"
                    }}
                  >
                    {tipe}
                  </Paper>
                ) : (
                  <Paper
                    variant="contained"
                    square
                    sx={{
                      width: "82%",
                      textAlign: "center",
                      fontFamily: "roboto",
                      textAnchor: "30px",
                      fontSize: "30px",
                      mb: "65px",
                      border: 2,
                      p:2,
                      color: "#07A352",
                      fontWeight: 'bold',
                      xs:3
                    }}
                  >
                    {tipe}
                  </Paper>
                )}

                <InputLabel sx={{ mt: 4, mb: 2, color: "blueviolet" }}>
                  Description:{" "}
                </InputLabel>
                <OutlinedInput
                  name="concept"
                  // value={data.concepto}
                  value={concept}
                  variant="filled"
                  onChange={handleChangeConcept}
                  sx={{ width: "88%" }}
                ></OutlinedInput>
                <InputLabel sx={{ mt: 4, mb: 2, color: "blueviolet" }}>
                  Date:{" "}
                </InputLabel>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3} sx={{ width: "88%" }}>
                    <DesktopDatePicker
                      inputFormat= "yyyy/MM/dd"
                      value={date}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>

                <InputLabel sx={{ mt: 4, mb: 2, color: "blueviolet" }}>
                  Amount:{" "}
                </InputLabel>
                <OutlinedInput
                  sx={{ width: "88%" }}
                  value={amount}
                  onChange={handleChangeAmount}
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
                  Changes Validate
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
export default Edit;
