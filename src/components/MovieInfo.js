import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Card, Container, Col, Carousel } from "react-bootstrap";
import StreamingCard from "./StreamingCard";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const MovieInfo = () => {
    const [movieInfo, setMovieInfo] = useState(null);
    const [movieActors, setMovieActors] = useState(null);
    const [movieDirectors, setMovieDirectors] = useState(null);
    const [movieRecommends, setMovieRecommends] = useState(null);
    const lang = localStorage.getItem("language");
    const location = useLocation();
    const id = location.pathname.split("/")[2].split("=")[1];

    const FetchInfo = async () => {
        const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=8151741cef380652f287f81ee920821d&language=" + lang;
        const res = await fetch(url);
        const element = await res.json();
        const genres = [];
        element.genres.forEach(e => {genres.push(
            <div style={{display: "inline-block", marginRight : "0.5em"}}>{e.name}</div>)});
        setMovieInfo(
            <Card style={{width : "60vw", border : "none", background : "rgb(2, 38, 38)", marginTop: "2rem"}}>
                <Row style={{background : "rgb(2, 38, 38)", borderRadius : "1em"}}>
                    <Col style={{padding : "0"}} xs={4}>
                        <Card.Img style={{width : "100%", padding : "0"}} className="d-flex" src={"https://image.tmdb.org/t/p/original/" + element.poster_path} alt="picture"></Card.Img>
                    </Col>
                    <Col style={{marginLeft : "1em", marginTop: "1rem"}} cs={8}>
                        <Card.Title style={{color: "white"}}>{element.title}</Card.Title>
                        <Card.Text style={{marginTop : "2em", color: "white"}}>{element.overview}</Card.Text>
                        <Card.Text style={{display : "flex", color: "white"}}>{genres}</Card.Text>
                        <Card.Text style={{marginTop : "0.5em", color: "white"}} className="d-flex">
                            <div style={{display: "inline-block", marginRight : "1em", color: "white"}}>{element.runtime + " mins"}</div>
                            <div style={{display: "inline-block", marginRight : "1em", color: "white"}}>{element.release_date}</div>
                        </Card.Text>
                    </Col>
                </Row>
            </Card>
        )
    }

    const FetchCredits = async () => {
        const url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=8151741cef380652f287f81ee920821d&language=" + lang;
        const res = await fetch(url);
        const data = await res.json();
        setMovieDirectors(data.crew.map((element, key) => (element.job == "Director") ? 
        (<Card style={{display: "inline-block", background : "rgb(2, 38, 38)", marginRight : "1em", marginTop : "2em", width : "14em", height : "26em", padding : "0", border: "none"}} key={key}>
            <Card.Img src={"https://image.tmdb.org/t/p/original/" + element.profile_path}></Card.Img>
            <Card.Body>
                <Card.Text style={{marginBottom : "0", fontWeight : "bold", color: "white"}}>{element.name}</Card.Text>
                <Card.Text style={{marginTop : "0", fontSize : "0.75em", color: "white"}}>{element.character}</Card.Text>
            </Card.Body>
        </Card>)
        : null
        ))
        
        const cards = data.cast.map((element, key) => (element.known_for_department == "Acting") ? 
        (<Card style={{display: "inline-block", marginRight : "1em", background : "rgb(2, 38, 38)", marginTop : "2em", width : "14em", height : "26em", padding : "0", border: "none"}} key={key}>
            <Card.Img src={"https://image.tmdb.org/t/p/original/" + element.profile_path}></Card.Img>
            <Card.Body>
                <Card.Text style={{marginBottom : "0", fontWeight : "bold", color: "white"}}>{element.name}</Card.Text>
                <Card.Text style={{marginTop : "0", fontSize : "0.75em", color: "white"}}>{element.character}</Card.Text>
            </Card.Body>
        </Card>)
        : null
        );

        const items = [];
        for(let i = 0; i < cards.length; i+=4) {
            items.push(
                <Carousel.Item style={{padding : "0"}}>
                    <Row style={{padding : "0", margin : "0"}} className="fluid d-flex">
                        {cards[i]}
                        {i+1 < cards.length && cards[i+1]}
                        {i+2 < cards.length && cards[i+2]}
                        {i+3 < cards.length && cards[i+3]}
                    </Row>
                </Carousel.Item>
            )
        }

        setMovieActors(items);
    }

    const FetchRecommendations = async () => {
        const url = "https://api.themoviedb.org/3/movie/" + id + "/recommendations?api_key=8151741cef380652f287f81ee920821d&language=" + lang + "&page=1";
        const res = await fetch(url);
        const data = await res.json();
        const recommendations = data.results.slice(0, 6);
        setMovieRecommends(recommendations.map((element, key) => 
            <Card key={key} style={{display : "inline-block", marginRight : "1em", marginTop : "1em",width : "19.5em", height : "16em", background: "rgb(2, 38, 38)"}}>
                <Card.Body>
                    <Row>
                        <Col style={{padding : "0"}} xs={4}>
                            <Card.Img style={{width : "100%"}} className="d-flex" src={"https://image.tmdb.org/t/p/original/" + element.poster_path} alt="picture"></Card.Img>
                        </Col>
                        <Col cs={8}>
                            <Card.Title><Link to={"/movie/" + element.title + "&id=" + element.id} ScrollReset={true} style={{color: "white", textDecoration: "none"}}>{element.title}</Link></Card.Title>
                            <Card.Text style={{color: "white"}} >{element.release_date.split("-")[0]}</Card.Text>
                            <div style={{width : "8em", height : "7.5em", overflow : "hidden", color: "white"}}> {element.overview}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        ))

    }

    useEffect(() => {
        FetchInfo()
        FetchCredits();
        FetchRecommendations();
        window.scrollTo(0,0);
    }, [lang, location])

    return(
        <Container name="top" fluid style={{background : "rgb(2, 46, 48)"}}>
            <Row className="d-flex justify-content-center m-auto">
                {movieInfo}
            </Row>
            <Row className="d-flex justify-content-center m-auto">
                <Row style={{padding : "0", width : "60vw"}} fluid className="my-3">
                    <span style={{padding : "0", color : "white", fontSize : "2em"}}>Streaming</span>
                    <StreamingCard id={id}/>
                </Row>
            </Row>
            <Row className="d-flex justify-content-center m-auto">
                <Row style={{padding : "0", width : "60vw"}} fluid className="my-3">
                    <span style={{padding : "0", color : "white", fontSize : "2em"}}>Directors</span>
                    {movieDirectors}
                </Row>
                <Row style={{padding : "0", width : "60vw"}} fluid className="my-3">
                    <span style={{padding : "0", color : "white", fontSize : "2em"}}>Actors</span>
                    <Carousel nextIcon={<AiOutlineRight style={{border : "1px solid", color : "black", fontSize : "2em", background : "white"}}/>} prevIcon={<AiOutlineLeft style={{border : "1px solid", color : "black", fontSize : "2em", background : "white"}}/>} indicators={false} interval={null} style={{padding : "0", width : "50vw"}}>
                        {movieActors}
                    </Carousel>
                </Row>
            </Row>
            <Row className="d-flex justify-content-center m-auto">
                <Row style={{padding : "0", width : "60vw"}} fluid className="my-3 d-flex">
                    <span style={{padding : "0", color : "white", fontSize : "2em"}}>Recommendations</span>
                    {movieRecommends}
                </Row>
            </Row>
        </Container>
    );
}

export default MovieInfo;