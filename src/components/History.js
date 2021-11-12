import React from "react";
import { useSelectContext } from "../contexts/SelectProvider";
import { Link } from "react-router-dom";


function Record({ onClick, keyword, created }) {
    return (
    <button onClick={onClick}>
        <h2 className="text-lg text-left">{keyword}</h2>
        <p className="text-xs text-gray-400 text-left">
          {new Date(created).toString()}
        </p>
      </button>
    );
} 

export default function History({records, historyLink}) {
    const [, setSelect] = useSelectContext();
  return (
    <div className="flex flex-auto items-center justify-center h-auto p-5">
      <div className="container">
        <div className="flex justify-center overflow-auto lg:max-h-full">
          <div className="bg-white shadow-xl rounded-lg h-full w-full">
            <ul className="divide-y divide-gray-300">
              <li className="font-bold text-lg p-4 cursor-pointer bg-blue-500 text-white rounded-t-lg">
                History
              </li>
              {records?.map((record) => (
                <li
                  key={record.id}
                  className="p-4 hover:bg-gray-100 cursor-pointer focus:ring-blue-600"
                >
                  {historyLink ? (
                    <Link to="/history">
                      <Record
                        onClick={() => setSelect(record.id)}
                        keyword={record.data.keyword}
                        created={record.data.created}
                      />
                    </Link>
                  ) : (
                    <Record
                      onClick={() => setSelect(record.id)}
                      keyword={record.data.keyword}
                      created={record.data.created}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

History.defaultProps = {
    historyLink: false
}
