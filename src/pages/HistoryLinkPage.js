import History from "../components/History";

export default function HistoryLinkPage({ records}) {
  return (
    <div className="flex justify-center items-center mx-auto px-4 w-screen">
      <div className="flex justify-center flex-grow">
        <div className="lg:hidden w-screen">
                  <History records={records} historyLink={true}/>
        </div>
      </div>
    </div>
  );
}
