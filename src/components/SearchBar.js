import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const SearchBar = () => {
    const [searchValue, SetSearchValue] = useState("");
    const navigate = useNavigate();

    return(
        <Container className="d-flex justify-content-center m-auto">
            <Row style={{width : "70%", padding : 0}} className="mx-4 my-3">
                <input style={{resize : "none", outline : "none", border : "none"}} className="" type="text" placeholder="Search" onChange={(event) => {
                    SetSearchValue(event.target.value);
                }} onKeyDown={(event) => {
                    if(event.key === "13" || event.key === "Enter"){
                        navigate("/search/" + searchValue);
                    }
                }}></input>
            </Row>
        </Container>
    );
}

export default SearchBar