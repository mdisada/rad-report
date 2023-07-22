// import { useState } from 'react'
// import {FormGroup, RadioGroup, Radio} from '@blueprintjs/core'
// import AddFindings from './AddFindings';
// import NormalDescription from './Normal/NormalDescription';
// //import { Radio, RadioGroup } from 


// function NormalOrAbnormal({onValueChange, onNormal, onAbnormal, section, modality}) {
    
//     const [selectedOption, setSelectedOption] = useState('');

//     const handleOptionChange = (event) => {
//       setSelectedOption(event.target.value);
//       if (event.target.value === 'normal') {
//         onNormal();
//       } else {
//         onNormal("")
//         onValueChange('');
//         if (event.target.value === 'abnormal') {
//           onAbnormal()} 
//       }
//     };
//     const renderAddFindings = () => {
//       if (selectedOption === 'abnormal') {
//         return <AddFindings onValueChange={onValueChange} section={section} modality={modality}/>;
//       }
//       if (selectedOption === 'normal') {
//         return <NormalDescription onValueChange={onValueChange} section={section} modality={modality}/>
//       }
//       return null;
//     };


//   return (
//     <div>
//         <RadioGroup inline={true} onChange={handleOptionChange} selectedValue={selectedOption} >
//             <Radio 
//                 value={'normal'}
//                 label='Normal'
//                 /> 
        
//         <Radio 
//             value={'abnormal'}
//             label='Abnormal'
//             />    
//         </RadioGroup>

//         {renderAddFindings()}
//     </div>
//      );
// }

// export default NormalOrAbnormal;