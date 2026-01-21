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

	// Pulls up the elements in order on the website. (Title, Description, URL, Breaks).
	projectsListDiv.appendChild(titleDiv);

	projectsListDiv.appendChild(descriptionDiv);

	projectsListDiv.appendChild(URLDiv);
 
	titleDiv.addEventListener("click", () => {
		titleDiv.classList.toggle("active");
		URLDiv.classList.toggle("active");
		descriptionDiv.classList.toggle("active");
	}); 

	projectsListDiv.appendChild(br);

	projectsListDiv.appendChild(br2);

});


class DatabaseObject {
	toString() {
		throw new Error("Not implemented");
	}
}


//Reference Data Access Object (DAO)
class ReferenceDAO extends DatabaseObject {

	constructor({ id, name, email, company }) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.company = company;
	}

	static seeds = [
		{
			id: 1,
			name: "Capt. John Price",
			email: "N/A",
			company: "British Special Air Service (SAS)"
		},
		{
			id: 2, 
			name: "Eddard 'Ned' Stark", 
			email: "N/A",
			company: "House Stark (Lord of Winterfell and Warden of the North)"
		},
		{
			id: 3, 
			name: "Thorin Oakenshield",
			email: "N/A", 
			company: "The King Under the Mountain"
		}
	]
}

//Testimonial Data Access Object (DAO)
class TestimonialDAO extends DatabaseObject {

	constructor({ id, comment, rating, referenceId }) {
		super();
		this.id = id;
		this.comment = comment;
		this.rating = rating;
		this.referenceId = referenceId;
	}

	static seeds = [
		{
			id: 1, 
			comment: "Isaac Hammon is an exceptional team player and a natural leader. His ability to strategize and execute complex missions under pressure is unparalleled. I'd give him five stars, but I'm the best there is.",
			rating: 4.9,
			referenceId: 1
		}, 
		{
			id: 2, 
			comment: "Ser Isaac Hammon has proven himself time and again to be a loyal and honorable knight to House Stark. Through his many years of service to myself, my family and the people of the North, I have granted him with the title of Ser. I would trust him with my life and the lives of my family.",
			rating: 5.0,
			referenceId: 2
		},
		{
			id: 3, 
			comment: "Isaac Hammon is a brave and skilled warrior. He has fought alongside me in many battles and has always shown great courage and determination on the field. I would traverse through Mordor itself with him by my side.",
			rating: 5.0, 
			referenceId: 3
		}
	]
}

//Local Storage Reference DAO Implementation
class LocalStorageReferenceDAO extends ReferenceDAO {
	constructor() {
		super();
		this.database = localStorage;
	}

	getAll() {
		const json = this.database.getItem("references");
		const data = json ? JSON.parse(json) : ReferenceDAO.seeds;
		return data.map((r) => new ReferenceDAO(r));
	}

	create(reference) {
		const references = this.getAll();
		references.push(reference);
		this.database.setItem("references", JSON.stringify(references));
	}
}

//Local Storage Testimonial DAO Implementation
class LocalStorageTestimonialDAO extends TestimonialDAO {
	constructor() {
		super();
		this.database = localStorage;
	}
	getAll() {
		const json = this.database.getItem("testimonials");
		const data = json ? JSON.parse(json) : TestimonialDAO.seeds;
		return data.map((t) => new TestimonialDAO(t));
	}

	getByReferenceId(referenceId) {
		return this.getAll().filter(t => t.referenceId === referenceId);
	}

	create(testimonial) {
		const testimonials = this.getAll();
		testimonials.push(testimonial);
		this.database.setItem("testimonials", JSON.stringify(testimonials));
	}
}

//Cookie Storage Reference DAO Implementation
class CookieReferenceDAO extends ReferenceDAO {
	getAll() {
		const cookie = document.cookie
			.split("; ")
			.find((c) => c.startsWith("references="))
			?.split("=")[1];

		const data = cookie ? JSON.parse(cookie) : ReferenceDAO.seeds;
		return data.map((r) => new ReferenceDAO(r));
	}

	create(reference) {
		const references = this.getAll();
		references.push(reference);
		document.cookie = `references=${JSON.stringify(references)}; max-age=30;`
	}
}

class CookieTestimonialDAO extends TestimonialDAO {
	getAll() {
		const cookie = document.cookie
			.split("; ")
			.find((c) => c.startsWith("testimonials="))
			?.split("=")[1];

		const data = cookie ? JSON.parse(cookie) : TestimonialDAO.seeds;
		return data.map((t) => new TestimonialDAO(t));
	}

	create(testimonial) {
		const testimonials = this.getAll();
		testimonials.push(testimonial);
		document.cookie = `testimonials=${JSON.stringify(testimonials)}; max-age=30;`
	}
}

class TestimonialService {
	constructor(referenceDAO, testimonialDAO) {
		this.referenceDAO = referenceDAO;
		this.testimonialDAO = testimonialDAO;
	}

	createReferenceWithOptionalTestimonial(referenceData, testimonialData = null) {
		const reference = new ReferenceDAO(referenceData);
		this.referenceDAO.create(reference);
		if (testimonialData) {
			const testimonial = new TestimonialDAO(testimonialData);
			this.testimonialDAO.create(testimonial);
		}
	
}
}

const referenceList = document.getElementById("reference-list");
const references = referenceDAO.getAll();
for (let i = 0; i < references.length; i++) {
	const reference = references[i];
	const referenceLi = document.createElement("li");
	referenceLi.textContent = reference.toString();
	referenceList.appendChild(referenceLi);
}


const referenceDAO = new LocalStorageReferenceDAO();
const testimonialDAO = new LocalStorageTestimonialDAO();
const testimonialService = new TestimonialService(referenceDAO, testimonialDAO);

// Function to calculate and update average rating

const testimonials = testimonialDAO.getAll();


const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

document.querySelector("h3").textContent = `Average Rating: ${average.toFixed(1)}`;



const form = document.getElementById("create-reference-form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const referenceData = {
		id: Date.now(),
		name: formData.get("name"),
		email: formData.get("email"),
		company: formData.get("company") || null,
	};
	const comment = formData.get("comment");
	const rating = formData.get("rating");
	let testimonialData = null;
	if (comment && rating) {
		testimonialData = {
			id: Date.now(),
			comment: comment,
			rating: Number(rating),
			
		};
	}
	testimonialService.createReferenceWithOptionalTestimonial(referenceData, testimonialData);
	updateAverageRating();
	form.reset();
});
