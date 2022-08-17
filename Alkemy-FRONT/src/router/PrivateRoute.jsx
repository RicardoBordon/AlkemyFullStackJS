import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouter() {
  
if(sessionStorage.getItem("user") !== "true") {
      return <Navigate to={"/login"} replace={true}/>
  }  

    return (
        <div>
            <Outlet/>
        </div>
    );
}