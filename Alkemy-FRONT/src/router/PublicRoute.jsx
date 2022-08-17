import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
    if(sessionStorage.getItem("user") === "true"){
        return <Navigate to={"/home"} replace={true}/>;
    }
        return (
            <div>
                <Outlet/>
            </div>
        );

    }

