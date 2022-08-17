import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import PrivateRouter from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import Abm from "./routes/Abm";
import Add from "./routes/Add";
import Edit from "./routes/Edit";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

function App() {

  return (
    <BrowserRouter>
    
    <Routes>
    {/* Public */}
    <Route path="/" element={<PublicRoute/>}>
    <Route index element={<Login/>} exact />
    <Route path="/login" element={<Login/>} exact />
    <Route path="/register" element={<Register/>} exact/>
    </Route>

    {/* Private */}
    <Route path="/home" element={<PrivateRouter/>}>
    <Route index element={<Home/>} exact />
    <Route path="/home/abm" element={<Abm/>} exact />
    <Route path="/home/abm/add" element={<Add/>} exact />
    
    <Route path="/home/abm/edit/:id" element={<Edit/>} exact />
    </Route>

    </Routes>
    </BrowserRouter>

  )
}

export default App
