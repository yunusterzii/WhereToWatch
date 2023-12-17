import AppNavbar from "../components/AppNavbar.js";
import SearchList from "../components/SearchList.js";

const SearchPage = () => {
    return(
      <div style={{background: "rgb(2, 46, 48)", height: "100vh"}}>
        <AppNavbar />
        <SearchList />
      </div>
    );
}

export default SearchPage;