import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useState } from "react";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import StatisticsPage from "./StatisticsPage";
import { userInfo } from "./JSON_exemples";
import SideBar from "./SideBar";
import WalletPage from "./WalletPage";

function App() {
  const [hasAccount, setHasAccount] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [sideBar, setSideBar] = useState(false);

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const toggleSidebar = () => {
    setSideBar(!sideBar);
  };

  const componentRenderer = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "history":
        return <HistoryPage />;
      case "statistics":
        return <StatisticsPage />;
      case "wallet":
        return <WalletPage />;
      default:
        return <HomePage />;
    }
  };

  const handleLogging = () => {
    setIsLogged(!isLogged);
  };

  const changeForm = () => {
    setHasAccount(!hasAccount);
  };

  const register = hasAccount ? (
    <LogIn changeForm={changeForm} hasLogged={handleLogging} />
  ) : (
    <SignUp changeForm={changeForm} />
  );

  const functional = (
    <>
      {sideBar && (
        <SideBar
          username={userInfo.userName}
          onPageChange={handlePageChange}
          onClose={toggleSidebar}
          logOut={handleLogging}
        />
      )}
      <button className="logo" onClick={toggleSidebar}>
        AISE
      </button>
      {componentRenderer()}
    </>
  );

  return <div id="app">{isLogged ? functional : register}</div>;
}

export default App;
