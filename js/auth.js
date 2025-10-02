// Initialize Supabase
import {supabaseUrl, supabaseAnonKey} from './constant.js';

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Sign Up
document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // === 3. Get form values ===
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // === 4. Validate ===
  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please fill out all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // === 5. Sign up with Supabase ===
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Registration failed: " + error.message);
  } else {
    await supabase
    .from('users')
    .insert([{email: email, fullName: fullName, role: 'patient'}]);

    alert("Registration successful! Please check your email to confirm your account.");
  
    // Optionally redirect to login page
    window.location.href = 'login.html';
  }

  
});


// Login 

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password');

    const {user, error} = await supabase.auth.signInWithPassword({
        email, password
    });

    if(error) {
        alert("Login Error = " + error.message);
    } else {
      document.getElementById('auth-status').innerText = `Welcome, ${user.fullName}`;

      const {data, error: userDataError} = await supabase.from('users').select('*').eq('uid', user.id).single();

      if(userDataError) {
        alert(userDataError.message);
      } else {
        console.log('User Data', data);
      }
    }

    if (role === 'patient') {
        window.location.href = 'index.html';
    } if (role === "admint") {
        window.location.href = 'admin.html';
    } else {
        alert("Access Denied")
    }
});