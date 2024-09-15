function TopicCard({ topic }) {
  const totalBlocks = topic.blocks.length;
  const totalPoints = topic.blocks.reduce((sum, block) => {
    switch (block.category) {
      case 'UNDERSTOOD': return sum + 4;
      case 'SOMEWHAT UNDERSTOOD': return sum + 3;
      case 'NOT CLEAR': return sum + 2;
      case 'WHAT RUBBISH': return sum + 1;
      default: return sum;
    }
  }, 0);

  const understandingPercentage = (totalPoints / (totalBlocks * 4)) * 100;

  return (
    <div className="topic-card">
      <h3>{topic.name}</h3>
      <p>{topic.name}: {understandingPercentage.toFixed(2)}%</p>
    </div>
  );
}

export default TopicCard;
