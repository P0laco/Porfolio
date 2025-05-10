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

                    // Check if the repository contains JSX files
                    if (repo.language === "JavaScript" && repo.name.includes("jsx")) {
                        languageCounts["JSX"] = (languageCounts["JSX"] || 0) + 1;
                    }
                }

                // Sort languages by usage in descending order
                const sortedLanguages = Object.entries(languageCounts).sort(
                    ([, countA], [, countB]) => countB - countA
                );

                // Prepare data for the chart
                const labels = sortedLanguages.map(([language]) => language);
                const data = sortedLanguages.map(([, count]) => count);

                // Define specific colors for each language
                const colorMap = {
                    HTML: "#e34c26", // Orange
                    CSS: "#264de4", // Blue
                    JavaScript: "#f7df1e", // Yellow
                    Java: "orange", // Red
                    TypeScript: "#3178c6", // Light Blue
                    JSX: "#61dafb", // React Blue
                };

                const backgroundColors = labels.map(
                    (label) => colorMap[label] || "#cccccc"
                ); // Default to gray if not in colorMap
                const borderColors = labels.map(
                    (label) => colorMap[label] || "#aaaaaa"
                ); // Default to darker gray

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Lines of Code",
                            data,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };

        fetchLanguages();
    }, []);

    const options = {
        indexAxis: "y", // Makes the chart horizontal
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Tech Stack Usage (Lines of Code)",
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: "80%", height: "300px", margin: "0 auto" ,display: "flex", justifyContent: "center"}}>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={options}
                />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
}
