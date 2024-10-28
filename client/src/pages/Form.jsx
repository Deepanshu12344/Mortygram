import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../state';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    picturePath: '',
    location: '',
    occupation: '',
  });
  
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picturePath: e.target.files[0] });
  };

  const validateForm = () => {
    let errors = {};
    if (isRegister) {
      if (!formData.firstname || formData.firstname.length < 2 || formData.firstname.length > 50) {
        errors.firstname = 'First name must be between 2 and 50 characters';
      }
      if (!formData.lastname || formData.lastname.length < 2 || formData.lastname.length > 50) {
        errors.lastname = 'Last name must be between 2 and 50 characters';
      }
    }
    if (!formData.email || formData.email.length > 50) {
      errors.email = 'Email is required and must be under 50 characters';
    }
    if (!formData.password || formData.password.length < 5) {
      errors.password = 'Password must be at least 5 characters long';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    const data = new FormData();
    for (const key in formData) {
      if (key === 'picturePath' && formData.picturePath) {
        data.append("picture", formData.picturePath); // Note the field name as "picture"
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: data,  
      });

      const result = await response.json();
      console.log("Registration successful:", result);
      setIsRegister(false); // Switch to login after successful registration
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      
      const loggedIn = await response.json();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      isRegister ? handleRegister() : handleLogin();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography variant="h4" align="center">{isRegister ? 'Register' : 'Login'}</Typography>
      
      {isRegister && (
        <>
          <TextField
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            error={!!formErrors.firstname}
            helperText={formErrors.firstname}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            error={!!formErrors.lastname}
            helperText={formErrors.lastname}
            fullWidth
            required
          />
          <Button variant="outlined" component="label" fullWidth>
            Upload Profile Picture
            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
          </Button>
          {formData.picturePath && (
            <Avatar src={URL.createObjectURL(formData.picturePath)} sx={{ width: 56, height: 56, margin: 'auto' }} />
          )}
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            fullWidth
          />
        </>
      )}
      
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        fullWidth
        required
      />
      
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        fullWidth
        required
      />
      
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isRegister ? 'Register' : 'Login'}
      </Button>
      
      <Typography align="center" sx={{ mt: 2, cursor: 'pointer', color: 'primary.main' }} onClick={() => {
        setIsRegister(!isRegister);
        setFormErrors({});
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          picturePath: null,
          location: '',
          occupation: '',
        });
      }}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Typography>
    </Box>
  );
};

export default Form;
