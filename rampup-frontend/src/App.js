import "@progress/kendo-theme-default/dist/all.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (
        <>
            <div className="App-Header">
                <h1>LaMaey</h1>
            </div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </>
    );
};

export default App;
