import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import diseases from '../../data/Diseases'


function Description({ onValueChange, section, disease}) {

    const sentences = diseases[section][disease]['Finding']

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [sentenceInputs, setSentenceInputs] = useState({});
    const [currentSentence, setCurrentSentence] = useState('');

    const handleClick = () => {
        setCurrentSentenceIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % sentences.length;
          return isNaN(newIndex) ? 0 : newIndex;
        });
      };

      const handleInputChange = (event, index) => {
        const { value } = event.target;
        const updatedInputs = { ...sentenceInputs, [index]: value };
        setSentenceInputs(updatedInputs);
      };
    const printEditedSentence = () => {
        console.log(currentSentence);
    };


    const renderSentence = () => {
        console.log('section:', section);
        console.log('disease:', disease);
        console.log('sentences:', sentences);
        console.log(currentSentenceIndex)
        if (!sentences || !sentences[currentSentenceIndex]) {
          return null;
        }      
        const sentence = sentences[currentSentenceIndex];
        console.log('sentence:', sentence);
        const parts = sentence.split(/\{(.*?)\}/g);
        const sentenceOptions = parts.map((part, index) => {
          if (part.includes('/')) {
            const options = part.split('/');
            return (
              <select
                key={index}
                value={sentenceInputs[index] || ''}
                onChange={(event) => handleInputChange(event, index)}
              >
                <option value=""></option>
                {options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          } else if (part.includes('#')) {
            const partFragments = part.split('#');
            return (
              <span key={index}>
                {partFragments[0]}
                <input 
                  type="text"
                  style={{width: '7%', textAlign: 'right'}}
                  value={sentenceInputs[index] || ''}
                  onChange={(event) => handleInputChange(event, index)}
                />
                {partFragments[1]}
              </span>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        });
    
        onValueChange(currentSentence)
        return <>{sentenceOptions}</>;
      };

    useEffect(() => {
        const sentence = sentences[currentSentenceIndex];
        if (!sentence) {
          // sentence is undefined
          // do something, or just return
          return;
        }
        const parts = sentence.split(/(\{.*?\})/g);
        let newSentence = "";
        for(let i = 0; i < parts.length; i++) {
            if(parts[i].includes('/')) {
                newSentence += sentenceInputs[i] ? sentenceInputs[i] : parts[i];
            } else if (parts[i].includes('#')) {
                newSentence += sentenceInputs[i] ? parts[i].replace('#', sentenceInputs[i]) : parts[i];
            } else {
                newSentence += parts[i];
            }
        }
        setCurrentSentence(newSentence);
    }, [currentSentenceIndex, sentenceInputs, sentences])

    return (
      <div >
        {renderSentence()}
       
        <div>
        <Button onClick={handleClick}>CHANGE</Button>
        </div>
      </div>
    );
  }

export default Description
