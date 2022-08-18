import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Cookies from "universal-cookie";
import { Box, Button, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Home() {
  const cookies = new Cookies();
  const base = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState([]);
  const [bal, setBal] = useState([]);
  +useEffect(() => {
    axios({
      baseURL: base,
      url: "balance",
      method: "post",
      data: { id_users: cookies.get("id") },
    })
      .then(function (response) {
        setData(response.data[0]);
        setBal(response.data[1]);
      }, [])
      .catch(function (response) {
        console.log(response.response.data);
      }, []);
  }, []);

  return (
    <>
      <NavBar />
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">CONCEPT</StyledTableCell>
              <StyledTableCell align="center">AMOUNT</StyledTableCell>
              <StyledTableCell align="center">DATE</StyledTableCell>
              <StyledTableCell align="center">TYPE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id_operation}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.concepto}
                </StyledTableCell>
                {row.tipo == "OUTFLOW" ? (
                  <StyledTableCell align="center" sx={{ color: "red" }}>
                    $ -{row.monto}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    $ {row.monto}
                  </StyledTableCell>
                )}

                <StyledTableCell align="center">
                  {row.fecha.split("T03:00:00.000Z")}
                </StyledTableCell>

                {row.tipo == "OUTFLOW" ? (
                  <StyledTableCell align="center" sx={{ color: "red" }}>
                    {row.tipo}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center" sx={{ color: "blue" }}>
                    {row.tipo}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}

            <StyledTableRow></StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Paper
        elevation={10}
        sx={{ m: 5, mt: 8, color: "white", bgcolor: "black", width: "300px" }}
      >
        <TableCell>
          <Typography gutterBottom={true} variant="button">
            Total Balance:
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ color: "yellow", bgcolor: "black" }}>
          <Typography gutterBottom={true} variant="h6">
            $ {bal.balance}
          </Typography>
        </TableCell>
      </Paper>
    </>
  );
}

export default Home;
