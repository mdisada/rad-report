
import { FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useState } from 'react'
import AddFindings from './AddFindings';


function NormalOrAbnormal({onValueChange, onNormal, onAbnormal, section}) {
    
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      if (event.target.value === 'normal') {
        onNormal(' Grossly unremarkable');
      } else {
        onNormal("")
        onValueChange('');
        if (event.target.value === 'abnormal') {
          onAbnormal()} 
      }
    };
    const renderAddFindings = () => {
      if (selectedOption === 'abnormal') {

        return <AddFindings onValueChange={onValueChange} section={section}/>;
      }
      return null;
    };


  return (
    <FormControl>
        <RadioGroup row>
        <FormControlLabel value="normal" control={
            <Radio 
                onChange={handleOptionChange}
                checked={selectedOption === 'normal'}
                />} label="Normal" />
        <FormControlLabel value="abnormal" control={
        <Radio 
            onChange={handleOptionChange}
            checked={selectedOption === 'abnormal'}
            />} label="Abnormal" />      
        </RadioGroup>


        {renderAddFindings()}
    </FormControl>
     );
}

export default NormalOrAbnormal;