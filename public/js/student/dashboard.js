// document.addEventListener("DOMContentLoaded", async () => {
//     const studentData = JSON.parse(localStorage.getItem("student"));
//     if (!studentData) {
//         alert("Session expired! Please log in again.");
//         window.location.href = "/public/js/index.html";
//         return;
//     }
//     document.getElementById("studentName").textContent = studentData.rollNumber;

//     await loadCourses();
//     loadSavedSchedule();
//     await loadPrerequisites();
// });

// async function loadCourses() {
//     try {
//         const response = await fetch("/student/courses");
//         const courses = await response.json();
//         localStorage.setItem("courses", JSON.stringify(courses));
//         displayCourses(courses);
//     } catch (error) {
//         console.error("Error loading courses:", error);
//     }
// }

// function displayCourses(courses) {
//     const courseList = document.getElementById("courseList");
//     courseList.innerHTML = "";

//     courses.forEach(course => {
//         const li = document.createElement("li");
//         li.innerHTML = `
//             <strong>${course.name}</strong> (${course.department}) - ${course.time} -
//             <span class="${course.seats > 0 ? 'available' : 'full'}">
//                 ${course.seats > 0 ? `${course.seats} Seats Left` : "Full"}
//             </span>
//             <button onclick="addToSchedule('${course.id}')">Add</button>
//         `;
//         courseList.appendChild(li);
//     });
// }

// function filterCourses() {
//     let search = document.getElementById("search").value.toLowerCase();
//     let department = document.getElementById("departmentFilter").value;
//     let level = document.getElementById("levelFilter").value;
//     let time = document.getElementById("timeFilter").value;
//     let day = document.getElementById("dayFilter").value;
//     let openSeats = document.getElementById("openSeatsFilter").checked;

//     let courses = JSON.parse(localStorage.getItem("courses")) || [];
//     let filteredCourses = courses.filter(course => {
//         return (
//             (search === "" || course.name.toLowerCase().includes(search)) &&
//             (department === "" || course.department === department) &&
//             (level === "" || course.level === level) &&
//             (time === "" || course.time.toLowerCase() === time) &&
//             (day === "" || course.day === day) &&
//             (!openSeats || course.seats > 0)
//         );
//     });

//     displayCourses(filteredCourses);
// }

// function addToSchedule(courseId) {
//     let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
//     let courses = JSON.parse(localStorage.getItem("courses"));
//     let course = courses.find(c => c.id === courseId);

//     if (schedule.some(c => c.time === course.time && c.day === course.day)) {
//         alert("⚠️ Scheduling conflict detected!");
//         return;
//     }

//     schedule.push(course);
//     localStorage.setItem("schedule", JSON.stringify(schedule));
//     loadSavedSchedule();
// }

// function loadSavedSchedule() {
//     let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
//     const scheduleTable = document.querySelector("#scheduleTable tbody");
//     scheduleTable.innerHTML = "";

//     schedule.forEach(course => {
//         const row = scheduleTable.insertRow();
//         row.innerHTML = `
//             <td>${course.time}</td>
//             <td>${course.day === 'mon' ? course.name : ''}</td>
//             <td>${course.day === 'tue' ? course.name : ''}</td>
//             <td>${course.day === 'wed' ? course.name : ''}</td>
//             <td>${course.day === 'thu' ? course.name : ''}</td>
//             <td>${course.day === 'fri' ? course.name : ''}</td>
//         `;
//     });
// }

// async function loadPrerequisites() {
//     try {
//         const response = await fetch("/student/prerequisites");
//         const prerequisites = await response.json();
//         document.getElementById("prerequisites").innerHTML = prerequisites
//             .map(p => `<p>${p.course} → Requires: ${p.requires}</p>`)
//             .join("");
//     } catch (error) {
//         console.error("Error loading prerequisites:", error);
//     }
// }

// function logout() {
//     localStorage.clear();
//     fetch("/auth/logout", { method: "POST" })
//         .then(() => window.location.href = "/public/index.html")
//         .catch(() => window.location.href = "/public/index.html");
// }
