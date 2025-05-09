import { useState, useEffect } from "react";
import "./Projects.css"; // Import the CSS file for styling

export default function Projects() {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/users/P0laco/repos"
				);
				const data = await response.json();

				// Filter out private repositories
				const publicRepos = data.filter((repo) => !repo.private);
				setRepos(publicRepos);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching repositories:", error);
				setLoading(false);
				console.log(data);
			}
		};

		fetchRepos();
	}, []);

	return (
		<section className="projects-section">
			<h2>Projects</h2>
			{loading ? (
				<p>Loading projects...</p>
			) : repos.length > 0 ? (
				<div className="projects-grid">
					{repos.map((repo) => (
						<div
							className="project-card"
							key={repo.id}
						>
							<h3>{repo.name}</h3>
							<p>{repo.description || "No description available."}</p>
							<a
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								View Repository
							</a>
						</div>
					))}
				</div>
			) : (
				<p>No repositories found.</p>
			)}
		</section>
	);
}
