// Initialize Supabase
import {supabaseUrl, supabaseAnonKey} from './constant.js';

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Sign Up
async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role }  // Custom user_metadata
    }
  });

  if (error) {
    alert("Error signing up: " + error.message);
  } else {
    alert("Check your email to confirm the signup.");
  }
}

// Sign In
async function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    const user = data.user;
    const role = user.user_metadata?.role || 'unknown';

    alert(`Welcome ${user.email}, your role is: ${role}`);

    if (role === 'doctor') {
      // redirect or show doctor panel
      window.location.href = '/doctor-dashboard.html';
    } else {
      // redirect or show patient panel
      window.location.href = '/patient-dashboard.html';
    }
  }
}
