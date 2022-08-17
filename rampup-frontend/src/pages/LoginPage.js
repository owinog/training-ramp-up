import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const user = { username: userName, password };
        fetch("http://localhost:5200/auth/login", {
            method: "POST",
            body: JSON.stringify({ ...user }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => {
                console.log("Success:", result.status, result.statusText);
                if (result.status === 201) navigate("/home");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const handleRegister = (e) => {
        e.preventDefault();
        const user = { username: userName, password };
        fetch("http://localhost:5200/users/register", {
            method: "POST",
            body: JSON.stringify({ ...user }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => {
                console.log("Success:", result.status, result.statusText);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    component="form"
                    sx={{
                        marginTop: "30%",
                    }}
                    noValidate
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="name"
                        autoComplete="off"
                        autoFocus
                        onChange={handleNameChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="off"
                        onChange={handlePasswordChange}
                    />
                    <Stack spacing={2} direction="row" sx={{ mt: 3, mb: 2 }}>
                        <Button
                            disabled={userName === "" || password === ""}
                            fullWidth
                            variant="contained"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                        <Button
                            disabled={userName === "" || password === ""}
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default LoginPage;
