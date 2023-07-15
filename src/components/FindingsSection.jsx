import Organ from './Organ'
import { Button } from '@mui/material'
import { useContext } from "react";
import { ReportFindingsContext } from "../contexts/ReportFindingsContext";

function FindingsSection(props) {
    const template = props.template
    const sections = template.organ_sections
    const modality = template.modality
    const { state: reportFindings } = useContext(ReportFindingsContext);

    const handleDisplayChange = (newDisplay) => {
        console.log('New display: ', newDisplay);
    }

    const handleGenerateReport = () => {
        console.log(reportFindings);
    }

    const listSections = sections.map((section) =>
            <Organ key={section} section={section} modality={modality} onDisplayChange={handleDisplayChange}></Organ>)
    return (
        <div>
            {listSections}
            <Button onClick={handleGenerateReport}>Generate Report</Button>
    </div>
    )
}

export default FindingsSection
