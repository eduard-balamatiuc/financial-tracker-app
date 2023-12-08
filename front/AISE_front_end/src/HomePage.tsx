import Basics from "./Basics";
import HomePageChart from "./HomePageChart";
import HomePageList from "./HomePageList";

function HomePage() {
  return (
    <div className="home-page">
      <HomePageList />
      <div className="home-page-right">
        <Basics />
        <HomePageChart />
      </div>
    </div>
  );
}

export default HomePage;
