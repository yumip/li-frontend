import { createContext, useContext, useState } from "react";

const ResultsContext = createContext();

function ResultsProvider(props) {
    const [results, setResults] = useState(null);
  const value = [results, setResults];
    return <ResultsContext.Provider value={value} {...props} />;
}

function useResultsContext() {
  const value = useContext(ResultsContext);
  if (!value) {
    throw new Error(
      "useResultsContext must be rendered within the ResultsProvider"
    );
  }
  return value;
}

export { useResultsContext, ResultsProvider };
