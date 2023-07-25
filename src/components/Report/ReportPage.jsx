
import { useState } from 'react';
import { Button } from '@blueprintjs/core';

function ReportPage({ findingsValue }) {
  const [message, setMessage] = useState(findingsValue);

  const askAI = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/gpt4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ findingsValue: message })
    });
  
    const data = await response.json();
    setMessage(data.message);
  };
  


  return (
    <div>
      <div>
        <label>FINDINGS</label>
      </div>

      <div style={{paddingBottom : "30px"}}>
        <textarea rows={6} value={findingsValue} readOnly />
      </div>
      <div>
        <label>IMPRESSION</label>
      </div>
      <div>
        <textarea rows={6} value={message}/>
      </div>

    <div>
      <Button onClick={askAI}>Ask AI</Button>
    </div>


    </div>
  );
}

export default ReportPage;