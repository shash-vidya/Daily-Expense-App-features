document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('login-message');

  if (!email || !password) {
    message.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
      message.style.color = 'green';
      message.textContent = 'Login successful! Redirecting...';

      setTimeout(() => {
        window.location.href = 'expense.html'; // redirect after login
      }, 1000);
    } else {
      message.style.color = 'red';
      message.textContent = data.message || 'Login failed';
    }
  } catch (err) {
    console.error('Login error:', err);
    message.style.color = 'red';
    message.textContent = 'Something went wrong. Try again later.';
  }
});
