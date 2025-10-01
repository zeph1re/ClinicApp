// Initialize Supabase
import {supabaseUrl, supabaseAnonKey} from './constant.js';

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Sign Up
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // === 3. Get form values ===
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const role = document.getElementById('role').value;

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
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });

  if (error) {
    alert("Registration failed: " + error.message);
    return;
  }

  alert("Registration successful! Please check your email to confirm your account.");
  
  // Optionally redirect to login page
  window.location.href = 'auth/login.html';
});


// Login 

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function(){
    e.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password');

    const {data, error} = await supabase.auth.signInWithPassword({
        email, password
    });

    if(error) {
        alert("Login Error = " + error.message);
        return;
    }

    if (role === 'patient') {
        window.location.href = '/index.html';
    } if (role === "admint") {
        window.location.href = 'admin.html';
    } else {
        alert("Access Denied")
    }
});