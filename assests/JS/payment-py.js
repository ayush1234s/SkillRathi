
        // DOM Elements
        const payHereBtn = document.getElementById('payHereBtn');
        const userDetailsModal = document.getElementById('userDetailsModal');
        const userDetailsForm = document.getElementById('userDetailsForm');
        const closeUserDetailsBtn = document.getElementById('closeUserDetailsBtn');
        const proceedToPayBtn = document.getElementById('proceedToPayBtn');
        const paymentModal = document.getElementById('paymentModal');
        const paymentForm = document.getElementById('paymentForm');
        const qrCodeContainer = document.getElementById('qrCodeContainer');
        const transactionSuccess = document.getElementById('transactionSuccess');
        const timerElement = document.getElementById('timer');
        const closePaymentSuccessBtn = document.getElementById('closePaymentSuccessBtn');
        
        // Auth Modal Elements
        const authModal = document.getElementById('authModal');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const showSignupBtn = document.getElementById('showSignupBtn');
        const showLoginBtn = document.getElementById('showLoginBtn');
        const loginSubmitBtn = document.getElementById('loginSubmitBtn');
        const signupSubmitBtn = document.getElementById('signupSubmitBtn');
        const loginError = document.getElementById('loginError');
        const signupError = document.getElementById('signupError');
        
        // Profile Elements
        const profileDropdown = document.getElementById('profileDropdown');
        const mobileProfileDropdown = document.getElementById('mobileProfileDropdown');
        const profileBtn = document.getElementById('profileBtn');
        const mobileProfileBtn = document.getElementById('mobileProfileBtn');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const viewProfileBtn = document.getElementById('viewProfileBtn');
        const mobileViewProfileBtn = document.getElementById('mobileViewProfileBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
        const profileModal = document.getElementById('profileModal');
        const closeProfileBtn = document.getElementById('closeProfileBtn');
        
        // Mobile Menu Elements
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileProfileMenu = document.getElementById('mobileProfileMenu');
        
        // Assignment and Lab File Elements
        const assignmentCheckbox = document.getElementById('assignmentCheckbox');
        const assignmentDetails = document.getElementById('assignmentDetails');
        const addAssignmentBtn = document.getElementById('addAssignmentBtn');
        const assignmentTable = document.getElementById('assignmentTable');
        const assignmentTableBody = document.getElementById('assignmentTableBody');
        
        const labFileCheckbox = document.getElementById('labFileCheckbox');
        const labFileDetails = document.getElementById('labFileDetails');
        const addLabBtn = document.getElementById('addLabBtn');
        const labTable = document.getElementById('labTable');
        const labTableBody = document.getElementById('labTableBody');
        
        // Arrays to store assignments and lab files
        let assignments = [];
        let labFiles = [];
        
        // Check if user is logged in
        function isLoggedIn() {
            return localStorage.getItem('fearlessUser') !== null;
        }
        
        // Show login form
        function showLoginForm() {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            authModal.classList.remove('hidden');
        }
        
        // Show signup form
        function showSignupForm() {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            authModal.classList.remove('hidden');
        }
        
        // Update UI based on login status
        function updateUIForUser() {
            if (isLoggedIn()) {
                const user = JSON.parse(localStorage.getItem('fearlessUser'));
                
                // Update desktop UI
                loginBtn.classList.add('hidden');
                profileDropdown.classList.remove('hidden');
                document.getElementById('profileName').textContent = user.name;
                document.getElementById('avatarImg').src = user.profilePhoto || '/placeholder.svg?height=40&width=40';
                
                // Update mobile UI
                mobileLoginBtn.classList.add('hidden');
                mobileProfileDropdown.classList.remove('hidden');
                document.getElementById('mobileProfileName').textContent = user.name;
                document.getElementById('mobileAvatarImg').src = user.profilePhoto || '/placeholder.svg?height=40&width=40';
                
                // Update profile modal
                document.getElementById('profileFullName').textContent = user.name;
                document.getElementById('profileNameInput').value = user.name;
                document.getElementById('profileEmailInput').value = user.email;
                document.getElementById('maskedPassword').textContent = '••••••••';
                document.getElementById('profilePhotoPreview').src = user.profilePhoto || '/placeholder.svg?height=100&width=100';
                
                // Pre-fill user details form
                document.getElementById('detailsFullName').value = user.name;
                document.getElementById('detailsEmail').value = user.email;
            } else {
                // Update desktop UI
                loginBtn.classList.remove('hidden');
                profileDropdown.classList.add('hidden');
                
                // Update mobile UI
                mobileLoginBtn.classList.remove('hidden');
                mobileProfileDropdown.classList.add('hidden');
            }
        }
        
        // Generate QR Code
        function generateQRCode(text) {
            const qrCodeContainer = document.getElementById('qrCode');
            qrCodeContainer.innerHTML = '';
            
            // Create QR code
            const qr = qrcode(0, 'M');
            qr.addData(text);
            qr.make();
            
            // Append QR code to container
            qrCodeContainer.innerHTML = qr.createImgTag(5);
        }
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            updateUIForUser();
        });
        
        // Pay Here Button Click
        payHereBtn.addEventListener('click', function() {
            if (isLoggedIn()) {
                userDetailsModal.classList.remove('hidden');
            } else {
                showLoginForm();
            }
        });
        
        // Close User Details Modal
        closeUserDetailsBtn.addEventListener('click', function() {
            userDetailsModal.classList.add('hidden');
        });
        
        // Assignment Checkbox Change
        assignmentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                assignmentDetails.classList.remove('hidden');
            } else {
                assignmentDetails.classList.add('hidden');
            }
        });
        
        // Lab File Checkbox Change
        labFileCheckbox.addEventListener('change', function() {
            if (this.checked) {
                labFileDetails.classList.remove('hidden');
            } else {
                labFileDetails.classList.add('hidden');
            }
        });
        
        // Add Assignment Button Click
        addAssignmentBtn.addEventListener('click', function() {
            const subject = document.getElementById('assignmentSubject').value;
            const chapters = document.getElementById('assignmentChapters').value;
            const year = document.getElementById('assignmentYear').value;
            const semester = document.getElementById('assignmentSemester').value;
            
            if (!subject || !chapters || !year || !semester) {
                alert('Please fill in all assignment fields');
                return;
            }
            
            // Add to assignments array
            assignments.push({
                subject,
                chapters,
                year,
                semester
            });
            
            // Update table
            updateAssignmentTable();
            
            // Clear form fields
            document.getElementById('assignmentSubject').value = '';
            document.getElementById('assignmentChapters').value = '';
            document.getElementById('assignmentYear').value = '';
            document.getElementById('assignmentSemester').value = '';
        });
        
        // Update Assignment Table
        function updateAssignmentTable() {
            assignmentTableBody.innerHTML = '';
            
            if (assignments.length > 0) {
                assignmentTable.classList.remove('hidden');
                
                assignments.forEach((assignment, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="py-2 px-4 border-b">${assignment.subject}</td>
                        <td class="py-2 px-4 border-b">${assignment.chapters}</td>
                        <td class="py-2 px-4 border-b">${assignment.year}${getOrdinal(assignment.year)} Year</td>
                        <td class="py-2 px-4 border-b">${assignment.semester}${getOrdinal(assignment.semester)} Semester</td>
                        <td class="py-2 px-4 border-b">
                            <button type="button" class="text-red-500 hover:text-red-700" onclick="removeAssignment(${index})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    `;
                    assignmentTableBody.appendChild(row);
                });
            } else {
                assignmentTable.classList.add('hidden');
            }
        }
        
        // Remove Assignment
        window.removeAssignment = function(index) {
            assignments.splice(index, 1);
            updateAssignmentTable();
        };
        
        // Add Lab File Button Click
        addLabBtn.addEventListener('click', function() {
            const subject = document.getElementById('labSubject').value;
            const experiments = document.getElementById('labExperiments').value;
            const year = document.getElementById('labYear').value;
            const semester = document.getElementById('labSemester').value;
            
            if (!subject || !experiments || !year || !semester) {
                alert('Please fill in all lab file fields');
                return;
            }
            
            // Add to lab files array
            labFiles.push({
                subject,
                experiments,
                year,
                semester
            });
            
            // Update table
            updateLabTable();
            
            // Clear form fields
            document.getElementById('labSubject').value = '';
            document.getElementById('labExperiments').value = '';
            document.getElementById('labYear').value = '';
            document.getElementById('labSemester').value = '';
        });
        
        // Update Lab Table
        function updateLabTable() {
            labTableBody.innerHTML = '';
            
            if (labFiles.length > 0) {
                labTable.classList.remove('hidden');
                
                labFiles.forEach((lab, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="py-2 px-4 border-b">${lab.subject}</td>
                        <td class="py-2 px-4 border-b">${lab.experiments}</td>
                        <td class="py-2 px-4 border-b">${lab.year}${getOrdinal(lab.year)} Year</td>
                        <td class="py-2 px-4 border-b">${lab.semester}${getOrdinal(lab.semester)} Semester</td>
                        <td class="py-2 px-4 border-b">
                            <button type="button" class="text-red-500 hover:text-red-700" onclick="removeLab(${index})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    `;
                    labTableBody.appendChild(row);
                });
            } else {
                labTable.classList.add('hidden');
            }
        }
        
        // Remove Lab File
        window.removeLab = function(index) {
            labFiles.splice(index, 1);
            updateLabTable();
        };
        
        // Get ordinal suffix (1st, 2nd, 3rd, etc.)
        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return (s[(v - 20) % 10] || s[v] || s[0]);
        }
        
        // User Details Form Submit
        userDetailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const fullName = document.getElementById('detailsFullName').value;
            const email = document.getElementById('detailsEmail').value;
            const phone = document.getElementById('detailsPhone').value;
            const gender = document.getElementById('detailsGender').value;
            
            if (!fullName || !email || !phone || !gender) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check if at least one service is selected
            if (!assignmentCheckbox.checked && !labFileCheckbox.checked && !document.getElementById('graphicDesignCheckbox').checked) {
                alert('Please select at least one service');
                return;
            }
            
            // Store user details for receipt
            const paymentDetails = {
                fullName,
                email,
                phone,
                gender,
                assignments: assignmentCheckbox.checked ? assignments : [],
                labFiles: labFileCheckbox.checked ? labFiles : [],
                graphicDesign: document.getElementById('graphicDesignCheckbox').checked,
                paymentDate: new Date().toLocaleDateString(),
                paymentTime: new Date().toLocaleTimeString()
            };
            
            localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
            
            // Close user details modal and open payment modal
            userDetailsModal.classList.add('hidden');
            paymentModal.classList.remove('hidden');
            
            // Start timer
            startTimer(10 * 60); // 10 minutes
        });
        
        // Payment Form Submit
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.getElementById('paymentAmount').value;
            
            if (!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            // Store amount for receipt
            const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
            paymentDetails.amount = amount;
            paymentDetails.upiAddress = "7895896594@ptyes";
            localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
            
            // Check if desktop or mobile
            if (window.innerWidth >= 768) {
                // Desktop - show QR code
                qrCodeContainer.classList.remove('hidden');
                document.getElementById('payBtn').textContent = "I've completed the payment";
                
                // Generate QR code with UPI ID and amount
                const upiPaymentString = `upi://pay?pa=7895896594@ptyes&pn=FearlessAssignments&am=${amount}&cu=INR`;
                generateQRCode(upiPaymentString);
            } else {
                // Mobile - redirect to payment app
                const upiPaymentString = `upi://pay?pa=7895896594@ptyes&pn=FearlessAssignments&am=${amount}&cu=INR`;
                window.location.href = upiPaymentString;
            }
            
            // Simulate payment completion after 1 minute
            setTimeout(function() {
                document.getElementById('paymentForm').classList.add('hidden');
                qrCodeContainer.classList.add('hidden');
                transactionSuccess.classList.remove('hidden');
            }, 120000); // 1 minute
        });
        
        // Close Payment Success
        closePaymentSuccessBtn.addEventListener('click', function() {
            paymentModal.classList.add('hidden');
        });
        
        // Timer function
        function startTimer(duration) {
            let timer = duration;
            let minutes, seconds;
            
            const interval = setInterval(function() {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                
                timerElement.textContent = minutes + ":" + seconds;
                
                if (--timer < 0) {
                    clearInterval(interval);
                    alert("Payment session expired. Please try again.");
                    paymentModal.classList.add('hidden');
                }
            }, 1000);
        }
        
        // Login and Signup Event Listeners
        loginBtn.addEventListener('click', showLoginForm);
        mobileLoginBtn.addEventListener('click', showLoginForm);
        showSignupBtn.addEventListener('click', showSignupForm);
        showLoginBtn.addEventListener('click', showLoginForm);
        
        // Login Submit
        loginSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation
            if (!email || !password) {
                loginError.textContent = "Please enter both email and password.";
                loginError.classList.remove('hidden');
                return;
            }
            
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('fearlessUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store logged in user
                localStorage.setItem('fearlessUser', JSON.stringify({
                    name: user.name,
                    email: user.email,
                    profilePhoto: user.profilePhoto || null
                }));
                
                // Update UI
                updateUIForUser();
                
                // Close modal
                authModal.classList.add('hidden');
                
                // Open user details modal if coming from pay here button
                if (document.activeElement === payHereBtn) {
                    userDetailsModal.classList.remove('hidden');
                }
            } else {
                loginError.textContent = "Invalid email or password.";
                loginError.classList.remove('hidden');
            }
        });
        
        // Signup Submit
        signupSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            // Simple validation
            if (!name || !email || !password) {
                signupError.textContent = "Please fill in all fields.";
                signupError.classList.remove('hidden');
                return;
            }
            
            // Get existing users or create empty array
            const users = JSON.parse(localStorage.getItem('fearlessUsers') || '[]');
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                signupError.textContent = "Email already registered. Please login.";
                signupError.classList.remove('hidden');
                return;
            }
            
            // Add new user
            users.push({
                name,
                email,
                password,
                profilePhoto: null
            });
            
            // Save users
            localStorage.setItem('fearlessUsers', JSON.stringify(users));
            
            // Store logged in user
            localStorage.setItem('fearlessUser', JSON.stringify({
                name,
                email,
                profilePhoto: null
            }));
            
            // Update UI
            updateUIForUser();
            
            // Close modal
            authModal.classList.add('hidden');
            
            // Open user details modal if coming from pay here button
            if (document.activeElement === payHereBtn) {
                userDetailsModal.classList.remove('hidden');
            }
        });
        
        // Profile Dropdown Toggle
        profileBtn.addEventListener('click', function() {
            dropdownMenu.classList.toggle('hidden');
        });
        
        // Mobile Profile Button
        mobileProfileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileProfileMenu.classList.toggle('hidden');
        });
        
        // View Profile
        viewProfileBtn.addEventListener('click', function() {
            dropdownMenu.classList.add('hidden');
            profileModal.classList.remove('hidden');
        });
        
        mobileViewProfileBtn.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            profileModal.classList.remove('hidden');
        });
        
        // Close Profile Modal
        closeProfileBtn.addEventListener('click', function() {
            profileModal.classList.add('hidden');
        });
        
        // Logout
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('fearlessUser');
            updateUIForUser();
            dropdownMenu.classList.add('hidden');
        });
        
        mobileLogoutBtn.addEventListener('click', function() {
            localStorage.removeItem('fearlessUser');
            updateUIForUser();
            mobileMenu.classList.add('hidden');
        });
        
        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Profile Photo Upload
        document.getElementById('profilePhotoUpload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const photoUrl = event.target.result;
                    document.getElementById('profilePhotoPreview').src = photoUrl;
                    
                    // Store the photo URL for later saving
                    document.getElementById('profilePhotoPreview').dataset.newPhoto = photoUrl;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Save Profile
        document.getElementById('saveProfileBtn').addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('fearlessUser'));
            const newName = document.getElementById('profileNameInput').value;
            const newPhotoUrl = document.getElementById('profilePhotoPreview').dataset.newPhoto;
            
            // Update user data
            user.name = newName;
            if (newPhotoUrl) {
                user.profilePhoto = newPhotoUrl;
            }
            
            // Save updated user
            localStorage.setItem('fearlessUser', JSON.stringify(user));
            
            // Update users array
            const users = JSON.parse(localStorage.getItem('fearlessUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === user.email);
            if (userIndex !== -1) {
                users[userIndex].name = newName;
                if (newPhotoUrl) {
                    users[userIndex].profilePhoto = newPhotoUrl;
                }
                localStorage.setItem('fearlessUsers', JSON.stringify(users));
            }
            
            // Update UI
            updateUIForUser();
            
            // Close modal
            profileModal.classList.add('hidden');
        });
        
        // Change Password Toggle
        document.getElementById('changePasswordBtn').addEventListener('click', function() {
            const changePasswordSection = document.getElementById('changePasswordSection');
            changePasswordSection.classList.toggle('hidden');
        });
        
        // Save Password
        document.getElementById('savePasswordBtn').addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('fearlessUser'));
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const repeatPassword = document.getElementById('repeatPassword').value;
            const passwordError = document.getElementById('passwordError');
            
            // Get users array
            const users = JSON.parse(localStorage.getItem('fearlessUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === user.email);
            
            // Validate old password
            if (users[userIndex].password !== oldPassword) {
                passwordError.textContent = "Current password is incorrect.";
                passwordError.classList.remove('hidden');
                return;
            }
            
            // Validate new password
            if (newPassword !== repeatPassword) {
                passwordError.textContent = "New passwords do not match.";
                passwordError.classList.remove('hidden');
                return;
            }
            
            // Update password
            users[userIndex].password = newPassword;
            localStorage.setItem('fearlessUsers', JSON.stringify(users));
            
            // Hide password section and show success
            document.getElementById('changePasswordSection').classList.add('hidden');
            alert("Password updated successfully!");
        });
    