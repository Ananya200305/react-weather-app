import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './feature/authSlice';
import Aurora from './component/animation/aurora/Aurora';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
  authservice.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())
      }
    })
    .catch(() => dispatch(logout()))  // <- graceful handling
    .finally(() => setLoading(false))
}, [])


  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Aurora Background - Behind everything */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#7CFF67", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1}
          speed={1.5}
        />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
