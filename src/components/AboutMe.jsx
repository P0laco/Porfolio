import React from "react";
import "./AboutMe.css"; // Import the CSS file for styling

export default function AboutMe() {
	return (
		<section
			id="aboutme"
			className="about-section"
		>
			<h2 className="about-title">
				About<span>Me</span>
			</h2>
			<div className="about-content">
				<div className="about-text">
					<p>
						A passionate Full Stack Developer with a love for creating dynamic
						and responsive web applications. I specialize in modern web
						technologies and enjoy solving complex problems with clean and
						efficient code.
					</p>
					<p>
						With a strong foundation in both front-end and back-end development,
						I strive to deliver seamless user experiences and scalable
						solutions. When I'm not coding, you can find me exploring new
						technologies, reading, or enjoying outdoor activities.
					</p>
				</div>
				<div className="about-image">
					<img
						src="../src/assets/profile.jpg" // Replace with your actual image path
						alt="Miguel Pereira"
					/>
				</div>
			</div>
		</section>
	);
}
