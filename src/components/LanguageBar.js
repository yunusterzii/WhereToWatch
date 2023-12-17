import { DropdownButton, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

const LanguageBar = () => {
    const [lang, setLang] = useState(localStorage.getItem("language"));

    const change = (lang) => {
        setLang(lang);
        localStorage.setItem("language", lang);
        window.location.reload(true);
    }

    useEffect(() => {
        
    }, [lang]);

    return(
        <DropdownButton variant="secondary" className="d-flex justify-content-center m-auto" style={{color: "white", width: "4em"}}
            title={lang}
            id="1">
                <Dropdown.Item onClick={() => change("tr")} eventKey="1">TR</Dropdown.Item>
                <Dropdown.Item onClick={() => change("en")} eventKey="2">EN</Dropdown.Item>
        </DropdownButton>
    );
}

export default LanguageBar;