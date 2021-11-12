import React, { useEffect, useState} from 'react';
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import HistoryLinkPage from "./pages/HistoryLinkPage";
import CookiesPage from "./pages/CookiesPage";
import { ResultsProvider } from "./contexts/ResultsProvider";
import { SelectProvider } from "./contexts/SelectProvider";
import { LoaderProvider } from './contexts/LoaderProvider';
import { auth, db } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
    const [user, setUser] = useState(() => {
      const user = auth.currentUser;
      return user;
    });

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        user ? setUser(user) : setUser(null);
        console.log("user", user);
      });
    }, []);
  
  const [cookies, setCookies] = useState(() => {
    const saved = localStorage.getItem("cookies");
    return saved || "";
  });
  useEffect(() => {
    localStorage.setItem("cookies", cookies);
  }, [cookies])

  const [records, setRecords] = useState([]);
  useEffect( () => {
    async function fetchData() {
      if (user) {
          db.collection("lnScrapingUsers")
            .doc(user?.uid)
            .collection("searchHistory")
            .orderBy("created", "desc")
            .onSnapshot((snapshot) =>
              setRecords(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              )
            );
      } else {
        setRecords([]);        
      }      
    }
    fetchData();
    }, [user]);
  
  return (
  <ResultsProvider>
      <SelectProvider>
        <LoaderProvider>        
      <Router>
        <div className=" h-screen">

            <Header user={user} />
            <Switch>
              <Route exact path="/">
                <HomePage user={user} records={records} cookies={cookies} />
              </Route>
              <Route exact path="/history">
                <HistoryPage records={records} />
              </Route>
              <Route path="/historylink">
                <HistoryLinkPage records={records} />
              </Route>
              <Route path="/cookies">
                <CookiesPage cookies={cookies} setCookies={setCookies} />
              </Route>
            </Switch>
        </div>
      </Router>
      </LoaderProvider>
    </SelectProvider>   
  </ResultsProvider>  
  );
}

export default App;
