import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../../config';
import DescriptionModal from './DescriptionModal';
import { Select } from "@blueprintjs/select";
import { MenuItem , FormGroup, InputGroup } from "@blueprintjs/core";


function Description({ onValueChange, section, modality }) {
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentenceInputs, setSentenceInputs] = useState({});
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");

  const fetchSentences = async () => {
    const normalCollection = collection(db, "normal");
    const q = query(
      normalCollection,
      where("organ_section", "==", section),
      where("modality", "==", modality)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const normalDoc = querySnapshot.docs[0];
      const data = normalDoc.data();
      const findings = data.findings || [];
      setSentences(findings);
    } else {
      setSentences([]);
    }
  };

  const handleClick = () => {
    setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setSentenceInputs((prevInputs) => ({ ...prevInputs, [index]: value }));
  };

  const handleSelectChange = (value, index) => {
    setSentenceInputs((prevInputs) => ({ ...prevInputs, [index]: value }));
  };

  const renderOption = (option, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={option}
        onClick={handleClick}
        text={option}
      />
    );
  };

  useEffect(() => {
    fetchSentences();
  }, [disease, modality]);

  useEffect(() => {
    if (sentences.length > 0) {
      const sentence = sentences[currentSentenceIndex];
      const parts = sentence.split(/(\{.*?\}|#)/g);
      let newSentenceInputs = {};
      parts.forEach((part, index) => {
        if (part.includes("{") && part.includes("}")) {
          const options = part.replace(/[\{\}]/g, "").split("/");
          newSentenceInputs[index] = options[0]; // Set initial value for SelectItem
        } else if (part === "#") {
          newSentenceInputs[index] = ""; // Set initial value for input field
        }
      });
      setSentenceInputs(newSentenceInputs);
    }
  }, [sentences, currentSentenceIndex])


  const renderCurrentSentence = () => {
    const sentence = sentences[currentSentenceIndex];
    if (!sentence) return null; 
  
    const parts = sentence.split(/(\{.*?\}|#)/g);
    return (
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        {parts.map((part, index) => {
          if (part.includes("{") && part.includes("}")) {
            const options = part.replace(/[\{\}]/g, "").split("/");
            const initialText = options[0]; // Extract initial text
            return (
              
<FormGroup key={index} inline={true}>
  <Select
    items={options}
    itemRenderer={renderOption}
    onItemSelect={(item) => handleSelectChange(item, index)}
    filterable={false}
    popoverProps={{ minimal: true }}
  >
    <InputGroup
      placeholder="Select..."
      rightIcon="double-caret-vertical"
      value={sentenceInputs[index]}
      readOnly
    />
  </Select>
</FormGroup>

            );
          } else if (part === "#") {
            return (
              <input
                key={index}
                type="text"
                value={sentenceInputs[index] || ""}
                onChange={(event) => handleInputChange(event, index)}
                style={{ margin: '0 5px' }} // Add some space around inputs
              />
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };
  
    useEffect(() => {
      if (sentences.length === 0) {
        onValueChange("");
        return;
      }
      
  
      const sentence = sentences[currentSentenceIndex];
      if (sentence) {
        const parts = sentence.split(/(\{.*?\}|#)/g);
  
        const newSentence = parts.map((part, index) => {
          if (part.includes("{") && part.includes("}")) {
            return sentenceInputs[index] || part;
          } else if (part === "#") {
            return sentenceInputs[index] || part;
          }
          return part;
        }).join('');
  
        onValueChange(newSentence);
      }
    }, [currentSentenceIndex, sentenceInputs, sentences, onValueChange]);


  return (
    <div>
      {renderCurrentSentence()}
      <div>
        <Button onClick={handleClick}>CHANGE</Button>
        <DescriptionModal
  disease={disease}
  modality={modality}
  onAddNewDescription={fetchSentences}
  setCurrentDescription={setCurrentDescription}
        />
      </div>
    </div>
  );
}

export default Description;