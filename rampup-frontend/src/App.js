import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import DataTable from "./components/dataTable";
import UploadForm from "./components/uploadForm";

const App = () => {
    return (
        <>
            <div className="App-Header">
                <h1>LaMaey</h1>
                <UploadForm />
            </div>
            <DataTable />
        </>
    );
};

export default App;
