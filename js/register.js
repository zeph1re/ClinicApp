import { supabase } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Ambil data dari form
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!fullName || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password and confirm password do not match");
            return;
        }

        // 1. Register user ke Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName, // simpan ke raw_user_meta_data
                },
            },
        });

        if (error) {
            alert("Register failed: " + error.message);
            return;
        }

        // 2. Insert ke tabel profiles (fallback kalau trigger gagal)
        const user = data.user;
        if (user) {
            const { error: profileError } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id, // sama dengan id user di auth.users
                    full_name: fullName, // isi nama
                    role: "patient", // default role patient
                });

            if (profileError) {
                console.error("Profile insert failed:", profileError.message);
            }
        }

        alert("Register success! Please check your email to confirm.");
        window.location.href = "../auth/login.html";
    });
});
