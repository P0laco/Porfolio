import { useState, useEffect } from "react";
import "./App.css";
import Projects from "./components/Projects.jsx";
import Welcome from "./components/Welcome.jsx";
import Navbar from "./components/Navbar.jsx";
import TechStackChart from "./components/TechStackChart.jsx";

function App() {
	return (
		<>
			<Navbar />
			<div>
				<Welcome />
				<Projects />
				<section id="techstack">
					<h2>Tech Stack</h2>
					<TechStackChart />
				</section>
				<footer>
					<p>Contact me at:</p>
					<ul>
						<li>Email: me@me.com</li>
						<li>Phone: 123-456-7890</li>
						<li>
							LinkedIn: <a href="#">Your LinkedIn</a>
						</li>
						<li>
							GitHub: <a href="#">Your GitHub</a>
						</li>
					</ul>
				</footer>
			</div>
		</>
	);
}

export default App;
