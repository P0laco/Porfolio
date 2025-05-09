import { useEffect, useState } from "react";

export default function Welcome() {
	const positions = ["Full Stack Developer", "Front End Developer"];
	const [currentPosition, setCurrentPosition] = useState(positions[0]);
	const [fadeClass, setFadeClass] = useState("fade show");

	useEffect(() => {
		const interval = setInterval(() => {
			setFadeClass("fade");
			setTimeout(() => {
				setCurrentPosition((prev) => {
					const currentIndex = positions.indexOf(prev);
					const nextIndex = (currentIndex + 1) % positions.length;
					return positions[nextIndex];
				});
				setFadeClass("fade show");
			}, 500); // Wait for fade out before changing text
		}, 2000); // Change every 5 seconds

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, [positions]);

	return (
		<header>
			<h1>Miguel Pereira</h1>
			<p id="welcome">Welcome to my portfolio</p>
			<p id="position">
				<span className={fadeClass}>{currentPosition}</span>
			</p>
		</header>
	);
}
