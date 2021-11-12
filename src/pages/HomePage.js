import Results from "../components/Results";
import History from "../components/History";
import Search from "../components/Search";
import { useSelectContext } from "../contexts/SelectProvider";

export default function HomePage({ user, cookies, records }) {
    const [, setSelect] = useSelectContext();

    return (
      <div className="flex justify-center items-center mx-auto px-4">
        <div className="flex justify-center flex-grow">
          <div className="max-w-max">
            <Search
              user={user}
              cookies={cookies}
              onClick={() => setSelect("current")}
            />
            <Results records={records} />
          </div>
          <div className="w-1/4 hidden lg:block">
            <History records={records} />
          </div>
        </div>
      </div>
    );
}