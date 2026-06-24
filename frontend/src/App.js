import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/history" element={<History />} />
              <Route path="/:url" element={<VideoMeetComponent />} />
            </Routes>
          </AuthProvider>
        </Router>
        <ToastContainer position="top-center" theme="dark" autoClose={3500} />
      </div>
    </ThemeProvider>
  );
}

export default App;
