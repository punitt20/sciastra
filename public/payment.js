document.addEventListener('DOMContentLoaded', function() {
    const cardPaymentForm = document.getElementById('cardPaymentForm')
    const upiPaymentForm = document.getElementById('upiPaymentForm')

    cardPaymentForm.addEventListener('submit', async function(e) {
        e.preventDefault()
        
        const transactionData = {
            user_id: 1,
            course_id: 1,
            amount: 79.99,
            payment_method: 'credit_card'
        }

        try {
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            })

            const result = await response.json()

            if (result.status === 'success') {
                showPaymentMessage('success', 'Payment successful!', 'Your transaction has been completed.')
            } else {
                showPaymentMessage('error', 'Payment failed', result.message)
            }
        } catch (error) {
            console.error('Payment error:', error)
            showPaymentMessage('error', 'Payment failed', 'An error occurred during payment processing.')
        }
    })

    upiPaymentForm.addEventListener('submit', async function(e) {
        e.preventDefault()
        
        const transactionData = {
            user_id: 1,
            course_id: 1,
            amount: 79.99,
            payment_method: 'upi'
        }

        try {
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            })

            const result = await response.json()

            if (result.status === 'success') {
                showPaymentMessage('success', 'Payment successful!', 'Your transaction has been completed.')
            } else {
                showPaymentMessage('error', 'Payment failed', result.message)
            }
        } catch (error) {
            console.error('Payment error:', error)
            showPaymentMessage('error', 'Payment failed', 'An error occurred during payment processing.')
        }
    })

    function showPaymentMessage(type, title, message) {
        const messageDiv = document.createElement('div')
        messageDiv.className = `payment-message ${type}`
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'times-circle'}"></i>
                <h3>${title}</h3>
                <p>${message}</p>
                <button onclick="window.location.href='${type === 'success' ? 'courses.html' : '#'}'">
                    ${type === 'success' ? 'Return to Courses' : 'Try Again'}
                </button>
            </div>
        `
        document.body.appendChild(messageDiv)

        if (type === 'error') {
            setTimeout(() => messageDiv.remove(), 5000)
        }
    }

    document.querySelector('.payment-form').addEventListener('submit', function(e) {
        e.preventDefault()
        
        const submitButton = this.querySelector('.submit-button')
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
        submitButton.disabled = true
        
        setTimeout(() => {
            const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
            document.getElementById('transactionId').textContent = transactionId
            
            const popup = document.getElementById('paymentPopup')
            popup.classList.add('active')
            
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Pay Securely'
            submitButton.disabled = false
        }, 2000)
    })
})