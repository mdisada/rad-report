import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { updateDoc, arrayUnion, doc, collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../config';

function DescriptionModal({ disease, setLocalFindings, modality }) {
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
        handleClose();
      
      } else {
        console.error(
          "No disease document found with the specified name and modality"
        );
      }
    }
  };
  
  return (
    <>
      <Button onClick={handleOpen}>Add New Description</Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ backgroundColor: '#fff', padding: '20px' }}>
          <h3>Add New Description</h3>
          <label>Disease: {disease}</label>
          <div>
            <textarea 
              style={{ padding: '10px', minWidth: '500px' }}
              value={newDescription}
              onChange={handleNewDescriptionChange}
            />
           <Button onClick={() => handleAddNewDescription(newDescription)}>Add</Button>

          </div>
        </div>
      </Modal>
    </>
  );
}

export default DescriptionModal;