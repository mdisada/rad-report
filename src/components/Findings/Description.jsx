import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import db from '../../config';
import DescriptionModal from './DescriptionModal'; // import the modal component

function Description({ onValueChange, section, modality, disease }) {
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentenceInputs, setSentenceInputs] = useState({});
  const [currentSentence, setCurrentSentence] = useState("");

  const fetchSentences = async () => {
    const diseasesCollection = collection(db, "diseases");
    const q = query(
      diseasesCollection,
      where("name", "==", disease),
      where("modality", "==", modality)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const diseaseDoc = querySnapshot.docs[0];
      const data = diseaseDoc.data();
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

  useEffect(() => {
    fetchSentences();
  }, [disease, modality]);

  useEffect(() => {
    if (sentences.length === 0) {
      setCurrentSentence("");
      onValueChange("");
      return;
    }

    const sentence = sentences[currentSentenceIndex];
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
  }, [currentSentenceIndex, sentenceInputs, sentences, onValueChange]);

  return (
    <div>
      {currentSentence}
      <div>
        <Button onClick={handleClick}>CHANGE</Button>
        <DescriptionModal
          disease={disease}
          modality={modality}
          onAddNewDescription={fetchSentences}
        />
      </div>
    </div>
  );
}

export default Description;
