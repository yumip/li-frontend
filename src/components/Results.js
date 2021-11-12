import { useResultsContext } from "../contexts/ResultsProvider";
import Loader from "./Loader";
import Error from "./Error";
import { useLoaderContext } from "../contexts/LoaderProvider";
import { useSelectContext } from "../contexts/SelectProvider";
import { useEffect, useState } from "react";

export default function Results({records}) {
    const [results] = useResultsContext();
    const [select] = useSelectContext();
    const [outputs, setOutputs] = useState(results)
    // const [loader] = useLoaderContext();

    useEffect(() => {

        if (select === "current") {
           setOutputs(results)
        } else {
            const recordfilter = records.filter((item) => item.id === select);
           setOutputs(recordfilter[0]?.data.profiles);
        }
    }, [records, results, setOutputs, select, outputs]);
    
 
    return (
      <>
        <div>
          {outputs?.map((result) => (
            <div
              className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center m-7"
              key={result.link}
            >
              <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
                <div className="m-2">
                  <div className="font-bold rounded-full text-white h-12 w-12 flex items-center justify-center bg-gray-500">
                    {result.connectionDistance.split(" ")[0]}
                  </div>
                </div>
                <div className="m-2 w-full text-center md:text-left">
                  <h1 className="text-xl font-medium text-gray-700">
                    {result.name}
                  </h1>
                  <div className="text-gray-600 text-sm">
                    {result.notes.map((line, key) => (
                      <p key={key}> {line} </p>
                    ))}
                  </div>
                </div>
                <div className="m-2">
                  <a
                    href={result.link}
                    className="bg-blue-500 hover:opacity-75 text-white rounded-full px-8 py-2"
                  >
                    Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
}
