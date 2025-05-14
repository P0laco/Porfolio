import { useState, useEffect } from "react";
import "./App.css";
import Projects from "./components/Projects.jsx";
import Welcome from "./components/Welcome.jsx";
import Navbar from "./components/Navbar.jsx";
import TechStackChart from "./components/TechStackChart.jsx";
import Contact from "./components/Contact.jsx";
import AboutMe from "./components/AboutMe.jsx";

function App() {
	return (
		<>
			<Navbar />
			<div>
				<Welcome />
				<AboutMe />
				<Projects />
				<TechStackChart />
				<Contact />
				<footer>
					<div className="footer-content">
						<p>Copyright© 2025 Miguel Pereira. All rights reserved.</p>
					</div>
				</footer>
			</div>
		</>
	);
}

export default App;
