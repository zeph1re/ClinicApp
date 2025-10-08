document.addEventListener("DOMContentLoaded", () => {
  const headerNav = document.getElementById("header_button");
  const userData = JSON.parse(sessionStorage.getItem("user"));

  // Jika user sudah login
  if (userData) {
    headerNav.innerHTML = `
				<button id="logoutBtn" 
                    class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold transition">
                    Logout
                </button>
    `;

    // Event logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      // Hapus session
      sessionStorage.removeItem("user");

      // Redirect ke halaman login
      window.location.href = "../auth/login.html";
    });
  } 
  // Jika user belum login
  else {
    headerNav.innerHTML = `
				<button
					class="text-gray-600"
					onclick="window.location.href='../auth/login.html';"
				>
					Login
				</button>
				<button
					class="bg-orange-500 text-white px-4 py-2 rounded-lg"
					onclick="window.location.href='../auth/register.html';"
				>
					Register
				</button>
    `;
  }
});
