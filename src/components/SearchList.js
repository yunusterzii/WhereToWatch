import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import StreamingCard from "./StreamingCard";

const SearchList = () => {
    const [listItems, setListItems] = useState([]);
    const lang = localStorage.getItem("language");
    const location = useLocation();
    const search = location.pathname.split("/")[2];

    const Fetch = async (search) => {
        const url = "https://api.themoviedb.org/3/search/movie?api_key=8151741cef380652f287f81ee920821d&page=1&language=" + lang + "&query=" + search;
        const res = await fetch(url);
        const data = await res.json();
        setListItems(data.results.map((element, key) => 
        <Row key={key} className="d-flex justify-content-center m-auto" style={{background: "rgb(217, 228, 241)"}}>
            <Card className="mx-4 my-2 rounded" style={{width : "80vw"}}>
                <Card.Body>
                    <Row>
                        <Col xs={8}>
                            <Card.Title><Link style={{color: "black", textDecoration: "none"}} to={"/movie/" + element.title + "&id=" + element.id}>{element.title}</Link></Card.Title>
                            <Card.Text> {element.release_date.split("-")[0]} </Card.Text>
                            <Card.Text> {element.overview} </Card.Text>
                            <StreamingCard id={element.id}/>
                        </Col>
                        <Col xs={4} style={{display: "flex", justifyContent: "right"}}>
                            <Card.Img style={{height : "12em", width : "8em"}} className="d-flex" src={"https://image.tmdb.org/t/p/original/" + element.poster_path} alt="picture"></Card.Img>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Row>
        ));
    }

    useEffect(() => {
        Fetch(search);
    }, [search, lang]);

    return (
        <Row>
            {listItems.length === 0 && "Can't found any movie :/"}
            {listItems.length !== 0 && listItems}
        </Row>
    );
}

export default SearchList;