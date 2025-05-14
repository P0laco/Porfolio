import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function TechStackChart() {
	const [chartData, setChartData] = useState(null);
	const [isDarkTheme, setIsDarkTheme] = useState(
		document.body.classList.contains("dark-theme")
	); // Check initial theme

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const reposResponse = await fetch(
					"https://api.github.com/users/P0laco/repos"
				);
				const repos = await reposResponse.json();

				const languageCounts = {};

				// Fetch languages for each repository
				for (const repo of repos) {
					const languagesResponse = await fetch(repo.languages_url);
					const languages = await languagesResponse.json();

					// Aggregate language usage
					for (const [language, count] of Object.entries(languages)) {
						languageCounts[language] = (languageCounts[language] || 0) + count;
					}
				}

				// Sort languages by usage in descending order
				const sortedLanguages = Object.entries(languageCounts).sort(
					([, countA], [, countB]) => countB - countA
				);

				// Prepare data for the chart
				const labels = sortedLanguages.map(([language]) => language);
				const data = sortedLanguages.map(([, count]) => count);

				// Dynamically set chart data based on the theme
				setChartData({
					labels,
					datasets: [
						{
							label: "Lines of Code",
							data,
							backgroundColor: labels.map(() =>
								isDarkTheme ? "#02ABFF" : "#8200CE"
							), // Blue for dark theme, purple for light theme
							borderColor: labels.map(() => (isDarkTheme ? "#cccccc" : "#333")), // Light gray for dark theme, dark gray for light theme
							borderWidth: 1,
						},
					],
				});
			} catch (error) {
				console.error("Error fetching languages:", error);
			}
		};

		fetchLanguages();

		// Listen for theme changes
		const observer = new MutationObserver(() => {
			const isDark = document.body.classList.contains("dark-theme");
			setIsDarkTheme(isDark);

			// Update chart colors dynamically when the theme changes
			setChartData((prevData) => {
				if (!prevData) return prevData; // Ensure chartData exists
				return {
					...prevData,
					datasets: prevData.datasets.map((dataset) => ({
						...dataset,
						backgroundColor: prevData.labels.map(() =>
							isDark ? "#02ABFF" : "#8200CE"
						),
						borderColor: prevData.labels.map(() =>
							isDark ? "#cccccc" : "#333"
						),
					})),
				};
			});
		});

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const options = {
		indexAxis: "y", // Makes the chart horizontal
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: isDarkTheme ? "white" : "black", // Dynamic text color for legend
				},
			},
			title: {
				display: true,
				text: "Tech Stack Usage (Lines of Code)",
				color: isDarkTheme ? "white" : "black", // Dynamic title color
			},
		},
		scales: {
			x: {
				ticks: {
					color: isDarkTheme ? "white" : "black", // Dynamic x-axis text color
				},
			},
			y: {
				ticks: {
					color: isDarkTheme ? "white" : "black", // Dynamic y-axis text color
				},
			},
		},
	};

	return (
		<section id="techstack">
			<h2 id="techstack-title">
				Tech<span>Stack</span>
			</h2>
			<div
				className="chart-container"
			>
				{chartData ? (
					<Bar
						data={chartData}
						options={options}
					/>
				) : (
					<p>Loading chart...</p>
				)}
			</div>
			<div>
				<h2 id="othertools-title">
					Other<span>Tools</span>
				</h2>
				<ul id="othertools">
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							fill="currentColor"
							class="bi bi-git"
							viewBox="0 0 16 16"
						>
							<path d="M15.698 7.287 8.712.302a1.03 1.03 0 0 0-1.457 0l-1.45 1.45 1.84 1.84a1.223 1.223 0 0 1 1.55 1.56l1.773 1.774a1.224 1.224 0 0 1 1.267 2.025 1.226 1.226 0 0 1-2.002-1.334L8.58 5.963v4.353a1.226 1.226 0 1 1-1.008-.036V5.887a1.226 1.226 0 0 1-.666-1.608L5.093 2.465l-4.79 4.79a1.03 1.03 0 0 0 0 1.457l6.986 6.986a1.03 1.03 0 0 0 1.457 0l6.953-6.953a1.03 1.03 0 0 0 0-1.457" />
						</svg>
					</li>
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							fill="currentColor"
							class="bi bi-bootstrap-fill"
							viewBox="0 0 16 16"
						>
							<path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375z" />
							<path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4zm1.06 12V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396z" />
						</svg>
					</li>
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							fill="currentColor"
							class="bi bi-windows"
							viewBox="0 0 16 16"
						>
							<path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z" />
						</svg>
					</li>
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							fill="currentColor"
							class="bi bi-apple"
							viewBox="0 0 16 16"
						>
							<path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
							<path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
						</svg>
					</li>
				</ul>
			</div>
		</section>
	);
}
