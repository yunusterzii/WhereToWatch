import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MovieCard = () => {
    const [infos, setInfos] = useState([])
    const lang = localStorage.getItem("language");

    const FetchInfo = async () => {
        const url = "https://api.themoviedb.org/3/movie/popular?api_key=8151741cef380652f287f81ee920821d&language=" + lang + "&page=1";
        const res = await fetch(url);
        const element = await res.json();
        const movies = element.results;
        setInfos(movies.map((movie, key) => 
            <Col key={key} style={{margin : "0", padding : "0", display : "flex"}}>
                <Container style={{width : "18em", height : "32em", padding : "0", margin : "1.5em", background : "white"}}>
                    <Row style={{margin : "0", padding : "0", display : "flex"}}>
                        <img style={{height : "%100", margin : "0", padding : "0", display : "flex"}} src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}></img>
                    </Row>
                    <Row style={{margin : "0", padding : "0", height : "%100"}}>
                        <Link to={"/movie/" + movie.title + "&id=" + movie.id} style={{color: "black", textDecoration: "none", display : "flex", textAlign : "center", justifyContent : "center", font : "bold", fontSize : "1.5em"}}>{movie.title}</Link>
                    </Row>
                </Container>
            </Col>
        ))

    }

    useEffect(() => {
        FetchInfo();
    }, [lang]);

    return(
        <Row fluid style={{background : "rgb(217, 228, 241)"}}>
            {infos}
        </Row>
    )

}

export default MovieCard;