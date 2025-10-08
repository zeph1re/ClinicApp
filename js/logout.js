import { supabase } from "./constant.js"; // pastikan path ini benar

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout");

  if (!logoutButton) {
    console.error("Logout button not found in DOM");
    return;
  }

  logoutButton.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error during logout:", error.message);
      alert("Logout failed. Please try again.");
      return;
    }

    // Hapus session (jaga-jaga kalau disimpan manual)
    sessionStorage.clear();
    localStorage.clear();

    // Redirect ke login page
    window.location.href = "/auth/login.html"; // pastikan path ini sesuai struktur project kamu
  });
});
