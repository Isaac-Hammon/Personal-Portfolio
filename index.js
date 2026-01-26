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

//Base Classes
class DatabaseObject {
	toString() {
		throw new Error("Not implemented");
	}
}

//Reference Class
class Reference extends DatabaseObject {

	constructor({ id, name, email, company }) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.company = company;
	}

	toString() {
		return `${this.id} ${this.name} ${this.email} ${this.company}`;
	}

}


//Testimonial Class
class Testimonial extends DatabaseObject {

	constructor({ id, comment, rating, referenceId }) {
		super();
		this.id = id;
		this.comment = comment;
		this.rating = rating;
		this.referenceId = referenceId;
	}
	toString() {
		return `${this.comment} ${this.rating}`;
	}
	// static create({ id, comment, rating, referenceId }) {
	// 	return new Testimonial({ id, comment, rating, referenceId });
	// }

}

//Reference Dao Class
class ReferenceDao {
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
		},
	];

	getAll() {
		throw new Error("Not Implemented");
	}
	create(reference) {
		throw new Error("Not Implemented");
	}
	update(reference) {
		throw new Error("Not Implemented");
	}

}

class TestimonialDao {
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
			comment: "Isaac Hammon is a brave and skilled warrior. He has fought alongside me in many battles and has always shown great courage and determination on the field. I would traverse through Mordor itself with him by my side. Although, his height makes me feel self-conscious so I am ubale to give him a fifth star.",
			rating: 4.0, 
			referenceId: 3
		},
	];
		getAll() {
		throw new Error("Not Implemented");
	}
	create(reference) {
		throw new Error("Not Implemented");
	}
	update(reference) {
		throw new Error("Not Implemented");
	}


}

//Session Storage Reference Dao Class
class SessionStorageReferenceDao extends ReferenceDao {
	constructor() {
		super();
		this.database = sessionStorage;
	}
getAll() {
		const referencesAsJSON = this.database.getItem("references");
		const referencesData = referencesAsJSON ? JSON.parse(referencesAsJSON) : ReferenceDao.seeds;
		return referencesData.map((r) => new Reference(r));
	}
create(reference) {
	const refs = this.getAll();
	refs.push(reference);
	this.database.setItem("references", JSON.stringify(refs));
}
}

//Cookie Storage Reference Dao Class
class CookieStorageReferenceDao extends ReferenceDao {
	constructor(){
		super();
		this.database = document.cookie;
	}
	getAll() {
	const cookieValue = document.cookie
	.split("; ")
	.find((row) => row.startsWith("references="))
	?.split("=")[1];

	const referencesData = cookieValue ? JSON.parse(cookieValue) : ReferenceDao.seeds;

	return referencesData.map((referenceData) => new Reference(referenceData));

		
	}

	create(reference) {
  const existingReferences = this.getAll();
  existingReferences.push(reference);
  document.cookie = `references=${encodeURIComponent(JSON.stringify(existingReferences))}; max-age=30`;

}


update(reference) {
const existingReferences = this.getAll();
const indexToDelete = existingReferences.findIndex(
	(referenceInList) => referenceInList.name == reference.name,); 
existingReferences.splice(indexToDelete, 1, reference);
document.cookie = `references=${JSON.stringify(existingReferences)}; max-age=30`;
}
}


//Session Storage Testimonial Dao Class
class SessionStorageTestimonialDao extends TestimonialDao {
		constructor() {
		super();
		this.database = sessionStorage;
	}
getAll() {
		const testimonialsAsJSON = this.database.getItem("testimonials");
		const  testimonialsData =  testimonialsAsJSON ? JSON.parse( testimonialsAsJSON) : TestimonialDao.seeds;
		return  testimonialsData.map((t) => new Testimonial(t));
	}
create(testimonial) {
	const tests = this.getAll();
	tests.push(testimonial);
	this.database.setItem("testimonials", JSON.stringify(tests));
}
}

//Cookie Storage Testimonial Dao Class
class CookieStorageTestimonialDao extends TestimonialDao {
	getAll() {
	const cookieValue = document.cookie
	.split("; ")
	.find((row) => row.startsWith("testimonials="))
	?.split("=")[1];

	const testimonialsData = cookieValue ? JSON.parse(cookieValue) : TestimonialDao.seeds;
	return testimonialsData.map(
		(testimonialData) => new Testimonial(testimonialData));

	}

	create(testimonial) {
	const existingTestimonials = this.getAll();
    existingTestimonials.push(testimonial);
    document.cookie = `testimonials=${JSON.stringify(existingTestimonials)}; max-age=30`;
}
}

class CreateTestimonial {
	constructor(referenceDao, testimonialDao) {
		this.referenceDao = referenceDao;
		this.testimonialDao = testimonialDao;
	}

	createReferencewithOptionalTestimonial(referenceData, testimonialData = null) {
		const reference = new Reference(referenceData);
		this.referenceDao.create(reference);
	if (testimonialData) {
		const testimonial = new Testimonial({...testimonialData, referenceId: reference.id});
		this.testimonialDao.create(testimonial);
	}
		
	}
}



//Cookies
const referenceDao = new CookieStorageReferenceDao();
const testimonialDao = new CookieStorageTestimonialDao();

const CreateTestimonialService = new CreateTestimonial(referenceDao, testimonialDao);

const testimonials = testimonialDao.getAll();

const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

// const testimonials = testimonialDao.getAll();
const avgEl = document.getElementById("average-rating");

if (testimonials.length === 0) {
  avgEl.textContent = "Average Rating:";
} else {
  const average = testimonials.reduce((sum, t) => sum + Number(t.rating || 0), 0) / testimonials.length;
  avgEl.textContent = `Average Rating: ${average.toFixed(1)}`;
}



//Form Submission
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
	const rating = formData.get("rating")

	let testimonialData = null;

	if (comment && rating) {
		testimonialData = {
			id: Date.now(), 
			comment,
			rating: Number(rating),
		};
	}

	CreateTestimonialService.createReferencewithOptionalTestimonial(referenceData, testimonialData,);
	form.reset();
});

const referenceList = document.getElementById("reference-list");
const references = referenceDao.getAll();

for(let i = 0; i < references.length; i++) {
	const reference = references[i];

	const referenceLi = document.createElement("li");
	referenceLi.textContent = reference.toString();

	 const relatedTestimonials = testimonials.filter(
    (t) => t.referenceId === reference.id);

	  if (relatedTestimonials.length > 0) {
    const testimonial = relatedTestimonials[0]; 
    const testimonialP = document.createElement("p");
    testimonialP.textContent = testimonial.toString();
    referenceLi.appendChild(testimonialP);
  }

  referenceList.appendChild(referenceLi);
}


