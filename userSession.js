document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    const dropdownLabel = document.getElementById('dropdownLabel');
    const dropdownMenu = document.getElementById('userDropdownMenu');

    if (dropdownLabel && dropdownMenu) {
        if (isLoggedIn) {
            dropdownLabel.textContent = 'My Account';
            dropdownMenu.innerHTML = `
                <li class="dropdown-header">Welcome, User</li>
                <li><a class="dropdown-item" href="user_profile.html"><i class="fa-solid fa-user"></i> My Profile</a></li>
                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-box"></i> Orders</a></li>
                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-heart"></i> Wishlist</a></li>
                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-credit-card"></i> Payments</a></li>
                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-cog"></i> Settings</a></li>
                <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fa-solid fa-sign-out-alt"></i> Logout</a></li>
            `;
        } else {
            dropdownLabel.textContent = 'Login';
            dropdownMenu.innerHTML = `
                <li class="p-3 text-center">
                    <button class="btn btn-primary w-100 mb-2" onclick="login()">Login</button>
                    <div class="mt-1">New user? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Register</a></div>
                </li>
            `;
        }
    }
});


function logout() {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("user_id");
    window.location.replace("index.html");
}
