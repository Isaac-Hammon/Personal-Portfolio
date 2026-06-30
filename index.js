const qaItems = [
	{
		title: "Personal Resume Website",
		URL: "https://github.com/Isaac-Hammon/Personal-Portfolio.git",
		decription:
			"This project involved creating a personal resume website using HTML, CSS, and JavaScript to showcase my skills.",
	},
	{
		title: "My Game of War Project",
		URL: "https://github.com/Isaac-Hammon/Personal-Portfolio.git",
		decription:
			"Simple Game of War built in C# allowing two players to draw cards and compare values.",
	},
	{
		title: "My Car Dealership Project",
		URL: "https://github.com/Isaac-Hammon/Personal-Portfolio.git",
		decription:
			"Car dealership system built in C# allowing inventory management and search functionality.",
	},
];

const projectsListDiv = document.getElementById("project");

qaItems.forEach((qaItem) => {
	const titleDiv = document.createElement("div");
	titleDiv.classList.add("project-title");
	titleDiv.textContent = qaItem.title;

	const URLDiv = document.createElement("a");
	URLDiv.href = qaItem.URL;
	URLDiv.target = "_blank";
	URLDiv.classList.add("project-URL");
	URLDiv.textContent = qaItem.URL;

	const descriptionDiv = document.createElement("div");
	descriptionDiv.classList.add("project-description");
	descriptionDiv.textContent = qaItem.decription;

	projectsListDiv.appendChild(titleDiv);
	projectsListDiv.appendChild(descriptionDiv);
	projectsListDiv.appendChild(URLDiv);

	titleDiv.addEventListener("click", () => {
		titleDiv.classList.toggle("active");
		URLDiv.classList.toggle("active");
		descriptionDiv.classList.toggle("active");
	});

	projectsListDiv.appendChild(document.createElement("br"));
	projectsListDiv.appendChild(document.createElement("br"));
});

// =========================
// Phone Formatter (NEW)
// =========================

function formatPhoneNumber(value) {
	if (!value) return null;

	const digits = value.replace(/\D/g, "");

	if (digits.length !== 10) return value; // leave invalid as-is

	return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// =========================
// Base Class
// =========================

class DatabaseObject {
	toString() {
		throw new Error("Not implemented");
	}
}

// =========================
// Reference Model
// =========================

class Reference extends DatabaseObject {
	constructor({ id, name, title, phone, email, company, address, location }) {
		super();
		this.id = id;
		this.name = name;
		this.title = title;
		this.phone = phone;
		this.email = email;
		this.company = company;
		this.address = address;
		this.location = location;
	}
}

// =========================
// Testimonial Model
// =========================

class Testimonial extends DatabaseObject {
	constructor({ id, comment, rating, referenceId }) {
		super();
		this.id = id;
		this.comment = comment;
		this.rating = rating;
		this.referenceId = referenceId;
	}
}

// =========================
// DAO Base
// =========================

class ReferenceDao {
	static seeds = [
		{
			id: 1,
			name: "Sam Jarvis",
			title: "Shift Lead",
			phone: "435-890-2122",
			company: "Zigg Design LLC",
			address: "1665 W 2960 S",
			location: "Nibley, UT 84321",
		},
		{
			id: 2,
			name: "Mathew Mansfield",
			title: "Coworker",
			phone: "435-881-5355",
			company: "Zigg Design LLC",
			address: "1665 W 2960 S",
			location: "Nibley, UT 84321",
		},
		{
			id: 3,
			name: "Jesse Shaffer",
			title: "Instructor",
			phone: "435-735-6780",
			company: "Bridgerland Technical College",
			address: "1301 N 600 W",
			location: "Logan, UT 84321",
		},
	];

	getAll() {
		throw new Error("Not Implemented");
	}
	create(reference) {
		throw new Error("Not Implemented");
	}
}

// =========================
// Session Storage DAO
// =========================

class SessionStorageReferenceDao extends ReferenceDao {
	constructor() {
		super();
		this.database = sessionStorage;
	}

	getAll() {
		const data = this.database.getItem("references");
		const parsed = data ? JSON.parse(data) : ReferenceDao.seeds;
		return parsed.map((r) => new Reference(r));
	}

	create(reference) {
		const list = this.getAll();
		list.push(reference);
		this.database.setItem("references", JSON.stringify(list));
	}
}

// =========================
// Testimonials DAO
// =========================

class SessionStorageTestimonialDao {
	constructor() {
		this.database = sessionStorage;
	}

	getAll() {
		const data = this.database.getItem("testimonials");
		return (data ? JSON.parse(data) : []).map((t) => new Testimonial(t));
	}

	create(testimonial) {
		const list = this.getAll();
		list.push(testimonial);
		this.database.setItem("testimonials", JSON.stringify(list));
	}
}

// =========================
// Service Layer
// =========================

class CreateTestimonial {
	constructor(referenceDao, testimonialDao) {
		this.referenceDao = referenceDao;
		this.testimonialDao = testimonialDao;
	}

	createReferencewithOptionalTestimonial(referenceData, testimonialData = null) {
		const reference = new Reference(referenceData);
		this.referenceDao.create(reference);

		if (testimonialData) {
			const testimonial = new Testimonial({
				...testimonialData,
				referenceId: reference.id,
			});
			this.testimonialDao.create(testimonial);
		}
	}
}

// =========================
// INIT
// =========================

const referenceDao = new SessionStorageReferenceDao();
const testimonialDao = new SessionStorageTestimonialDao();

const service = new CreateTestimonial(referenceDao, testimonialDao);

const testimonials = testimonialDao.getAll();

const avgEl = document.getElementById("average-rating");

if (testimonials.length === 0) {
	avgEl.textContent = "Average Rating:";
} else {
	const avg =
		testimonials.reduce((sum, t) => sum + Number(t.rating || 0), 0) / testimonials.length;

	avgEl.textContent = `Average Rating: ${avg.toFixed(1)}`;
}

// =========================
// FORM HANDLER (UPDATED PHONE FORMATTING)
// =========================

const form = document.getElementById("create-reference-form");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(form);

	const referenceData = {
		id: Date.now(),
		name: formData.get("name") || null,
		title: formData.get("title") || null,
		phone: formatPhoneNumber(formData.get("phone")), // ✅ HERE
		email: formData.get("email") || null,
		company: formData.get("company") || null,
		address: formData.get("address") || null,
		location: formData.get("location") || null,
	};

	const comment = formData.get("comment");
	const rating = Number(formData.get("rating"));

	let testimonialData = null;

	if (comment?.trim() && rating) {
		testimonialData = {
			id: Date.now(),
			comment,
			rating,
		};
	}

	service.createReferencewithOptionalTestimonial(referenceData, testimonialData);

	form.reset();
});

// =========================
// RENDER REFERENCES
// =========================

const referenceList = document.getElementById("reference-list");
const references = referenceDao.getAll();

references.forEach((reference) => {
	const li = document.createElement("li");
	const ul = document.createElement("ul");

	const fields = [];

	if (reference.name) fields.push(`Name: ${reference.name}`);
	if (reference.title) fields.push(`Title: ${reference.title}`);
	if (reference.phone) fields.push(`Phone: ${reference.phone}`);
	if (reference.email) fields.push(`Email: ${reference.email}`);
	if (reference.company) fields.push(`Company: ${reference.company}`);
	if (reference.address) fields.push(`Address: ${reference.address}`);
	if (reference.location) fields.push(`Location: ${reference.location}`);

	fields.forEach((text) => {
		const item = document.createElement("li");
		item.textContent = text;
		ul.appendChild(item);
	});

	const related = testimonials.find((t) => t.referenceId === reference.id);

	if (related) {
		const t = document.createElement("li");
		t.textContent = `Testimonial: ${related.comment} (${related.rating})`;
		ul.appendChild(t);
	}

	li.appendChild(ul);
	referenceList.appendChild(li);
});
