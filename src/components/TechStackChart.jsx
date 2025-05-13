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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
              borderColor: labels.map(() =>
                isDarkTheme ? "#cccccc" : "#333"
              ), // Light gray for dark theme, dark gray for light theme
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

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

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
					<h2 id="techstack-title">Tech<span>Stack</span></h2>
    <div
      style={{
        width: "80%",
        height: "300px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
    </section>
  );
}
