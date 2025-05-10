import { useState, useEffect, useRef } from "react";
import "./Navbar.css"; // Import the CSS file for styling

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [showPopup, setShowPopup] = useState(false); // State for the popup
	const [duckImage, setDuckImage] = useState("../src/assets/blackDuck.png"); // Initial image
	const [navbarBg, setNavbarBg] = useState("white"); // Initial navbar background color
	const menuRef = useRef(null); // Reference to the menu

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsOpen(false); // Close the menu if clicked outside
		}
	};

	const openPopup = () => {
		setShowPopup(true); // Open the popup
	};

	const closePopup = () => {
		setShowPopup(false); // Close the popup
	};

	const toggleDuckImage = () => {
		setDuckImage((prevImage) => {
			if (prevImage === "../src/assets/blackDuck.png") {
				setNavbarBg("black"); // Change navbar background to black
				return "../src/assets/whiteDuck.png";
			} else {
				setNavbarBg("white"); // Change navbar background to white
				return "../src/assets/blackDuck.png";
			}
		});
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<>
			<nav
				className="navbar"
				ref={menuRef}
				style={{ backgroundColor: navbarBg }} // Dynamic background color
			>
				<div
					className={`hamburger ${isOpen ? "open" : ""}`}
					onClick={toggleMenu}
				>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
				</div>
				<div>
					<ul className="navlist">
						<li><a href="#">About</a></li>
						<li><a href="#">Projects</a></li>
						<li><a href="#">TechStack</a></li>
						<li><a href="#">Contact</a></li>
						<li>
							<a
								href="#"
								onClick={toggleDuckImage}
							>
								<img
									src={duckImage}
									alt="duck"
								/>
							</a>
						</li>
					</ul>
				</div>
				<ul className={`menu ${isOpen ? "open" : ""}`}>
					<li>
						<img
							src="../src/assets/eu.jpg"
							alt="me"
							className="myimage"
						/>
					</li>
					<li>
						<a
							href="#about"
							onClick={openPopup}
						>
							About
						</a>
					</li>
					<li>
						<a href="#projects">Projects</a>
					</li>
					<li>
						<a href="#contact">Contact</a>
					</li>
				</ul>
			</nav>

			{showPopup && (
				<div
					className="popup-overlay"
					onClick={closePopup}
				>
					<div
						className="popup-content"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="close-button"
							onClick={closePopup}
						>
							X
						</button>
						<h2>About Me</h2>
						<img
							src="../src/assets/myimage.png"
							alt="About Me"
							className="popup-image"
						/>
						<p>
							Hi, I'm Miguel! I'm a passionate full-stack developer with a
							preference for front-end development. I love creating beautiful
							and functional websites that provide great user experiences.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
