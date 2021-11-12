import Results from "../components/Results";
import History from "../components/History";

export default function HistoryPage({ records }) {
  
  return (
    <div className="flex justify-center items-center mx-auto px-4">
      <div className="flex justify-center flex-grow">
        <div className="max-w-max">
          <Results records={records} />
        </div>
        <div className="w-1/4 hidden lg:block">
          <History records={records} />
        </div>
      </div>
    </div>
  );
}
