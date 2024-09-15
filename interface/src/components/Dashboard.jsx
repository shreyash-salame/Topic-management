import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopicCard from './TopicCard';  // Ensure this is the correct path
import { useNavigate, useLocation } from 'react-router-dom';

function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const location = useLocation();
  const navigate=useNavigate()
  const username = location.state?.username || 'User';


  useEffect(() => {
    // Fetch all topics when the component mounts
    async function fetchTopics() {
      try {
        const response = await axios.get('http://localhost:5000/topics');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchTopics();
  }, []);

  const handleTopicClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/topics/${id}`);
      setSelectedTopic(response.data);
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  // Handle category change in a block
  const handleCategoryChange = (index, newCategory) => {
    // Update the selected topic's block category
    const updatedBlocks = selectedTopic.blocks.map((block, i) =>
      i === index ? { ...block, category: newCategory } : block
    );
    setSelectedTopic({ ...selectedTopic, blocks: updatedBlocks });
  };

  // Save updated topic to the server
  const saveUpdatedTopic = async () => {
    try {
      await axios.put(`http://localhost:5000/topics/${selectedTopic._id}`, selectedTopic);
      alert('Topic updated successfully!');
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };
  const addNewTopic = () => {
    navigate('/add-topic');
  };

  return (
    <div>
      <h1>{username}'s Dashboard</h1>
      <button onClick={addNewTopic}>Add Topic</button>

      <div className="topic-list">
        {topics.map(topic => (
          <div
            key={topic._id}
            onClick={() => handleTopicClick(topic._id)}
            className="topic-item"
          >
            <TopicCard topic={topic} />
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="topic-details">
          <h2>{selectedTopic.name}</h2>
          <div className="blocks">
            {selectedTopic.blocks.map((block, index) => (
              <div key={index} className="block">
                <p>{block.text}</p>
                <select
                  value={block.category}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="UNDERSTOOD">UNDERSTOOD</option>
                  <option value="SOMEWHAT UNDERSTOOD">SOMEWHAT UNDERSTOOD</option>
                  <option value="NOT CLEAR">NOT CLEAR</option>
                  <option value="WHAT RUBBISH">WHAT RUBBISH</option>
                </select>
                <p>Category: {block.category}</p>
              </div>
            ))}
          </div>
          <button onClick={saveUpdatedTopic}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
