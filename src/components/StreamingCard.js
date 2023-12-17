import { Image, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const StreamingCard = ({id}) => {
    const [mapped, setMapped] = useState(null);
    const map = {
        "tr" : "TR",
        "en" : "US"
    };
    const lang = map[localStorage.getItem("language")];
    const FetchData = async () => {
        const url = "https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=8151741cef380652f287f81ee920821d";
        const list = [];
        const res = await fetch(url);
        const resJSON = await res.json();
        const providers = resJSON.results[lang].flatrate;
        providers.forEach(element => {
            list.push(element);
        });
        setMapped(list.map((provider, key) => 
            <Image key={key} style={{height: "6em", marginTop: "2em", marginRight : "0.5em", border: "none"}} rounded src={"https://image.tmdb.org/t/p/original/" + provider.logo_path}></Image>));  
    }

    useEffect(() => {
        FetchData();
    }, [id, lang]);

    if (mapped){
        return(
            <Container fluid style={{width : "%70", padding : "0"}} className="my-3">
                {mapped}
            </Container>
        );
    }
}

export default StreamingCard