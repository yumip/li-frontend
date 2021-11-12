import { useEffect, useState} from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useResultsContext } from "../contexts/ResultsProvider";
import { useLoaderContext } from "../contexts/LoaderProvider";
import { db } from "../firebase";

export default function Search({ cookies, user, onClick }) {
  const [, setResults] = useResultsContext();
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useLoaderContext({
    isLoading: false,
    isError: false,
  });
      function handleSubmit(e) {
        e.preventDefault();
        setSearch(type);
        setType("");
        // alert(`Submitting Name ${type}`);
      }
  
    useEffect(() => {
      // console.log(search);
      // console.log(cookies);
      setResults(null);
      if (!search) {
            return;
      }
      if (!cookies) {
        alert("Please input cookies");
        return;
      }
      if (!user) {
        alert("Please login first");
        return;
      }
        setLoader({
          ...loader,
          isLoading: true,
        });
        axios
          .post(
            // "https://8080-cs-364514979182-default.cs-asia-southeast1-ajrg.cloudshell.dev/",
            // "https://australia-southeast1-almostawake.cloudfunctions.net/LNScrapingByName",
            "https://us-central1-almostawake.cloudfunctions.net/scrapeResults",
            {
              profiles: [search],
              cookies: JSON.parse(cookies),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((result) => {
            //console.log(result);
            const searchResults = result.data.profiles[0].searchResults;
            const profiles = searchResults.map((result) => {
              return {
                connectionDistance: result[1],
                name: result[0],
                notes: result.slice(2, -1),
                link: result.at(-1),
              };
            });
            db.collection("lnScrapingUsers")
              .doc(user?.uid)
              .collection("searchHistory")
              .add({
                keyword: search,
                profiles: profiles,
                created: Date.now(),
              })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch((e) => {
                console.error("Error adding document: ", e);
              });
            setSearch("");
            setLoader({
              ...loader,
              isLoading: false,
            });
            setResults(profiles);
          })
          .catch((error) => {
            console.log(error);
            setLoader({
              ...loader,
              isLoading: false,
              isError: true,
            });
            setSearch("");
          });
      }, [search, setResults, cookies, user, setLoader]);

 

    return (
      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <div className="bg-white flex items-center rounded-full shadow-xl">
            <input
              className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="search"
              placeholder="Search"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <div className="p-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                onClick={onClick}
              >
                <SearchIcon className="h-5 w-5 text-white-500" />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
}