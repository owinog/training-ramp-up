import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { tokenActions } from "../components/tokenSlice";

const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(() => {
        const aT = localStorage.getItem("accessToken");
        setCurrentUser(aT);
        if (aT) {
            fetch("http://localhost:5200/auth/home", {
                method: "GET",
                headers: { Authorization: `Bearer ${currentUser}` },
            })
                .then(handleRes)
                .then((data) => {
                    if (data) console.log(data);
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });

            navigate("/home");
        }
    }, [currentUser]);

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
                withCredentials: true,
            },
        })
            .then(handleRes)
            .then((data) => {
                const accessToken = data?.access_token;
                if (accessToken) {
                    localStorage.setItem("accessToken", accessToken);
                    // dispatch(tokenActions.addToken(accessToken));
                    setCurrentUser(accessToken);
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
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
            .then(handleRes)
            .then((data) => {
                if (data) {
                    const result = data;
                    console.log("User Created");
                    console.log("Username: ", result.username);
                } else console.log("Username taken");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleRes = (response) => {
        if (!response?.ok) {
            if ([401, 403].includes(response?.status)) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                localStorage.removeItem("accessToken");
            }
        } else return response.json();
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
