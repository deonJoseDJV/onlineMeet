import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button, Tooltip, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import HistoryIcon from '@mui/icons-material/History';
import { toast } from 'react-toastify';
import withAuth from '../utils/withAuth';
import '../App.css';

function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(Array.isArray(history) ? history.slice().reverse() : []);
      } catch {
        toast.error('Could not load your meeting history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return '—';
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="historyShell auroraBg">
      <div className="historyHeader" style={{ position: 'relative', zIndex: 1 }}>
        <Tooltip title="Back to home">
          <IconButton color="inherit" onClick={() => navigate('/home')}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <h1>Meeting history</h1>
      </div>

      {loading ? (
        <div className="emptyState">
          <CircularProgress color="primary" />
        </div>
      ) : meetings.length === 0 ? (
        <div className="emptyState">
          <HistoryIcon sx={{ fontSize: 56, opacity: 0.4, mb: 1 }} />
          <h3 style={{ fontWeight: 700, marginBottom: 6 }}>No meetings yet</h3>
          <p>Meetings you join will show up here.</p>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/home')}>
            Start a meeting
          </Button>
        </div>
      ) : (
        <div className="historyGrid" style={{ position: 'relative', zIndex: 1 }}>
          {meetings.map((m, i) => (
            <div className="historyItem" key={i}>
              <div className="historyCode">{m.meetingCode}</div>
              <div className="historyDate">{formatDate(m.date)}</div>
              <Button
                size="small"
                startIcon={<VideocamIcon />}
                sx={{ mt: 1.5, pl: 0 }}
                onClick={() => navigate(`/${m.meetingCode}`)}
              >
                Rejoin
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(History);
