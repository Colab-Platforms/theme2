document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("cotLBdgPdj0OzSPrR");

    // Cafe Type Selection
    const cafeOptions = document.querySelectorAll('.investment-option');
    cafeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.investment-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            if (this.dataset.type) {
                document.getElementById('cafeType').value = this.dataset.type;
            }
        });
    });

    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            const fileNames = files.map(file => file.name).join(', ');
            if (fileNames) {
                const uploadDiv = this.parentElement;
                const p = uploadDiv.querySelector('p');
                p.textContent = fileNames;
            }
        });
    });
});

// CSS Loading Optimization
function loadCSS(href, before, media) {
    var doc = window.document;
    var ss = doc.createElement("link");
    var ref;
    if (before) {
        ref = before;
    } else {
        var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
        ref = refs[refs.length - 1];
    }
    var sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    ss.media = "only x";
    function ready(cb) {
        if (doc.body) {
            return cb();
        }
        setTimeout(function () {
            ready(cb);
        });
    }
    ready(function () {
        ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
    });
    var onloadcssdefined = function (cb) {
        var resolvedHref = ss.href;
        var i = sheets.length;
        while (i--) {
            if (sheets[i].href === resolvedHref) {
                return cb();
            }
        }
        setTimeout(function () {
            onloadcssdefined(cb);
        });
    };
    function loadCB() {
        if (ss.addEventListener) {
            ss.removeEventListener("load", loadCB);
        }
        ss.media = media || "all";
    }
    if (ss.addEventListener) {
        ss.addEventListener("load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);
    return ss;
}

// Load non-critical CSS asynchronously
loadCSS("assets/css/style.css");

// CSS Variables for Performance
document.documentElement.style.setProperty('--primary', '#DF2A00');
document.documentElement.style.setProperty('--secondary', '#FFA700');
document.documentElement.style.setProperty('--light', '#ffffff');
document.documentElement.style.setProperty('--dark', '#000000');
document.documentElement.style.setProperty('--danger', '#dc3545');
document.documentElement.style.setProperty('--success', '#28a745');

async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Application...';
    submitBtn.disabled = true;
    const templateParams = {
        to_email: "business@colabplatforms.com",
        from_name: document.getElementById('fullName').value,
        reply_to: document.getElementById('email').value,
        message: {
            phone: document.getElementById('phone').value,
            cafe_name: document.getElementById('cafeName').value,
            location: document.getElementById('location').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pc_count: document.getElementById('pcCount').value,
            cafe_type: document.getElementById('cafeType').value,
            establishment_year: document.getElementById('establishmentYear').value,
            website: document.getElementById('website').value || 'Not provided',
            social_media: document.getElementById('socialMedia').value || 'Not provided',
            message: document.getElementById('message').value,
            cafe_photos: Array.from(document.getElementById('cafePhotos').files).map(f => f.name).join(', '),
            business_docs: document.getElementById('businessDocs').files[0]?.name || 'Not provided'
        }
    };
    emailjs.send(
        'service_7sos7h8',
        'template_pu73qjh',
        templateParams
    ).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showSuccessMessage();
    }, function(error) {
        console.error('FAILED...', error);
        showErrorMessage(error);
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}

function validateForm() {
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(err => {
        err.style.display = 'none';
    });
    const email = document.getElementById('email');
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    const phone = document.getElementById('phone');
    if (!phone.value.match(/^[0-9]{10}$/)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    if (!document.getElementById('cafeType').value) {
        isValid = false;
        alert('Please select a cafe  type');
    }
    const year = document.getElementById('establishmentYear').value;
    if (year < 1990 || year > new Date().getFullYear()) {
        isValid = false;
        alert('Please enter a valid establishment year');
    }
    return isValid;
}

function showSuccessMessage() {
    const form = document.getElementById('partnerForm');
    form.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: var(--success);">Application Submitted Successfully! 🎮</h2>
            <p>Thank you for your interest in partnering with ColabEsports. Our team will review your application and contact you shortly.</p>
            <button onclick="window.location.href='index.html'" class="submit-btn" style="margin-top: 1rem;">
                Return to Home
            </button>
        </div>
    `;
}

function showErrorMessage(error) {
    console.error('Form submission error:', error);
    alert('There was an error submitting your application. Please try again later.');
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (window.emailjs) {
        emailjs.init("cotLBdgPdj0OzSPrR");
    }
    // Investment options selection
    const investmentOptions = document.querySelectorAll('.investment-option');
    investmentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options in the same group
            const parent = this.parentElement;
            parent.querySelectorAll('.investment-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            this.classList.add('selected');
            // Set the hidden input value
            if (this.dataset.value) {
                document.getElementById('investmentSize').value = this.dataset.value;
            }
            if (this.dataset.type) {
                document.getElementById('partnershipType').value = this.dataset.type;
            }
        });
    });
    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const uploadDiv = this.parentElement;
                const p = uploadDiv.querySelector('p');
                p.textContent = fileName;
            }
        });
    });
});

async function handleSubmit(event) {
    event.preventDefault();
    // Basic validation
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    if (!validateForm()) {
        return;
    }
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Uploading Files...';
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Application...';
    // Prepare template parameters to match the template structure
    const templateParams = {
        to_email: "business@colabplatforms.com", // The email where you want to receive applications
        from_name: fullName,
        reply_to: email,
        message: {
            phone: phone,
            company: document.getElementById('companyName').value,
            designation: document.getElementById('designation').value,
            investment_size: document.getElementById('investmentSize').value,
            investment_type: document.getElementById('partnershipType').value,
            previous_investment: document.querySelector('input[name="previousInvestment"]:checked').value,
            linkedin: document.getElementById('linkedin').value || 'Not provided',
            website: document.getElementById('website').value || 'Not provided',
            message: document.getElementById('message').value,
            investment_profile: document.getElementById('investmentProfile').files[0]?.name || 'Not uploaded',
            due_diligence: document.getElementById('dueDiligence').files[0]?.name || 'Not uploaded'
        }
    };
    // Send email using EmailJS free service
    console.log('Sending email with params:', templateParams);
    emailjs.send(
        'service_2je9nh6', // Your EmailJS service ID
        'template_5bxsrpo', // Your EmailJS template ID
        templateParams
    ).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showSuccessMessage();
    }, function(error) {
        console.error('FAILED...', error);
        showErrorMessage(error);
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}

function validateForm() {
    let isValid = true;
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(err => {
        err.style.display = 'none';
    });
    // Validate email
    const email = document.getElementById('email');
    if (!email.value.match(/^[^\s@]+@[^"]+\.[^\s@]+$/)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    // Validate phone
    const phone = document.getElementById('phone');
    if (!phone.value.match(/^[0-9]{10}$/)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    // Validate required selections
    if (!document.getElementById('investmentSize').value) {
        isValid = false;
        alert('Please select an investment size');
    }
    if (!document.getElementById('partnershipType').value) {
        isValid = false;
        alert('Please select a partnership type');
    }
    return isValid;
}

function generateEmailBody(formData) {
    return `
        <h2>New Investor Application</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${formData.get('fullName')}</p>
        <p><strong>Email:</strong> ${formData.get('email')}</p>
        <p><strong>Phone:</strong> ${formData.get('phone')}</p>
        <h3>Business Information</h3>
        <p><strong>Company Name:</strong> ${formData.get('companyName')}</p>
        <p><strong>Location:</strong> ${formData.get('location')}</p>
        <p><strong>Investment Size:</strong> ${formData.get('investmentSize')}</p>
        <p><strong>Partnership Type:</strong> ${formData.get('partnershipType')}</p>
        <p><strong>Previous Gaming Investment:</strong> ${formData.get('previousInvestment')}</p>
        <h3>Additional Information</h3>
        <p><strong>LinkedIn:</strong> ${formData.get('linkedin')}</p>
        <p><strong>Website:</strong> ${formData.get('website')}</p>
        <p><strong>Message:</strong> ${formData.get('message')}</p>
    `;
}

function showSuccessMessage() {
    const form = document.getElementById('investorForm');
    form.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: var(--success);">Investment Application Submitted Successfully! 💼</h2>
            <p>Thank you for your interest in investing with ColabEsports. Our team will review your application and contact you shortly.</p>
            <button onclick="window.location.href='index.html'" class="submit-btn" style="margin-top: 1rem;">
                Return to Home
            </button>
        </div>
    `;
}

function showErrorMessage(error) {
    console.error('Form submission error:', error);
    const errorMessage = error ? `Error: ${error}` : 'There was an error submitting your application. Please try again later.';
    alert(errorMessage);
    // Log details to console for debugging
    // If templateParams is in scope, log it
    if (typeof templateParams !== 'undefined') {
        console.log('Template Parameters:', templateParams);
    }
    console.log('Service ID:', 'service_2je9nh6');
    console.log('Template ID:', 'template_5bxsrpo');
}
