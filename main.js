// carousel movement
document.addEventListener("DOMContentLoaded", function() {
    let carousel = new bootstrap.Carousel(document.querySelector("#offerCarousel"), {
        interval: 2000, // Auto-slide every 1 second
        wrap: true
    });
});



//brand carsoul
let scrollAmount = 0;
const container = document.getElementById('brandWrapper');
const scrollStep = 220; // Adjust based on card width
const totalScroll = container.scrollWidth - container.clientWidth;

function scrollLeft() {
    if (scrollAmount > 0) {
        scrollAmount -= scrollStep;
    } else {
        scrollAmount = totalScroll;
    }
    container.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollRight() {
    if (scrollAmount < totalScroll) {
        scrollAmount += scrollStep;
    } else {
        scrollAmount = 0;
    }
    container.style.transform = `translateX(-${scrollAmount}px)`;
}

// Auto Scroll every 2 seconds
setInterval(() => {
    scrollRight();
}, 2000);


// register modal validation
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const form = this;
    const errorDiv = document.getElementById('formError');
  
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
  
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
  
    if (password !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match.';
      return;
    }
  
    errorDiv.textContent = '';
  
    const payload = {
        info: {
          name: document.getElementById('regName').value,
          dob: document.getElementById('regDob').value,
          phone: Number(document.getElementById('regPhone').value),
          email: document.getElementById('regEmail').value,
          address: {
            country: document.getElementById('regCountry').value,
            state: document.getElementById('regState').value,
            district: document.getElementById('regDistrict').value,
            city: document.getElementById('regCity').value,
            pin: Number(document.getElementById('regPin').value)
          },
          password: password
        }
      };
      
  
    try {
      const res = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
        // Hide register modal
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        form.reset();
        form.classList.remove('was-validated');
        // Show success modal
        new bootstrap.Modal(document.getElementById('successModal')).show();
      } else {
        const data = await res.json();
        errorDiv.textContent = data.detail || 'Registration failed.';
      }
    } catch (err) {
      console.error(err);
      errorDiv.textContent = 'Something went wrong.';
    }
  });
  

// login  Validation
  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = this;
    const errorDiv = document.getElementById('loginError');
  
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
  
    const identifier = document.getElementById('loginEmailPhone').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
  
    try {
      const url = new URL('http://localhost:8000/login');
      url.searchParams.append('phone_or_email', identifier);
      url.searchParams.append('password', password);
  
      const res = await fetch(url, {
        method: 'GET'
      });
  
      const data = await res.json();
     
  
      if (res.ok) {
        // Save session (localStorage or cookie)
        localStorage.setItem('userLoggedIn', "true");
        id=JSON.stringify(data)
        let cleanId = id.replace(/"/g, '');

        localStorage.setItem('user_id', cleanId);
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        form.reset();
        form.classList.remove('was-validated');
        location.reload();
        // Update UI or redirect
      } else {
        errorDiv.textContent = data.detail || 'Invalid credentials.';
      }
    } catch (err) {
      console.error(err);
      errorDiv.textContent = 'Something went wrong.';
    }
  });
  
  

// user profile edit profile 
function saveProfile() {
    const inputs = document.querySelectorAll('.edit-form input');
    let profileData = {};
    inputs.forEach(input => {
        profileData[input.id] = input.value;
    });
    console.log("Profile Updated:", profileData);
    form.reset(); // Clear the form fields
}