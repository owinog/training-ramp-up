import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/dataTable";
import UploadForm from "../components/uploadForm";
import "./home.css";

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("accessToken");
        if (user) setIsLoggedIn(true);
        else navigate("/");
    }, [isLoggedIn]);

    const logout = () => {
        // fetch("http://localhost:5200/auth/logout", {
        //     method: "POST",
        // });
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    return isLoggedIn ? (
        <>
            <div>
                <UploadForm />
            </div>
            <DataTable />
            <button onClick={logout}>Logout</button>
        </>
    ) : (
        navigate("/")
    );
};

export default HomePage;
