document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentyear").textContent = new Date().getFullYear();

    document.getElementById("lastModified").textContent = "Last Update: " + document.lastModified;

    const courses = [
        { name: "CSE 110", completed: true },
        { name: "WDD 130", completed: true },
        { name: "CSE 111", completed: false },
        { name: "CSE 210", completed: true },
        { name: "WDD 131", completed: true },
        { name: "WDD 231", completed: false }
    ];

    const courseList = document.getElementById("course-list");
    const coursesDiv = document.getElementById("courses");

    courses.forEach(course => {
        const courseItem = document.createElement("li");
        courseItem.textContent = course.name;
        courseList.appendChild(courseItem);

        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");
        courseDiv.textContent = course.name;
        if (course.completed) {
            courseDiv.style.backgroundColor = "#4CAF50"; 
        } else {
            courseDiv.style.backgroundColor = "#f44336";
        }
        coursesDiv.appendChild(courseDiv);
    });
 });


 function toggleMenu() {
     const menu = document.getElementById("menu");
     menu.style.display = menu.style.display === "block" ? "none" : "block";
 }