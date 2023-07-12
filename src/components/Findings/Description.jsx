import { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import diseases from "../../data/Diseases";

function Description({ onValueChange, section, disease }) {
  const sentences = diseases[section][disease]["Finding"];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentenceInputs, setSentenceInputs] = useState({});
  const [currentSentence, setCurrentSentence] = useState("");

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
    console.log("section:", section);
    console.log("disease:", disease);
    console.log("sentences:", sentences);
    console.log(currentSentenceIndex);
    if (!sentences || !sentences[currentSentenceIndex]) {
      return null;
    }
    const sentence = sentences[currentSentenceIndex];
    console.log("sentence:", sentence);
    const parts = sentence.split(/\{(.*?)\}/g);
    const sentenceOptions = parts.map((part, index) => {
      if (part.includes("/")) {
        const options = part.split("/");
        return (
          <select
            key={index}
            value={sentenceInputs[index] || ""}
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
      } else if (part.includes("#")) {
        const partFragments = part.split("#");
        return (
          <span key={index}>
            {partFragments[0]}
            <input
              type="text"
              style={{ width: "7%", textAlign: "right" }}
              value={sentenceInputs[index] || ""}
              onChange={(event) => handleInputChange(event, index)}
            />
            {partFragments[1]}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });

    onValueChange(currentSentence);
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
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].includes("/")) {
        newSentence += sentenceInputs[i] ? sentenceInputs[i] : parts[i];
      } else if (parts[i].includes("#")) {
        newSentence += sentenceInputs[i]
          ? parts[i].replace("#", sentenceInputs[i])
          : parts[i];
      } else {
        newSentence += parts[i];
      }
    }
    setCurrentSentence(newSentence);
  }, [currentSentenceIndex, sentenceInputs, sentences]);

  const [open, setOpen] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleAddNewDescription = () => {
    if (newDescription) {
      diseases[section][disease]["Finding"].push(newDescription);
      handleClose();
      setNewDescription("");
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bakgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {renderSentence()}
      <div>
        <Button onClick={handleClick}>CHANGE</Button>
        <Button onClick={handleOpen}>Add New Description</Button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div style={{ backgroundColor: '#fff', padding: '20px' }}>
          <h2>Add New Description</h2>
          <label>Disease: {disease}</label>
          <div>
          <textarea 
            style={{ padding: '10px', minWidth: '500px' }}
            value={newDescription}
            onChange={handleNewDescriptionChange}
          />
          <Button onClick={handleAddNewDescription}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Description;
