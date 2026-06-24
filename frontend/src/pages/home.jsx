import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoginIcon from '@mui/icons-material/Login';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import HeroArt from '../components/HeroArt';

// Generate a friendly, readable meeting code like "kxq-8fra-zmp".
const generateMeetingCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const group = (n) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${group(3)}-${group(4)}-${group(3)}`;
};

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const { addToUserHistory } = useContext(AuthContext);

  const joinMeeting = async (code) => {
    const trimmed = code.trim();
    if (!trimmed) {
      toast.error('Please enter a meeting code');
      return;
    }
    try {
      await addToUserHistory(trimmed);
    } catch {
      // history is best-effort; don't block joining
    }
    navigate(`/${trimmed}`);
  };

  const startInstantMeeting = () => {
    const code = generateMeetingCode();
    joinMeeting(code);
  };

  const copyInviteLink = () => {
    const code = meetingCode.trim() || generateMeetingCode();
    if (!meetingCode.trim()) setMeetingCode(code);
    const link = `${window.location.origin}/${code}`;
    navigator.clipboard?.writeText(link).then(
      () => toast.success('Invite link copied to clipboard!'),
      () => toast.error('Could not copy link')
    );
  };

  return (
    <div className="homeShell auroraBg">
      <nav className="homeNav">
        <Logo onClick={() => navigate('/home')} />
        <div className="homeNavRight">
          <Tooltip title="Meeting history">
            <IconButton color="inherit" onClick={() => navigate('/history')}>
              <RestoreIcon />
            </IconButton>
          </Tooltip>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem('token');
              toast.info('Signed out');
              navigate('/auth');
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      <main className="homeMain">
        <div className="homeIntro">
          <h1>
            Premium video calls.<br />Now <span className="grad">free for everyone</span>.
          </h1>
          <p className="lede">
            Start an instant meeting or join with a code. Share the link and your
            team is one click away.
          </p>

          <div className="homeCard">
            <h3>Start a new meeting</h3>
            <p className="cardSub">Create a fresh room and invite others instantly.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="contained" startIcon={<VideoCallIcon />} onClick={startInstantMeeting}>
                New meeting
              </Button>
              <Button variant="outlined" color="inherit" startIcon={<ContentCopyIcon />} onClick={copyInviteLink}>
                Copy invite link
              </Button>
            </div>
          </div>

          <div className="homeCard">
            <h3>Join a meeting</h3>
            <p className="cardSub">Enter a code you received to hop into a call.</p>
            <div className="joinRow">
              <TextField
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && joinMeeting(meetingCode)}
                label="Meeting code"
                size="medium"
              />
              <Button variant="contained" startIcon={<LoginIcon />} onClick={() => joinMeeting(meetingCode)}>
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="homeArt">
          <HeroArt />
        </div>
      </main>
    </div>
  );
}

export default withAuth(HomeComponent);
