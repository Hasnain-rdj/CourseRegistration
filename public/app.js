async function login() {
    const rollNumber = document.getElementById('rollNumber').value.trim();
    if (!rollNumber) {
        alert("Please enter your Roll Number");
        return;
    }
    try {
        const res = await fetch('http://localhost:5000/api/students/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollNumber })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("userType", "student");
            localStorage.setItem("studentRollNumber", rollNumber);
            window.location.href = "student-dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login.");
    }
}

async function loginAdmin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    if (!username || !password) {
        alert("Please enter your credentials");
        return;
    }
    try {
        const res = await fetch('http://localhost:5000/api/admins/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("userType", "admin");
            localStorage.setItem("adminUsername", username);
            window.location.href = "admin-dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error("Admin login error:", err);
        alert("An error occurred during admin login.");
    }
}

async function fetchCourses() {
    try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        if (res.ok) {
            console.log("Courses:", data);
        } else {
            alert("Error fetching courses: " + data.message);
        }
    } catch (err) {
        console.error("Fetch courses error:", err);
        alert("An error occurred while fetching courses.");
    }
}

async function fetchSchedule() {
    const rollNumber = localStorage.getItem("studentRollNumber");
    if (!rollNumber) {
        alert("Login required");
        return;
    }
    try {
        const res = await fetch(`http://localhost:5000/api/courses/schedule/${rollNumber}`);
        const data = await res.json();
        if (res.ok) {
            console.log("Student Schedule:", data);
        } else {
            alert("Error fetching schedule: " + data.message);
        }
    } catch (err) {
        console.error("Fetch schedule error:", err);
        alert("An error occurred while fetching the schedule.");
    }
}

async function registerCourse(courseCode) {
    const rollNumber = localStorage.getItem("studentRollNumber");
    if (!rollNumber) {
        alert("Login required");
        return;
    }
    try {
        const res = await fetch('http://localhost:5000/api/courses/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollNumber, courseCode })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Course registered successfully");
            fetchSchedule();
            updateSeatAvailability(courseCode);
        } else {
            alert("Error registering course: " + data.message);
        }
    } catch (err) {
        console.error("Error registering course!", err);
        alert("An error occurred while registering the course.");
    }
}
