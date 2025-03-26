
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Auth Modal
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const authModal = document.getElementById('authModal');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const showSignupBtn = document.getElementById('showSignupBtn');
        const showLoginBtn = document.getElementById('showLoginBtn');
        
        // Show/Hide Auth Modal
        function toggleAuthModal() {
            authModal.classList.toggle('hidden');
        }
        
        loginBtn.addEventListener('click', toggleAuthModal);
        mobileLoginBtn.addEventListener('click', toggleAuthModal);
        
        // Close modal when clicking outside
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                toggleAuthModal();
            }
        });
        
        // Switch between login and signup forms
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });
        
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
        
        // Login Form Submission
        const loginSubmitBtn = document.getElementById('loginSubmitBtn');
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        const loginError = document.getElementById('loginError');
        const profileDropdown = document.getElementById('profileDropdown');
        const mobileProfileDropdown = document.getElementById('mobileProfileDropdown');
        const profileBtn = document.getElementById('profileBtn');
        const mobileProfileBtn = document.getElementById('mobileProfileBtn');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const profileName = document.getElementById('profileName');
        const mobileProfileName = document.getElementById('mobileProfileName');
        const avatarImg = document.getElementById('avatarImg');
        const mobileAvatarImg = document.getElementById('mobileAvatarImg');
        const mobileProfileMenu = document.getElementById('mobileProfileMenu');
        
        loginSubmitBtn.addEventListener('click', () => {
            // Simple validation
            if (!loginEmail.value || !loginPassword.value) {
                loginError.textContent = 'Please fill in all fields';
                loginError.classList.remove('hidden');
                return;
            }
            
            // Check if user exists (simulated)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === loginEmail.value && u.password === loginPassword.value);
            
            if (user) {
                // Login successful
                localStorage.setItem('currentUser', JSON.stringify(user));
                toggleAuthModal();
                updateUserInterface();
            } else {
                // Login failed
                loginError.textContent = 'Invalid email or password';
                loginError.classList.remove('hidden');
            }
        });
        
        // Signup Form Submission
        const signupSubmitBtn = document.getElementById('signupSubmitBtn');
        const signupName = document.getElementById('signupName');
        const signupEmail = document.getElementById('signupEmail');
        const signupPassword = document.getElementById('signupPassword');
        const signupError = document.getElementById('signupError');
        
        signupSubmitBtn.addEventListener('click', () => {
            // Simple validation
            if (!signupName.value || !signupEmail.value || !signupPassword.value) {
                signupError.textContent = 'Please fill in all fields';
                signupError.classList.remove('hidden');
                return;
            }
            
            // Check if email already exists (simulated)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.email === signupEmail.value)) {
                signupError.textContent = 'Email already registered';
                signupError.classList.remove('hidden');
                return;
            }
            
            // Add new user
            const newUser = {
                name: signupName.value,
                email: signupEmail.value,
                password: signupPassword.value,
                photo: null
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Show success and update UI
            toggleAuthModal();
            updateUserInterface();
        });
        
        // Profile Dropdown Toggle
        profileBtn?.addEventListener('click', () => {
            dropdownMenu.classList.toggle('hidden');
        });
        
        mobileProfileBtn?.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            }
            mobileProfileMenu.classList.toggle('hidden');
        });
        
        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
        
        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateUserInterface();
            dropdownMenu.classList.add('hidden');
        });
        
        mobileLogoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateUserInterface();
            mobileMenu.classList.add('hidden');
        });
        
        // Profile Modal
        const profileModal = document.getElementById('profileModal');
        const viewProfileBtn = document.getElementById('viewProfileBtn');
        const mobileViewProfileBtn = document.getElementById('mobileViewProfileBtn');
        const closeProfileBtn = document.getElementById('closeProfileBtn');
        const profileFullName = document.getElementById('profileFullName');
        const profileNameInput = document.getElementById('profileNameInput');
        const profileEmailInput = document.getElementById('profileEmailInput');
        const maskedPassword = document.getElementById('maskedPassword');
        const profilePhotoPreview = document.getElementById('profilePhotoPreview');
        const profilePhotoUpload = document.getElementById('profilePhotoUpload');
        const changePasswordBtn = document.getElementById('changePasswordBtn');
        const changePasswordSection = document.getElementById('changePasswordSection');
        const oldPassword = document.getElementById('oldPassword');
        const newPassword = document.getElementById('newPassword');
        const repeatPassword = document.getElementById('repeatPassword');
        const passwordError = document.getElementById('passwordError');
        const savePasswordBtn = document.getElementById('savePasswordBtn');
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        
        // Show Profile Modal
        function showProfileModal() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                profileFullName.textContent = currentUser.name;
                profileNameInput.value = currentUser.name;
                profileEmailInput.value = currentUser.email;
                
                // Mask password
                const passwordLength = currentUser.password.length;
                const lastThree = currentUser.password.slice(-3);
                const maskedPart = '*'.repeat(passwordLength - 3);
                maskedPassword.textContent = maskedPart + lastThree;
                
                // Set profile photo if exists
                if (currentUser.photo) {
                    profilePhotoPreview.src = currentUser.photo;
                } else {
                    // Generate avatar with initials
                    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
                    const canvas = document.createElement('canvas');
                    canvas.width = 200;
                    canvas.height = 200;
                    const ctx = canvas.getContext('2d');
                    
                    // Draw background
                    ctx.fillStyle = '#e11d48';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw text
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 100px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(initials, canvas.width/2, canvas.height/2);
                    
                    profilePhotoPreview.src = canvas.toDataURL('image/png');
                }
                
                profileModal.classList.remove('hidden');
                dropdownMenu.classList.add('hidden');
                mobileMenu.classList.add('hidden');
            }
        }
        
        viewProfileBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            showProfileModal();
        });
        
        mobileViewProfileBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            showProfileModal();
        });
        
        // Close Profile Modal
        closeProfileBtn.addEventListener('click', () => {
            profileModal.classList.add('hidden');
            changePasswordSection.classList.add('hidden');
        });
        
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.classList.add('hidden');
                changePasswordSection.classList.add('hidden');
            }
        });
        
        // Profile Photo Upload
        profilePhotoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePhotoPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Toggle Change Password Section
        changePasswordBtn.addEventListener('click', () => {
            changePasswordSection.classList.toggle('hidden');
            oldPassword.value = '';
            newPassword.value = '';
            repeatPassword.value = '';
            passwordError.classList.add('hidden');
        });
        
        // Save Password
        savePasswordBtn.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Validate
            if (!oldPassword.value || !newPassword.value || !repeatPassword.value) {
                passwordError.textContent = 'Please fill in all password fields';
                passwordError.classList.remove('hidden');
                return;
            }
            
            if (oldPassword.value !== currentUser.password) {
                passwordError.textContent = 'Old password is incorrect';
                passwordError.classList.remove('hidden');
                return;
            }
            
            if (newPassword.value !== repeatPassword.value) {
                passwordError.textContent = 'New passwords do not match';
                passwordError.classList.remove('hidden');
                return;
            }
            
            // Update password
            currentUser.password = newPassword.value;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update users array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword.value;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            // Update UI
            const passwordLength = currentUser.password.length;
            const lastThree = currentUser.password.slice(-3);
            const maskedPart = '*'.repeat(passwordLength - 3);
            maskedPassword.textContent = maskedPart + lastThree;
            
            // Hide section and show success
            changePasswordSection.classList.add('hidden');
            alert('Password updated successfully');
        });
        
        // Save Profile
        saveProfileBtn.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Update name
            currentUser.name = profileNameInput.value;
            
            // Update photo
            currentUser.photo = profilePhotoPreview.src;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update users array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].name = currentUser.name;
                users[userIndex].photo = currentUser.photo;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            // Update UI
            profileModal.classList.add('hidden');
            updateUserInterface();
            alert('Profile updated successfully');
        });
        
        // Category Filter
        const categoryFilter = document.getElementById('categoryFilter');
        const courseCards = document.querySelectorAll('.course-card');
        
        categoryFilter.addEventListener('change', () => {
            const selectedCategory = categoryFilter.value;
            
            courseCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
        
        // Update UI based on login status
        function updateUserInterface() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (currentUser) {
                // User is logged in
                loginBtn.classList.add('hidden');
                mobileLoginBtn.classList.add('hidden');
                profileDropdown.classList.remove('hidden');
                mobileProfileDropdown.classList.remove('hidden');
                mobileProfileMenu.classList.remove('hidden');
                profileName.textContent = currentUser.name;
                mobileProfileName.textContent = currentUser.name;
                
                // Set avatar
                if (currentUser.photo) {
                    avatarImg.src = currentUser.photo;
                    mobileAvatarImg.src = currentUser.photo;
                } else {
                    // Generate avatar with initials
                    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
                    const canvas = document.createElement('canvas');
                    canvas.width = 200;
                    canvas.height = 200;
                    const ctx = canvas.getContext('2d');
                    
                    // Draw background
                    ctx.fillStyle = '#e11d48';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw text
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 100px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(initials, canvas.width/2, canvas.height/2);
                    
                    const avatarDataUrl = canvas.toDataURL('image/png');
                    avatarImg.src = avatarDataUrl;
                    mobileAvatarImg.src = avatarDataUrl;
                }
            } else {
                // User is logged out
                loginBtn.classList.remove('hidden');
                mobileLoginBtn.classList.remove('hidden');
                profileDropdown.classList.add('hidden');
                mobileProfileDropdown.classList.add('hidden');
                mobileProfileMenu.classList.add('hidden');
            }
        }
        
        // Check login status on page load
        document.addEventListener('DOMContentLoaded', updateUserInterface);
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileBtn?.contains(e.target) && !dropdownMenu?.contains(e.target)) {
                dropdownMenu?.classList.add('hidden');
            }
            
            if (!mobileProfileBtn?.contains(e.target) && !mobileMenu?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
                mobileProfileMenu?.classList.add('hidden');
            }
        });
    