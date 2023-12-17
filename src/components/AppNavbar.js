import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import LanguageBar from "../components/LanguageBar";
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from "react-router-dom";

const AppNavbar = () => {
    return(
        <Container fluid className="d-flex" style={{justifyContent : "space-between", width: "100vw", background: "rgb(2, 38, 38)"}}>
          <Link className="d-flex justify-content-center m-auto" to={"/"}><AiOutlineHome style={{fontSize : "2.5em", color: "white"}} /></Link>
          <SearchBar />
          <LanguageBar />
        </Container>
    );
}

export default AppNavbar;