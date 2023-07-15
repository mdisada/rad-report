import { createContext, useReducer } from "react";

const initialState = []; // Initialize as an empty array
function reducer(state, action) {
  switch (action.type) {
    case "ADD_DISEASE": // action to add a disease
      return [...state, action.payload]; // add the new disease to the array
    default:
      throw new Error();
  }
}

export const DiseaseContext = createContext();

export function DiseaseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DiseaseContext.Provider value={{ state, dispatch }}>
      {children}
    </DiseaseContext.Provider>
  );
}
