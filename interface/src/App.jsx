import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AddTopic from './components/AddTopic';
import "./App.css"

function App() {

  const [topics, setTopics] = useState([]);  // State to manage topics

  const addNewTopic = (newTopic) => {
    setTopics([...topics, newTopic]);  // Add the new topic to the state
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/dashboard',
      element: <Dashboard topics={topics} />
    },
    {
      path: '/add-topic',
      element: <AddTopic addNewTopic={addNewTopic} />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
