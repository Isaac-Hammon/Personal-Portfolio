const qaItems = [
	{
		title: "Personal Resume Website",
		URL: "https://github.com/Isaac-Hammon/Personal-Portfolio.git", // Placeholder URL
		decription:
			"This project involved creating a personal resume website using HTML, CSS, and JavaScript to showcase my skills, projects, and experience as a web developer. The website features a responsive design, interactive elements, and a clean layout to provide an engaging user experience.",
	},
	{
		title: "My Game of War Project",
		URL: "https://github.com/Isaac-Hammon/Personal-Portfolio.git", // Placeholder URL
		decription:
			"This project that I made when I first enrolled in my web development course at my technical college was a simple 'Game of War' card game that I created using C# in Visual Studio. The game allowed two players to compete against each other by drawing cards from a deck and comparing their values to determine the winner of each round.",
	},
	{
		title: "My Car Dealership Project",
		URL: "https://github.com/Isaac-Hammon/Personal-Portfolio.git", // Placeholder URL
		decription:
			"This project that I made when I first enrolled in my web development course at my technical college was a simple car dealership management system that I created using C# in Visual Studio. The system allowed users to add, remove, and view cars in the dealership's inventory, as well as search for specific cars based on various criteria such as make, model, and year.",
	},
];

const projectsListDiv = document.getElementById("project");

qaItems.forEach((qaItem) => {
	// Create elements for title, URL, and description
	const titleText = qaItem.title;
	const URLText = qaItem.URL;
	const descriptionText = qaItem.decription;
	const br = document.createElement("br");
	const br2 = document.createElement("br");

	// Create and append title, URL, and description elements to the projects list div
	const titleDiv = document.createElement("div");
	titleDiv.classList.add("project-title");
	titleDiv.textContent = titleText;

	// Create URL as a clickable link
	const URLDiv = document.createElement("a");
	URLDiv.setAttribute("href", URLText);
	URLDiv.target = "_blank";
	URLDiv.classList.add("project-URL");
	URLDiv.textContent = URLText;

	// Create description div
	const descriptionDiv = document.createElement("div");
	descriptionDiv.classList.add("project-description");
	descriptionDiv.textContent = descriptionText;

	// Pulls up the elements in order on the website. (Title, URL, Description, Breaks).
	projectsListDiv.appendChild(titleDiv);

	projectsListDiv.appendChild(URLDiv);

	projectsListDiv.appendChild(descriptionDiv);

	projectsListDiv.appendChild(br);

	projectsListDiv.appendChild(br2);

});
