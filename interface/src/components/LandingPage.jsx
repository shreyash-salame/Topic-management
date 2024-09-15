// components/LandingPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      navigate('/dashboard', { state: { username } });
    }
  };

  return (
    <div>
      <h1>Welcome to the Feynman Board</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enter Dashboard</button>
      </form>
    </div>
  );
}

export default LandingPage;
