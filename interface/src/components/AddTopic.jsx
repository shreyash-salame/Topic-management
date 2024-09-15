import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTopic.css'

function AddTopic({ addNewTopic }) {
  const [topicName, setTopicName] = useState('');
  const [content, setContent] = useState('');
  const [blocks, setBlocks] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const delimiters = /,.?/;
    const splitContent = content.split(delimiters);
    const newBlocks = splitContent.map(block => ({ text: block, category: '' }));
    setBlocks(newBlocks);
  };

  const saveTopic = async () => {
    const topicData = {
      name: topicName,
      blocks,
    };

    try {
      const response = await axios.post('http://localhost:5000/topics', topicData);
      addNewTopic(response.data);  // Update local state with new topic
      navigate('/dashboard');      // Navigate to dashboard after saving
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  const handleCategoryChange = (idx, newCategory) => {
    setBlocks(blocks.map((b, i) => i === idx ? { ...b, category: newCategory } : b));
  };

  return (
    <div>
      <h2>Add New Topic</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Topic Name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <textarea
          placeholder="Write your content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Process Content</button>
      </form>

      <div>
        {blocks.map((block, idx) => (
          <div key={idx} className="block">
            <p>{block.text}</p>
            <select
              value={block.category}
              onChange={(e) => handleCategoryChange(idx, e.target.value)}
            >
              <option value="">Select category</option>
              <option value="UNDERSTOOD">UNDERSTOOD</option>
              <option value="SOMEWHAT UNDERSTOOD">SOMEWHAT UNDERSTOOD</option>
              <option value="NOT CLEAR">NOT CLEAR</option>
              <option value="WHAT RUBBISH">WHAT RUBBISH</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={saveTopic}>Save Topic</button>
    </div>
  );
}

export default AddTopic;
