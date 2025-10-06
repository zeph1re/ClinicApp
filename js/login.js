// Initialize Supabase
import { supabase } from './constant.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('loginForm');
  if (!form) {
    console.error("Login form not found in DOM");
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    const user = data.user;

    // Ambil profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      alert("Profile not found: " + profileError.message);
      return;
    }

    sessionStorage.setItem("user", JSON.stringify({ ...user, profile }));

    if (profile.role === "admin") {
      window.location.href = "../admin.html";
    } else {
      window.location.href = "../index.html";
    }
  });
});