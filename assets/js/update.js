src = "assets/js/vendor/jquery-7.1.1.slim.min.js"
window.addEventListener('load', function () {
  setTimeout(function () {
    document.querySelector('.header').classList.add('show');
  }, 1000); 
});
class UserManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("registeredUsers")) || []
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null
  }

  getCurrentUser() {
    return this.currentUser
  }

  updateUserProfile(userData) {
    if (this.currentUser) {
      const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id)
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...userData }
        if (userData.password) {
          this.users[userIndex].password = userData.password
        }
        localStorage.setItem("registeredUsers", JSON.stringify(this.users))
        const { password, ...userWithoutPassword } = this.users[userIndex]
        this.currentUser = userWithoutPassword
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: this.currentUser.name,
            email: this.currentUser.email,
            isLoggedIn: true,
            avatar: this.currentUser.avatar,
            nickname: this.currentUser.nickname,
            mobile: this.currentUser.mobile,
            country: this.currentUser.country,
            bio: this.currentUser.bio,
            dob: this.currentUser.dob,
            status: this.currentUser.status || 'online',
          }),
        )
        localStorage.setItem("profileViewData", JSON.stringify(this.currentUser))
        if (window.profileSyncManager) {
          window.profileSyncManager.broadcastProfileUpdate(this.currentUser)
        } else {
          if (userData.avatar !== undefined) {
            this.updateAllAvatarDisplays(userData.avatar)
          }
        }

        return { success: true, message: "Profile updated successfully!" }
      }
    }

    return { success: false, message: "User not found!" }
  }
  updateAllAvatarDisplays(avatarUrl) {
    const profileAvatar = document.getElementById("profileAvatar")
    if (profileAvatar) {
      if (avatarUrl) {
        profileAvatar.src = avatarUrl
        profileAvatar.style.opacity = "1"
      } else {
        profileAvatar.style.opacity = "0"
      }
    }
    const headerAvatar = document.getElementById("headerAvatar")
    if (headerAvatar) {
      if (avatarUrl) {
        headerAvatar.src = avatarUrl
        headerAvatar.style.display = "block"
      } else {
        headerAvatar.style.display = "none"
      }
    }
    if (avatarUrl) {
      document.querySelectorAll(".avatar-placeholder").forEach((p) => p.remove())
    }
    window.dispatchEvent(
      new CustomEvent("avatarUpdated", {
        detail: { avatarUrl },
      }),
    )
  }
}
const userManager = new UserManager()
function createAvatarPlaceholder(name) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
  const colors = ["#DA2700", "#FFA700", "#4CAF50", "#2196F3", "#9C27B0"]
  const colorIndex = name.charCodeAt(0) % colors.length
  const bgColor = colors[colorIndex]

  return `
        <div class="avatar-placeholder" style="
            width: 100%;
            height: 100%;
            border-radius: 50%;
          // background-color: ${bgColor};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        ">${initials}</div>
    `
}

let currentAvatarFile = null

function handleAvatarChange(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.startsWith("image/")) {
    showError("Please select a valid image file")
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    showError("Image size must be less than 5MB")
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    const avatarImg = document.getElementById("profileAvatar")
    const avatarContainer = avatarImg.parentElement
    avatarImg.src = e.target.result
    avatarImg.style.opacity = "1"
    const placeholder = avatarContainer.querySelector(".avatar-placeholder")
    if (placeholder) {
      placeholder.remove()
    }
    document.getElementById("removeAvatarBtn").style.display = "inline-flex"
    currentAvatarFile = e.target.result
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  const avatarImg = document.getElementById("profileAvatar")
  const avatarContainer = avatarImg.parentElement
  const currentUser = userManager.getCurrentUser()
  avatarImg.style.opacity = "0"
  avatarImg.src = ""
  if (currentUser && !avatarContainer.querySelector(".avatar-placeholder")) {
    const placeholder = createAvatarPlaceholder(currentUser.name)
    avatarContainer.insertAdjacentHTML("afterbegin", placeholder)
  }
  document.getElementById("removeAvatarBtn").style.display = "none"
  currentAvatarFile = null
  document.getElementById("avatarInput").value = ""
}

function updateCharCount() {
  const bioTextarea = document.getElementById("bio")
  const charCount = document.querySelector(".char-count")
  const currentLength = bioTextarea.value.length
  const maxLength = 500

  charCount.textContent = `${currentLength}/${maxLength} characters`

  if (currentLength > maxLength) {
    charCount.style.color = "#dc3545"
    bioTextarea.value = bioTextarea.value.substring(0, maxLength)
  } else if (currentLength > maxLength * 0.9) {
    charCount.style.color = "#ffc107"
  } else {
    charCount.style.color = "rgba(255, 255, 255, 0.5)"
  }
}

function validatePasswords() {
  const currentPassword = document.getElementById("currentPassword").value
  const newPassword = document.getElementById("newPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value
  if (currentPassword || newPassword || confirmPassword) {
    if (!currentPassword) {
      showError("Current password is required to change password")
      return false
    }

    if (!newPassword) {
      showError("New password is required")
      return false
    }

    if (newPassword !== confirmPassword) {
      showError("New passwords do not match")
      return false
    }

    if (newPassword.length < 6) {
      showError("New password must be at least 6 characters long")
      return false
    }
  }

  return true
}

function handleProfileUpdate(event) {
  event.preventDefault()
  if (!validatePasswords()) {
    return
  }
  const formData = new FormData(event.target)
  const profileData = {
    name: formData.get("fullName"),
    email: formData.get("email"),
    nickname: formData.get("nickname"),
    mobile: formData.get("mobile"),
    country: formData.get("country"),
    dob: formData.get("dob"),
    bio: formData.get("bio"),
  }
  if (currentAvatarFile !== null) {
    profileData.avatar = currentAvatarFile
  }
  const newPassword = formData.get("newPassword")
  if (newPassword) {
    profileData.password = newPassword
  }
  const saveBtn = document.querySelector(".save-btn")
  const originalText = saveBtn.innerHTML
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'
  saveBtn.disabled = true
  saveBtn.classList.add("submitting")
  setTimeout(() => {
    const result = userManager.updateUserProfile(profileData)
    if (result.success) {
      showNotification("Profile updated successfully!")
      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: { userData: userManager.getCurrentUser() },
        }),
      )
      setTimeout(() => {
        window.location.href = "profile.html"
      }, 1500)
    } else {
      showError(result.message || "Failed to update profile")
      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
      saveBtn.classList.remove("submitting")
    }
  }, 1500)
}

function cancelEdit() {
  if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
    window.location.href = "profile.html"
  }
}

function loadUserData() {
  let currentUser = null;

  if (window.profileSyncManager) {
    currentUser = window.profileSyncManager.getCurrentUserData();
  } else {
    currentUser = userManager.getCurrentUser();
  }

  if (!currentUser) {
    showError("Please login to edit profile")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 2000)
    return
  }
  document.getElementById("fullName").value = currentUser.name || ""
  document.getElementById("nickname").value = currentUser.nickname || ""
  document.getElementById("email").value = currentUser.email || ""
  document.getElementById("mobile").value = currentUser.mobile || ""
  document.getElementById("country").value = currentUser.country || ""
  document.getElementById("dob").value = currentUser.dob || ""
  document.getElementById("bio").value = currentUser.bio || ""
  if (window.profileSyncManager) {
    window.profileSyncManager.syncProfileData();
  } else {
    document.getElementById("profileName").textContent = currentUser.name || "User Name"
    document.getElementById("profileEmail").textContent = currentUser.email || "user@email.com"
  }
  const avatarImg = document.getElementById("profileAvatar")
  const avatarContainer = avatarImg.parentElement

  if (currentUser.avatar) {
    avatarImg.src = currentUser.avatar
    avatarImg.style.opacity = "1"
    document.getElementById("removeAvatarBtn").style.display = "inline-flex"
    const existingPlaceholder = avatarContainer.querySelector(".avatar-placeholder")
    if (existingPlaceholder) {
      existingPlaceholder.remove()
    }
  } else {
    avatarImg.style.opacity = "0"

    if (!avatarContainer.querySelector(".avatar-placeholder")) {
      const placeholder = createAvatarPlaceholder(currentUser.name)
      avatarContainer.insertAdjacentHTML("afterbegin", placeholder)
    }
  }
  updateCharCount()
}
loadUserData()
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))
    tab.classList.add("active")
    const tabId = tab.getAttribute("data-tab")
    document.getElementById(tabId).classList.add("active")
  })
})
document.getElementById("avatarInput").addEventListener("change", handleAvatarChange)
document.getElementById("removeAvatarBtn").addEventListener("click", removeAvatar)
const bioTextarea = document.getElementById("bio")
bioTextarea.addEventListener("input", updateCharCount)
const form = document.getElementById("editProfileForm")
const inputs = form.querySelectorAll("input, select, textarea")
inputs.forEach((input) => {
  input.addEventListener("blur", function () {
    validateField(this)
  })
})
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cancelEdit()
  }
})
function validateField(field) {
  const formGroup = field.closest(".form-group")
  const errorMessage = formGroup.querySelector(".error-message")
  if (errorMessage) {
    errorMessage.remove()
  }
  formGroup.classList.remove("error", "success")
  if (field.hasAttribute("required") && !field.value.trim()) {
    showFieldError(formGroup, "This field is required")
    return false
  }
  if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(field.value)) {
      showFieldError(formGroup, "Please enter a valid email address")
      return false
    }
  }
  if (field.name === "mobile" && field.value) {
    const mobileRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!mobileRegex.test(field.value.replace(/\s/g, ""))) {
      showFieldError(formGroup, "Please enter a valid mobile number")
      return false
    }
  }
  if (field.value.trim()) {
    formGroup.classList.add("success")
  }

  return true
}

function showFieldError(formGroup, message) {
  formGroup.classList.add("error")

  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message

  formGroup.appendChild(errorDiv)
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999999;
        animation: slideIn 0.3s ease;
    `

  document.body.appendChild(notification)
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

function showError(message) {
  const notification = document.createElement("div")
  notification.className = "error-notification"
  notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999999;
        animation: slideIn 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

src = "assets/js/profile-sync.js"