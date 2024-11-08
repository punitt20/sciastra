document.getElementById('addCourseForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        duration_weeks: document.getElementById('duration_weeks').value,
        level: document.getElementById('level').value,
        category: document.getElementById('category').value
    }

    try {
        const response = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            alert('Course added successfully!')
            document.getElementById('addCourseForm').reset()
        } else {
            throw new Error('Failed to add course')
        }
    } catch (error) {
        console.error('Error:', error)
        alert('Failed to add course: ' + error.message)
    }
})