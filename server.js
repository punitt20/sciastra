const express = require('express')
const path = require('path')
const db = require('./config/database')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/test-connection', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, title, description, price, level FROM courses')
        res.json({ 
            status: 'success',
            message: 'Connected to database successfully',
            data: rows
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Database connection failed',
            error: error.message 
        })
    }
})

app.get('/api/courses', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM courses')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching courses', 
            error: error.message 
        })
    }
})

app.post('/api/courses', async (req, res) => {
    try {
        const { title, description, price, duration_weeks, level, category } = req.body
        const [result] = await db.execute(
            'INSERT INTO courses (title, description, price, duration_weeks, level, category) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, price, duration_weeks, level, category]
        )
        res.status(201).json({
            message: 'Course added successfully',
            courseId: result.insertId
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding course',
            error: error.message
        })
    }
})

app.post('/api/transactions', async (req, res) => {
    try {
        const { user_id, course_id, amount, payment_method } = req.body
        const [result] = await db.execute(
            'INSERT INTO transactions (user_id, course_id, amount, payment_method, transaction_status) VALUES (?, ?, ?, ?, ?)',
            [user_id, course_id, amount, payment_method, 'completed']
        )
        if (result.insertId) {
            await db.execute(
                'INSERT INTO enrollments (user_id, course_id, status) VALUES (?, ?, ?)',
                [user_id, course_id, 'active']
            )
        }
        res.status(201).json({
            status: 'success',
            message: 'Transaction completed successfully',
            transaction_id: result.insertId
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Transaction failed',
            error: error.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})