import React from "react";
import DataTable from "../components/dataTable";
import UploadForm from "../components/uploadForm";
import "./home.css";

const HomePage = () => {
    return (
        <>
            <div>
                <UploadForm />
            </div>
            <DataTable />
        </>
    );
};

export default HomePage;
