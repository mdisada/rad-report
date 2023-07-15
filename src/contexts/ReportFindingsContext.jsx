import { createContext, useReducer } from "react";

const initialState = []; // Initialize as an empty array
function reducer(state, action) {
  switch (action.type) {
    case "ADD_FINDING": // action to add a finding
      // remove any existing finding with the same section
      const newState = state.filter(finding => finding.section !== action.payload.section);

      return [...newState, action.payload]; // add the new finding to the array
    default:
      throw new Error();
  }
}

export const ReportFindingsContext = createContext();

export function ReportFindingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReportFindingsContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportFindingsContext.Provider>
  );
}
