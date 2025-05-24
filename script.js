// index.ts
var students = [];
function createInput(id, placeholder) {
    var input = document.createElement("input");
    input.id = id;
    input.placeholder = placeholder;
    input.className = "input";
    return input;
}
var container = document.createElement("div");
container.className = "container";
var topSection = document.createElement("div");
topSection.className = "top-section";
var searchSection = document.createElement("div");
searchSection.className = "search-section";
var searchTitle = document.createElement("h2");
searchTitle.textContent = "Search Student";
var searchInput = createInput("search", "Enter student name");
var searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchButton.className = "button";
searchSection.appendChild(searchTitle);
searchSection.appendChild(searchInput);
searchSection.appendChild(searchButton);
var addSection = document.createElement("div");
addSection.className = "add-section";
var addTitle = document.createElement("h2");
addTitle.textContent = "Add Student";
var nameInput = createInput("name", "Name");
var ageInput = createInput("age", "Age");
ageInput.type = "text"; // Changed to text to filter manually
var subjectsInput = createInput("subjects", "Subjects (comma separated)");
var degreesInput = createInput("degrees", "Degrees (space separated numbers)");
var addButton = document.createElement("button");
addButton.id = "addButton";
addButton.textContent = "Add Student!";
addButton.className = "button";
// Restrict age input to digits only
ageInput.addEventListener("input", function () {
    ageInput.value = ageInput.value.replace(/[^0-9]/g, "");
});
// Restrict degrees input to numbers and spaces only
degreesInput.addEventListener("input", function () {
    degreesInput.value = degreesInput.value.replace(/[^0-9 ]/g, "");
});
addSection.append(addTitle, nameInput, ageInput, subjectsInput, degreesInput, addButton);
topSection.append(searchSection, addSection);
var studentsSection = document.createElement("div");
studentsSection.className = "students-section";
var studentHeader = document.createElement("h3");
studentHeader.textContent = "All Students:";
var studentContainer = document.createElement("div");
studentContainer.id = "studentContainer";
var searchResultsHeader = document.createElement("h3");
searchResultsHeader.textContent = "Search Results:";
var searchResultsContainer = document.createElement("div");
searchResultsContainer.id = "searchResults";
studentsSection.append(studentHeader, studentContainer, searchResultsHeader, searchResultsContainer);
container.append(topSection, studentsSection);
document.body.appendChild(container);
addButton.addEventListener("click", function () {
    var name = nameInput.value.trim();
    var age = parseInt(ageInput.value.trim());
    var subjects = subjectsInput.value.split(",").map(function (s) { return s.trim(); });
    var degrees = degreesInput.value
        .split(" ")
        .map(function (d) { return d.trim(); })
        .filter(function (d) { return /^\d+$/.test(d); });
    if (!name || isNaN(age))
        return;
    var newStudent = { name: name, age: age, subjects: subjects, degrees: degrees };
    students.push(newStudent);
    renderStudents();
    clearForm();
});
searchButton.addEventListener("click", renderStudents);
function renderStudents() {
    // Render all students
    studentContainer.innerHTML = "";
    students.forEach(function (student, index) {
        var studentDiv = document.createElement("div");
        studentDiv.className = "student-card";
        studentDiv.innerHTML = "\n      <p class=\"student-number\">Student #".concat(index + 1, "</p>\n      <p><span class=\"label\">Name:</span> ").concat(student.name, "</p>\n      <p><span class=\"label\">Age:</span> ").concat(student.age, "</p>\n      <p><span class=\"label\">Subjects:</span> ").concat(student.subjects.join(", "), "</p>\n      <p><span class=\"label\">Degrees:</span> ").concat(student.degrees.join(", "), "</p>\n    ");
        studentContainer.appendChild(studentDiv);
    });
    // Render search results
    var searchValue = searchInput.value.trim().toLowerCase();
    searchResultsContainer.innerHTML = "";
    if (searchValue) {
        var filtered = students.filter(function (s) { return s.name.toLowerCase().indexOf(searchValue) !== -1; });
        filtered.forEach(function (student, index) {
            var resultDiv = document.createElement("div");
            resultDiv.className = "student-card";
            resultDiv.innerHTML = "\n        <p class=\"student-number\">Result #".concat(index + 1, "</p>\n        <p><span class=\"label\">Name:</span> ").concat(student.name, "</p>\n        <p><span class=\"label\">Age:</span> ").concat(student.age, "</p>\n        <p><span class=\"label\">Subjects:</span> ").concat(student.subjects.join(", "), "</p>\n        <p><span class=\"label\">Degrees:</span> ").concat(student.degrees.join(", "), "</p>\n      ");
            searchResultsContainer.appendChild(resultDiv);
        });
    }
}
function clearForm() {
    nameInput.value = "";
    ageInput.value = "";
    subjectsInput.value = "";
    degreesInput.value = "";
}
