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
    option: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) {
    alert("Registration failed: " + error.message);
    return null;
  } 
  
   // 2. Buat entry di tabel profiles (sinkronisasi)
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: user.id,
      full_name: fullName,
      phone,
      dob,
      gender,
      address,
      role: "patient" // default role pasien
    }
  ]);

  if (profileError) {
    console.error("Error insert profile:", profileError.message);
    return null;
  }

  console.log("Register success:", user);
  return user;
});


// Login 

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  // 1. Login via supabase auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login failed:", error.message);
    return null;
  }

  const user = data.user;

  // 2. Ambil data dari tabel profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Profile not found:", profileError.message);
    return null;
  }

  console.log("Login success:", { ...user, profile });
   if (profile.role === "admin") {
    window.location.href = "/admin.html";
  } else {
    window.location.href = "/index.html";
  }
  return { ...user, profile };

 
});

// Logout
document.getElementById('logout').addEventListener('submit', async (event) => {
  event.preventDefault();
  await supabase.auth.signOut();
  sessionStorage.removeItem("user");
  window.location.href = "/login.html";
});