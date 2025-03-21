// document.addEventListener('DOMContentLoaded', async () => {
//     const student = JSON.parse(localStorage.getItem('student'));
//     if (!student) {
//         window.location.href = '../../index.html';
//         return;
//     }

//     document.getElementById('studentName').innerText = student.rollNumber;

//     try {
//         const response = await fetch('/student/courses', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${student.token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch courses');
//         }

//         const courses = await response.json();
//         displayCourses(courses);
//     } catch (error) {
//         console.error('Error loading courses:', error);
//         document.getElementById('courseList').innerHTML = '<li>Error loading courses.</li>';
//     }
// });

// function displayCourses(courses) {
//     const courseList = document.getElementById('courseList');
//     courseList.innerHTML = '';

//     courses.forEach(course => {
//         const li = document.createElement('li');
//         li.innerHTML = `${course.title} (${course.courseCode}) - Seats: ${course.seats}
//             <button onclick="enroll('${course._id}')">Enroll</button>`;
//         courseList.appendChild(li);
//     });
// }

// async function enroll(courseId) {
//     const student = JSON.parse(localStorage.getItem('student'));
//     if (!student) {
//         alert("Please log in to enroll.");
//         window.location.href = '../../index.html';
//         return;
//     }

//     try {
//         const response = await fetch(`/student/enroll/${courseId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${student.token}`
//             },
//             body: JSON.stringify({ rollNumber: student.rollNumber })
//         });

//         const result = await response.json();

//         if (!response.ok) {
//             throw new Error(result.message || 'Enrollment failed');
//         }

//         alert(result.message);
//         window.location.reload();
//     } catch (error) {
//         alert(`Enrollment failed: ${error.message}`);
//     }
// }

// function logout() {
//     localStorage.removeItem('student');
//     window.location.href = '../../index.html';
// }
