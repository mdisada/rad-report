import { Autocomplete, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../config';
import Description from "./Description";

function AddFindings({ onValueChange, section, modality }) {

  const [disease, setDisease] = useState("");
  const [inputValue, setInputValue] = useState('')
  const [diseaseList, setDiseaseList] = useState([]);
  const [findingsMap, setFindingsMap] = useState({});
  const [localFindings, setLocalFindings] = useState([]);  // move localFindings state up to AddFindings

  useEffect(() => {
    const fetchDiseases = async () => {
      if (modality && section) {
        const diseasesCol = collection(db, 'diseases');
        const diseasesQuery = query(diseasesCol, where('modality', '==', modality), where('organ_section', '==', section));
        const diseasesSnapshot = await getDocs(diseasesQuery);
        const diseasesMap = diseasesSnapshot.docs.reduce((map, doc) => {
          const data = doc.data();
          map[data.name] = data.findings;  // use the disease name as the key and findings as the value
          return map;
        }, {});
        setDiseaseList(Object.keys(diseasesMap));
        setFindingsMap(diseasesMap);
      }
    };
    
    fetchDiseases();
  }, [modality, section]);
  
  return (
    <div>
      <Stack spacing={2} width="540px" style={{ padding: "5px" }}>
      <Autocomplete
        size="small"
        options={diseaseList}
        renderInput={(params) => <TextField {...params} />}
        autoSelect={true}
        autoComplete={true}
        onChange={(event, newValue) => {
          setDisease(newValue);
          setLocalFindings(findingsMap[newValue] || []);  // set the findings using findingsMap
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
        {disease && <Description onValueChange={onValueChange} section={section} disease={disease} modality={modality} findings={localFindings} setLocalFindings={setLocalFindings}/>}
      </Stack>
    </div>
  );
}

export default AddFindings;
