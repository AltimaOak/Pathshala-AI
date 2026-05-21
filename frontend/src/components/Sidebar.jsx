import { Link } from 'react-router-dom';

export default function Sidebar() {
	return (
		<aside style={{ width: '180px', background: '#f0f0f0', minHeight: '90vh', padding: '1rem 0' }}>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				<li><Link to="/" style={{ display: 'block', padding: '0.5rem 1rem' }}>Home</Link></li>
				<li><Link to="/dashboard" style={{ display: 'block', padding: '0.5rem 1rem' }}>Dashboard</Link></li>
				<li><Link to="/chat" style={{ display: 'block', padding: '0.5rem 1rem' }}>Chat</Link></li>
				<li><Link to="/quiz" style={{ display: 'block', padding: '0.5rem 1rem' }}>Quiz</Link></li>
				<li><Link to="/settings" style={{ display: 'block', padding: '0.5rem 1rem' }}>Settings</Link></li>
			</ul>
		</aside>
	);
}
