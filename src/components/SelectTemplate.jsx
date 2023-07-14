import { Stack, Autocomplete, TextField } from "@mui/material"
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import db from '../config'
import FindingsSection from "./FindingsSection"


function SelectTemplate () {

  const [studyName , setStudyName] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [template, setTemplate] = useState({
    label: "",
    modality: "",
    always_contrast: null,
    organ_sections: [],
    users: "",
  })

  const [studies, setStudies] = useState([]); // Use state for the studies
  
  // Fetch the studies from Firestore on component mount
  useEffect(() => {
    const fetchStudies = async () => {
      const studiesCol = collection(db, 'templates');
      const studiesSnapshot = await getDocs(studiesCol);
      const studiesList = studiesSnapshot.docs.map(doc => doc.data());
      setStudies(studiesList);
    };
    
    fetchStudies();
  }, []);

  const handleOnChange = (_, newValue) => {
    // Check if newValue is null
    if (newValue) {
      setStudyName(newValue);
      setTemplate({
        label: newValue.label,
        modality: newValue.modality,
        always_contrast: newValue.always_contrast,
        organ_sections: newValue.organ_sections || [],
        users: newValue.users
      });
    } else {
      // If newValue is null, reset study and template
      setStudyName(null);
      setTemplate({
        label: "",
        modality: "",
        always_contrast: null,
        organ_sections: [],
        users: "",
      });
    }
  };
  return (
    <Stack spacing={2} width='600px' style={{padding: "20px"}}>
      <Autocomplete 
      options={studies} 
      renderInput={(params) => <TextField {...params}
            label = 'Templates' />}
      autoSelect = {true}
      autoComplete = {true}
      studyName = {studyName}
      onChange={handleOnChange}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }
      }
      />
      <FindingsSection template={template}/>
    </Stack>
  )
}

export default SelectTemplate