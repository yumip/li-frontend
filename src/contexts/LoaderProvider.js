import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

function LoaderProvider(props) {
    const [loader, setLoader] = useState(null);
  const value = [loader, setLoader];
    return <LoaderContext.Provider value={value} {...props} />;
}

function useLoaderContext() {
  const value = useContext(LoaderContext);
  if (!value) {
    throw new Error(
      "useLoaderContext must be rendered within the LoaderProvider"
    );
  }
  return value;
}

export { useLoaderContext, LoaderProvider };
