import { createContext, useContext, useState } from "react";

const SelectContext = createContext();

function SelectProvider(props) {
    const [select, setSelect] = useState(null);
  const value = [select, setSelect];
    return <SelectContext.Provider value={value} {...props} />;
}

function useSelectContext() {
  const value = useContext(SelectContext);
  if (!value) {
    throw new Error(
      "useSelectContext must be rendered within the SelectProvider"
    );
  }
  return value;
}

export { useSelectContext, SelectProvider };
