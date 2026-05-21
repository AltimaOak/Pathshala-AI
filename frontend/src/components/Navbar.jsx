import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav style={{ background: '#222', color: '#fff', padding: '1rem' }}>
			<span style={{ fontWeight: 'bold', marginRight: '2rem' }}>PathshalaAI</span>
			<Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
			<Link to="/dashboard" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</Link>
			<Link to="/chat" style={{ color: '#fff', marginRight: '1rem' }}>Chat</Link>
			<Link to="/quiz" style={{ color: '#fff', marginRight: '1rem' }}>Quiz</Link>
			<Link to="/settings" style={{ color: '#fff' }}>Settings</Link>
		</nav>
	);
}

// Navbar component
