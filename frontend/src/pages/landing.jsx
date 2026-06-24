import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import HdIcon from '@mui/icons-material/Hd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import LockIcon from '@mui/icons-material/Lock';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Logo from '../components/Logo';
import HeroArt from '../components/HeroArt';

const features = [
  { icon: <HdIcon />, title: 'Crystal-clear HD video', desc: 'Peer-to-peer WebRTC streaming for low-latency, high-definition calls.' },
  { icon: <ScreenShareIcon />, title: 'One-click screen share', desc: 'Present slides, demos, or your whole screen instantly.' },
  { icon: <ChatIcon />, title: 'Real-time chat', desc: 'Send messages, links, and notes without leaving the call.' },
  { icon: <LockIcon />, title: 'Private by design', desc: 'Rooms are created on the fly — share the link only with who you want.' },
  { icon: <BoltIcon />, title: 'Zero downloads', desc: 'Runs entirely in the browser. Open a link and you are in.' },
  { icon: <GroupsIcon />, title: 'Group meetings', desc: 'Multiple participants in a responsive, auto-arranging grid.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing auroraBg">
      <nav className="landingNav">
        <Logo onClick={() => navigate('/')} />
        <div className="landingNavLinks">
          <span onClick={() => navigate('/aljk23')}>Join as guest</span>
          <span onClick={() => navigate('/auth')}>Sign in</span>
          <Button variant="contained" onClick={() => navigate('/auth')}>
            Get started
          </Button>
        </div>
      </nav>

      <header className="hero">
        <div className="heroCopy">
          <span className="pill">✦ Free, open-source video meetings</span>
          <h1>
            Meetings that just <span className="grad">work</span>.
          </h1>
          <p>
            Meetly is a lightweight, browser-based video platform with HD calls,
            screen sharing, and live chat. No installs, no friction — just share
            a link and connect.
          </p>
          <div className="heroCtas">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/auth')}
            >
              Start a meeting
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => navigate('/aljk23')}
            >
              Try a demo room
            </Button>
          </div>
          <div className="heroTrust">
            <div className="avatars">
              {['#8b5cf6', '#22d3ee', '#e879f9', '#f59e0b'].map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </div>
            <span>Built with React, WebRTC &amp; Socket.io</span>
          </div>
        </div>
        <div className="heroArt">
          <HeroArt />
        </div>
      </header>

      <section className="featuresSection">
        <h2>Everything you need for a great call</h2>
        <p className="sectionSub">Powerful features, wrapped in a clean and simple interface.</p>
        <div className="featureGrid">
          {features.map((f) => (
            <div className="featureCard" key={f.title}>
              <div className="featureIcon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ctaBand">
        <h2>Ready to jump in?</h2>
        <p>Create your free account and host your first meeting in seconds.</p>
        <Button variant="contained" size="large" onClick={() => navigate('/auth')}>
          Get started — it's free
        </Button>
      </section>

      <footer className="landingFooter">
        <Logo size={26} />
        <span>© {new Date().getFullYear()} Meetly. Crafted for connection.</span>
        <Link to="/auth">Sign in</Link>
      </footer>
    </div>
  );
}
