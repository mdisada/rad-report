import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import db from '../../config';
import DescriptionModal from './DescriptionModal'; // import the modal component

function Description({ onValueChange, section, disease, findings, modality}) {
  // Use 'localFindings' instead of 'findings'
  const [localFindings, setLocalFindings] = useState(findings);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentenceInputs, setSentenceInputs] = useState({});
  const [currentSentence, setCurrentSentence] = useState("");

  const handleClick = () => {
    setCurrentSentenceIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % localFindings.length;
      return isNaN(newIndex) ? 0 : newIndex;
    });
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const updatedInputs = { ...sentenceInputs, [index]: value };
    setSentenceInputs(updatedInputs);
  };

  const renderSentence = () => {
    console.log("section:", section);
    console.log("disease:", disease);
    console.log("localFindings:", localFindings);
    console.log(currentSentenceIndex);
    if (!localFindings || !localFindings[currentSentenceIndex]) {
      return null;
    }
    const sentence = localFindings[currentSentenceIndex];
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
    const sentence = localFindings[currentSentenceIndex];
    if (!sentence) {
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
    onValueChange(newSentence);
  }, [currentSentenceIndex, sentenceInputs, localFindings, onValueChange]);

  const [open, setOpen] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleAddNewDescription = async (newDescription) => {
    if (newDescription) {
      // Query the Firestore for the disease document
      const diseasesCollection = collection(db, "diseases");
      const q = query(
        diseasesCollection,
        where("name", "==", disease),
        where("modality", "==", modality)
      );
      const querySnapshot = await getDocs(q);
  
      let diseaseDocId = null;
      querySnapshot.forEach((doc) => {
        diseaseDocId = doc.id;
      });
  
      if (diseaseDocId) {
        const diseaseRef = doc(db, "diseases", diseaseDocId);
  
        await updateDoc(diseaseRef, {
          findings: arrayUnion(newDescription),
        });
  
        setLocalFindings((oldFindings) => [...oldFindings, newDescription]);
      } else {
        console.error(
          "No disease document found with the specified name and modality"
        );
      }
    }
};
  
  return (
    <div>
      {renderSentence()}
      <div>
        <Button onClick={handleClick}>CHANGE</Button>
        <DescriptionModal disease={disease} setLocalFindings={setLocalFindings} onAddNewDescription={handleAddNewDescription} findings={localFindings} modality={modality} />
      </div>
    </div>
  );
}

export default Description;