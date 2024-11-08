function toggleModule(element) {
    const content = element.nextElementSibling;
    content.classList.toggle('active');
    const icon = element.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        const courses = await response.json();
        
        const coursesGrid = document.querySelector('.courses-grid');
        coursesGrid.innerHTML = '';
        
        const displayCourses = courses.slice(0, 6);
        
        displayCourses.forEach(course => {
            coursesGrid.innerHTML += `
                <div class="course-box">
                    <img src="https://via.placeholder.com/300x200" alt="${course.title}">
                    <h3>${course.title}</h3>
                    <p class="price">₹${course.price}</p>
                    <p class="description">${course.description}</p>
                    <div class="course-details">
                        <ul>
                            <li>Level: ${course.level}</li>
                        </ul>
                    </div>
                    <div class="course-buttons">
                        <button class="btn-learn-more">Learn More</button>
                        <button onclick="window.location.href='payment.html'" class="btn-buy-now">Buy Now</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadCourses);