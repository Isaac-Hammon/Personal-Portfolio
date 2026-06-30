const qaItems = [
	{
		title: "Music Manager Project",
		URL: "https://github.com/Isaac-Hammon/MusicManager.git",
		decription:
			"A full-stack music management web application built with ASP.NET Razor Pages and C#. The app allows users to create, view, update, and delete songs in a personal music library. It features server-side rendering, form validation, and a structured MVC-style architecture to efficiently manage data and provide a smooth user experience.",
	},
	{
		title: "Next.js Portfolio Template Project",
		URL: "https://final-project-five-drab-22.vercel.app/",
		decription:
			"A web application built with Next.js that showcases a portfolio template I designed and developed. The project focuses on clean UI design, responsive layouts, and reusable components to demonstrate modern frontend development practices.",
	},
	{
		title: "Next.js Recipe Database Website",
		URL: "https://recipe-db-t6nk.vercel.app/",
		decription:
			"A Next.js web application that serves as a recipe database, allowing users to browse and view a collection of recipes through a clean, responsive interface. The project focuses on dynamic routing, reusable components, and efficient data organization.",
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
	URLDiv.textContent = "View Project";

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
// Phone formatter (kept minimal + safer)
// =========================
function formatPhoneNumber(value) {
	if (!value) return null;

	const digits = value.replace(/\D/g, "");

	if (digits.length !== 10) return value;

	return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// =========================
// Models
// =========================
class DatabaseObject {
	toString() {
		throw new Error("Not implemented");
	}
}

class Reference extends DatabaseObject {
	constructor({ id, name, title, phone, email, company, address, location }) {
		super();
		this.id = id;
		this.name = name || null;
		this.title = title || null;
		this.phone = phone || null;
		this.email = email || null;
		this.company = company || null;
		this.address = address || null;
		this.location = location || null;
	}
}

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
// DAO
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
// Service
// =========================
class CreateTestimonial {
	constructor(referenceDao, testimonialDao) {
		this.referenceDao = referenceDao;
		this.testimonialDao = testimonialDao;
	}

	createReferencewithOptionalTestimonial(referenceData, testimonialData = null) {
		const reference = new Reference({
			...referenceData,
			phone: formatPhoneNumber(referenceData.phone),
		});

		this.referenceDao.create(reference);

		if (testimonialData?.comment && testimonialData?.rating) {
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
// FORM HANDLER
// =========================
const form = document.getElementById("create-reference-form");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(form);

	const referenceData = {
		id: Date.now(),
		name: formData.get("name") || null,
		title: formData.get("title") || null,
		phone: formData.get("phone") || null,
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
// RENDER
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
