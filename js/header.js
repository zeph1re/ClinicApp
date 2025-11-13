const userData = JSON.parse(sessionStorage.getItem("user"));


document.addEventListener("DOMContentLoaded", () => {
    const headerNav = document.getElementById("header_button");
    const appointmentFormBtn = document.getElementById("appointmentFormButton");

    


    // Jika user sudah login
    if (userData) {
        headerNav.innerHTML = `
				<button id="logoutBtn" 
                    class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold transition">
                    Logout
                </button>
    `;

    appointmentFormBtn.addEventListener("click", function () {
        window.location.href = "view/appointment.html";
    });

        // Event logout
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", async () => {
            // Hapus session
            sessionStorage.removeItem("user");

            // Redirect ke halaman login
            window.location.href = "view/login.html";
        });

    }
    // Jika user belum login
    else {
        headerNav.innerHTML = `
				<button
					class="text-gray-600"
					onclick="window.location.href='view/login.html';"
				>
					Login
				</button>
				<button
					class="bg-orange-500 text-white px-4 py-2 rounded-lg"
					onclick="window.location.href='view/register.html';"
				>
					Register
				</button>
    `;

    appointmentFormBtn.addEventListener("click", function () {    
        alert("Anda belum login! Silakan login terlebih dahulu.");
        window.location.href = "view/login.html";
    });
    }
});
