import { useState, useEffect } from "react";
import "./Navbar.css"; // Import the CSS file for styling

export default function Navbar() {
    const [duckImage, setDuckImage] = useState("../src/assets/blackDuck.png"); // Initial image
    const [navbarBg, setNavbarBg] = useState("#C9C9C9"); // Initial navbar background color
    const [navbarTextColor, setNavbarTextColor] = useState("black"); // Initial navbar text color

    // Combined function to toggle the duck image, navbar background, and page theme
    const toggleDuckAndTheme = () => {
        setDuckImage((prevImage) => {
            if (prevImage === "../src/assets/blackDuck.png") {
                // Change to white duck and update theme
                document.body.classList.add("dark-theme");
                document.body.classList.remove("light-theme");
                document.body.style.backgroundColor = "#626161"; // Change white background to #626161
                document.body.style.color = "white"; // Change text color to white

                // Update all sections with #626161 to black
                const sections = document.querySelectorAll("section, footer");
                sections.forEach((section) => {
                    if (getComputedStyle(section).backgroundColor === "rgb(98, 97, 97)") {
                        section.style.backgroundColor = "#1D1C1C";
                    }
                });

                setNavbarBg("#626161"); // Change navbar background to black
                setNavbarTextColor("white"); // Change navbar text color to white
                return "../src/assets/whiteDuck.png";
            } else {
                // Change to black duck and revert theme
                document.body.classList.add("light-theme");
                document.body.classList.remove("dark-theme");
                document.body.style.backgroundColor = "#C9C9C9"; // Change #626161 background to white
                document.body.style.color = "black"; // Change text color to black

                // Update all sections with black back to #626161
                const sections = document.querySelectorAll("section, footer");
                sections.forEach((section) => {
                    if (getComputedStyle(section).backgroundColor === "rgb(29, 28, 28)") {
                        section.style.backgroundColor = "#626161";
                    }
                });

                setNavbarBg("#C9C9C9"); // Change navbar background to white
                setNavbarTextColor("black"); // Change navbar text color to black
                return "../src/assets/blackDuck.png";
            }
        });
    };

    // Ensure light theme is set on page load
    useEffect(() => {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        document.body.style.backgroundColor = "#C9C9C9";
        document.body.style.color = "black";
        setNavbarBg("#C9C9C9");
        setNavbarTextColor("black");
        setDuckImage("../src/assets/blackDuck.png");
    }, []); // Empty dependency array ensures this runs only once on page load

    return (
        <nav
            className="navbar"
            style={{ backgroundColor: navbarBg }} // Dynamic background color
        >
            <p id="welcome">Portfolio</p>
            <div>
                <ul className="navlist" style={{ color: navbarTextColor }}>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#techstack">TechStack</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault(); // Prevent the page from scrolling to the top
                                toggleDuckAndTheme(); // Call the theme toggle function
                            }}
                        >
                            <img src={duckImage} alt="duck" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
