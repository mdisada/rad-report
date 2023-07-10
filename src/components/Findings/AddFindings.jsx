import {
  Autocomplete,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import diseases from "../../data/Diseases";
import Description from "./Description";


function AddFindings({ onValueChange, section}) {
  
  const [disease, setDisease] = useState("");
  const [inputValue, setInputValue] = useState('')

  const disease_list =Object.keys(diseases[section])

  const handleClick = () => {
    console.log(disease)
  };

  const handleChange = (_, newValue) => {
    setDisease(newValue);
  };


  const renderDescription = () => {
    if (disease) {
      console.log(disease)
      return <Description onValueChange={onValueChange} section={section} disease={disease}/>;
    }
    return null;
  };
  
  return (
    <div>
      <Stack spacing={2} width="540px" style={{ padding: "5px" }}>
        <Autocomplete
          size = "small"
          options={disease_list}
          renderInput={(params) => <TextField {...params} />}
          autoSelect={true}
          autoComplete={true}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
        {renderDescription()}
      </Stack>
    </div>
  );
}

export default AddFindings;
