
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from "universal-cookie";
import { Button } from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Home() {
  const cookies = new Cookies();
  const base = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState([]);
  const [bal, setBal] = useState([]);+

  useEffect(() => {
     axios({
      baseURL: base,
      url: "balance",
      method: "post",
      data: { "id_users":cookies.get("id") },
    })
    .then(function (response) {
      console.log(response.data[0]);
      setData(response.data[0])
      setBal(response.data[1])
    }, [])
    .catch(function (response) {
      console.log(response.response.data)
  }, []) 
   }, [])



  return (
    <>
      <NavBar/>
       <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Concept</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            
            <StyledTableRow 
              key={row.id_operation}
            >
              <StyledTableCell component="th" scope="row">
                {row.concepto}
              </StyledTableCell>
              {row.tipo == "outflow"
              ? <StyledTableCell align="center" sx={{color: "red"}}>$  -{row.monto}</StyledTableCell>
              : <StyledTableCell align="center">$  {row.monto}</StyledTableCell> } 
              
              <StyledTableCell align="center">{row.fecha.split("T03:00:00.000Z",)}</StyledTableCell>
              <StyledTableCell align="center">{row.tipo}</StyledTableCell>
              
            </StyledTableRow >
          ))}

          <StyledTableRow >
          <StyledTableCell colSpan={1}>Total Balance:</StyledTableCell>
          <StyledTableCell colSpan={2} align="center" sx={{color: "yellow", bgcolor:"black"}}>$ {bal.balance}</StyledTableCell>
          </StyledTableRow >
          </TableBody>
          </Table>
          </TableContainer>
  </>
  )
}

export default Home