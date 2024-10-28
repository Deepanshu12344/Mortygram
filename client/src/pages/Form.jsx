import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state/index'; // Assuming this is for storing login state
import Dropzone from 'react-dropzone'; // For picture upload
import FlexBetween from '../components/FlexBetween'; // Assuming you have a custom FlexBetween component

export const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for Register Form
  const [registerFormData, setRegisterFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
  });

  // State for Login Form
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });

  // Handle input changes for Register Form
  const handleRegisterInputChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  // Handle input changes for Login Form
  const handleLoginInputChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  // Submit Register Form
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/auth/register`, {
        method: "POST",
        headers: {
          'Content-type': "application/json",
        },
        body: JSON.stringify(registerFormData)
      });
      const result = await response.json();
      console.log(result);
      // Handle successful registration, maybe navigate to login
    } catch (error) {
      console.error(error);
    }
  };

  // Submit Login Form
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(loginFormData)
      });
      const result = await response.json();
      console.log(result);
      dispatch(setLogin(result)); // Store login state in Redux
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="2rem">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Form onSubmit={handleSubmitRegister}>
        <TextField
          label="First Name"
          name="firstname"
          value={registerFormData.firstname}
          onChange={handleRegisterInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={registerFormData.lastname}
          onChange={handleRegisterInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={registerFormData.email}
          onChange={handleRegisterInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={registerFormData.password}
          onChange={handleRegisterInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={registerFormData.location}
          onChange={handleRegisterInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Occupation"
          name="occupation"
          value={registerFormData.occupation}
          onChange={handleRegisterInputChange}
          fullWidth
          margin="normal"
        />
        <Dropzone
          onDrop={(acceptedFiles) => setRegisterFormData({ ...registerFormData, picture: acceptedFiles[0] })}
        >
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()} border="1px dashed" p="1rem" textAlign="center">
              <input {...getInputProps()} />
              <Typography>Drop your picture here, or click to select</Typography>
            </Box>
          )}
        </Dropzone>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: "1rem" }}
        >
          Register
        </Button>
      </Form>

      <Typography variant="h4" gutterBottom sx={{ mt: "2rem" }}>
        Login
      </Typography>
      <Form onSubmit={handleSubmitLogin}>
        <TextField
          label="Email"
          name="email"
          value={loginFormData.email}
          onChange={handleLoginInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={loginFormData.password}
          onChange={handleLoginInputChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: "1rem" }}
        >
          Login
        </Button>
      </Form>
    </Box>
  );
};
