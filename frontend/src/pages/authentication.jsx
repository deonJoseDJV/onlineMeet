import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HdIcon from '@mui/icons-material/Hd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthContext } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import '../styles/auth.css';

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState(0); // 0 = sign in, 1 = sign up

  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const isSignup = formState === 1;

  const validate = () => {
    if (isSignup && !name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!username.trim()) {
      toast.error('Please enter a username');
      return false;
    }
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isSignup) {
        const result = await handleRegister(name, username, password);
        toast.success(result || 'Account created! Please sign in.');
        setName('');
        setPassword('');
        setFormState(0);
      } else {
        await handleLogin(username, password);
        toast.success('Welcome back!');
        // navigation handled inside AuthContext
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="authShell">
      {/* Brand panel */}
      <Box className="authBrand auroraBg">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Logo size={36} onClick={() => navigate('/')} />
          <Typography className="authBrandHeadline">
            Connect, present, and collaborate — all in your browser.
          </Typography>
          <Typography className="authBrandSub">
            Join thousands of meetings powered by Meetly's fast, secure video
            platform.
          </Typography>
          <Box className="authPerks">
            {[
              { icon: <HdIcon />, label: 'HD peer-to-peer video' },
              { icon: <ScreenShareIcon />, label: 'Instant screen sharing' },
              { icon: <ChatIcon />, label: 'Built-in live chat' },
            ].map((p) => (
              <Box key={p.label} className="authPerk">
                <span className="authPerkIcon">{p.icon}</span>
                {p.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Form panel */}
      <Box className="authFormPanel">
        <Box className="authForm">
          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 2 }}>
            <Logo size={32} onClick={() => navigate('/')} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            {isSignup ? 'Create your account' : 'Welcome back'}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>
            {isSignup
              ? 'Sign up to start hosting meetings in seconds.'
              : 'Sign in to continue to your dashboard.'}
          </Typography>

          <Box className="authTabs">
            <button
              className={!isSignup ? 'authTab active' : 'authTab'}
              onClick={() => setFormState(0)}
              type="button"
            >
              Sign in
            </button>
            <button
              className={isSignup ? 'authTab active' : 'authTab'}
              onClick={() => setFormState(1)}
              type="button"
            >
              Sign up
            </button>
          </Box>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
            sx={{ mt: 1 }}
          >
            {isSignup && (
              <TextField
                margin="normal"
                fullWidth
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, py: 1.3 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isSignup ? (
                'Create account'
              ) : (
                'Sign in'
              )}
            </Button>
          </Box>

          <Typography sx={{ color: 'text.secondary', mt: 3, textAlign: 'center', fontSize: 14 }}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <span
              className="authSwitchLink"
              onClick={() => setFormState(isSignup ? 0 : 1)}
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
