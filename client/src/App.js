import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { HomePage } from './pages/homePage';
import { ProfilePage } from './pages/profilePage';
import { useMemo } from 'react';
import { useSelector }from 'react-redux';
import {themeSettings} from './theme.js'
import {createTheme} from '@mui/material/styles';
import { CssBaseline,ThemeProvider } from '@mui/material';


function App() {
  const mode = useSelector((state)=>state.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
