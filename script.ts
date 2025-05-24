

interface Student {
  name: string;
  age: number;
  subjects: string[];
  degrees: string[];
}

const students: Student[] = [];

function createInput(id: string, placeholder: string): HTMLInputElement {
  const input = document.createElement("input");
  input.id = id;
  input.placeholder = placeholder;
  input.className = "input";
  return input;
}

const container = document.createElement("div");
container.className = "container";

const topSection = document.createElement("div");
topSection.className = "top-section";

const searchSection = document.createElement("div");
searchSection.className = "search-section";

const searchTitle = document.createElement("h2");
searchTitle.textContent = "Search Student";

const searchInput = createInput("search", "Enter student name");
const searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchButton.className = "button";

searchSection.appendChild(searchTitle);
searchSection.appendChild(searchInput);
searchSection.appendChild(searchButton);

const addSection = document.createElement("div");
addSection.className = "add-section";

const addTitle = document.createElement("h2");
addTitle.textContent = "Add Student";

const nameInput = createInput("name", "Name");
const ageInput = createInput("age", "Age");
ageInput.type = "text";
const subjectsInput = createInput("subjects", "Subjects (comma separated)");
const degreesInput = createInput("degrees", "Degrees (space separated numbers)");
const addButton = document.createElement("button");
addButton.id = "addButton";
addButton.textContent = "Add Student!";
addButton.className = "button";


ageInput.addEventListener("input", () => {
  ageInput.value = ageInput.value.replace(/[^0-9]/g, "");
});


degreesInput.addEventListener("input", () => {
  degreesInput.value = degreesInput.value.replace(/[^0-9 ]/g, "");
});

addSection.append(addTitle, nameInput, ageInput, subjectsInput, degreesInput, addButton);
topSection.append(searchSection, addSection);

const studentsSection = document.createElement("div");
studentsSection.className = "students-section";

const studentHeader = document.createElement("h3");
studentHeader.textContent = "All Students:";
const studentContainer = document.createElement("div");
studentContainer.id = "studentContainer";

const searchResultsHeader = document.createElement("h3");
searchResultsHeader.textContent = "Search Results:";
const searchResultsContainer = document.createElement("div");
searchResultsContainer.id = "searchResults";

studentsSection.append(studentHeader, studentContainer, searchResultsHeader, searchResultsContainer);
container.append(topSection, studentsSection);
document.body.appendChild(container);

addButton.addEventListener("click", (): void => {
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value.trim());
  const subjects = subjectsInput.value.split(",").map(s => s.trim());
  const degrees = degreesInput.value
    .split(" ")
    .map(d => d.trim())
    .filter(d => /^\d+$/.test(d));

  if (!name || isNaN(age)) return;

  const newStudent: Student = { name, age, subjects, degrees };
  students.push(newStudent);
  renderStudents();
  clearForm();
});

searchButton.addEventListener("click", renderStudents);

function renderStudents(): void {
  studentContainer.innerHTML = "";
  students.forEach((student, index) => {
    const studentDiv = document.createElement("div");
    studentDiv.className = "student-card";
    studentDiv.innerHTML = `
      <p class="student-number">Student #${index + 1}</p>
      <p><span class="label">Name:</span> ${student.name}</p>
      <p><span class="label">Age:</span> ${student.age}</p>
      <p><span class="label">Subjects:</span> ${student.subjects.join(", ")}</p>
      <p><span class="label">Degrees:</span> ${student.degrees.join(", ")}</p>
    `;
    studentContainer.appendChild(studentDiv);
  });


  const searchValue = searchInput.value.trim().toLowerCase();
  searchResultsContainer.innerHTML = "";

  if (searchValue) {
    const filtered = students.filter(s => s.name.toLowerCase().indexOf(searchValue) !== -1);
    filtered.forEach((student, index) => {
      const resultDiv = document.createElement("div");
      resultDiv.className = "student-card";
      resultDiv.innerHTML = `
        <p class="student-number">Result #${index + 1}</p>
        <p><span class="label">Name:</span> ${student.name}</p>
        <p><span class="label">Age:</span> ${student.age}</p>
        <p><span class="label">Subjects:</span> ${student.subjects.join(", ")}</p>
        <p><span class="label">Degrees:</span> ${student.degrees.join(", ")}</p>
      `;
      searchResultsContainer.appendChild(resultDiv);
    });
  }
}

function clearForm(): void {
  nameInput.value = "";
  ageInput.value = "";
  subjectsInput.value = "";
  degreesInput.value = "";
}
