
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const payHereBtn = document.getElementById('payHereBtn');
    const userDetailsModal = document.getElementById('userDetailsModal');
    const closeUserDetailsBtn = document.getElementById('closeUserDetailsBtn');
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentSuccessBtn = document.getElementById('closePaymentSuccessBtn');
    const proceedToPayBtn = document.getElementById('proceedToPayBtn');
    const submitFormBtn = document.getElementById('submitFormBtn');
    const form = document.getElementById('form');
    const result = document.getElementById('result');
    const paymentForm = document.getElementById('paymentForm');
    const transactionSuccess = document.getElementById('transactionSuccess');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCode = document.getElementById('qrCode');
    const timer = document.getElementById('timer');
    const upiAddress = document.getElementById('upiAddress');
    const payBtn = document.getElementById('payBtn');
    
    // Checkbox elements
    const assignmentCheckbox = document.getElementById('assignmentCheckbox');
    const labFileCheckbox = document.getElementById('labFileCheckbox');
    const graphicDesignCheckbox = document.getElementById('graphicDesignCheckbox');
    
    // Assignment elements
    const assignmentDetails = document.getElementById('assignmentDetails');
    const assignmentSubject = document.getElementById('assignmentSubject');
    const assignmentChapters = document.getElementById('assignmentChapters');
    const assignmentYear = document.getElementById('assignmentYear');
    const assignmentSemester = document.getElementById('assignmentSemester');
    const addAssignmentBtn = document.getElementById('addAssignmentBtn');
    const assignmentTable = document.getElementById('assignmentTable');
    const assignmentTableBody = document.getElementById('assignmentTableBody');
    
    // Lab file elements
    const labFileDetails = document.getElementById('labFileDetails');
    const labSubject = document.getElementById('labSubject');
    const labExperiments = document.getElementById('labExperiments');
    const labYear = document.getElementById('labYear');
    const labSemester = document.getElementById('labSemester');
    const addLabBtn = document.getElementById('addLabBtn');
    const labTable = document.getElementById('labTable');
    const labTableBody = document.getElementById('labTableBody');
    
    // UPI addresses
    const upiAddresses = [
        'fearlessassignments@okhdfcbank',
        'fearlessassignments@ybl',
        'fearlessassignments@axl'
    ];
    
    // Set random UPI address
    upiAddress.value = upiAddresses[Math.floor(Math.random() * upiAddresses.length)];
    
    // Open user details modal when Pay Now button is clicked
    payHereBtn.addEventListener('click', function() {
        userDetailsModal.classList.remove('hidden');
    });
    
    // Close user details modal
    closeUserDetailsBtn.addEventListener('click', function() {
        userDetailsModal.classList.add('hidden');
    });
    
    // Close payment success and modal
    closePaymentSuccessBtn.addEventListener('click', function() {
        transactionSuccess.classList.add('hidden');
        paymentModal.classList.add('hidden');
    });
    
    // Toggle assignment details
    assignmentCheckbox.addEventListener('change', function() {
        if (this.checked) {
            assignmentDetails.classList.remove('hidden');
        } else {
            assignmentDetails.classList.add('hidden');
            assignmentTable.classList.add('hidden');
            assignmentTableBody.innerHTML = '';
        }
    });
    
    // Toggle lab file details
    labFileCheckbox.addEventListener('change', function() {
        if (this.checked) {
            labFileDetails.classList.remove('hidden');
        } else {
            labFileDetails.classList.add('hidden');
            labTable.classList.add('hidden');
            labTableBody.innerHTML = '';
        }
    });
    
    // Add assignment to table
    addAssignmentBtn.addEventListener('click', function() {
        if (!assignmentSubject.value || !assignmentChapters.value || !assignmentYear.value || !assignmentSemester.value) {
            alert('Please fill all assignment details');
            return;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b">${assignmentSubject.value}</td>
            <td class="py-2 px-4 border-b">${assignmentChapters.value}</td>
            <td class="py-2 px-4 border-b">${assignmentYear.options[assignmentYear.selectedIndex].text}</td>
            <td class="py-2 px-4 border-b">${assignmentSemester.options[assignmentSemester.selectedIndex].text}</td>
            <td class="py-2 px-4 border-b">
                <button class="text-red-500 hover:text-red-700 delete-assignment">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        assignmentTableBody.appendChild(row);
        assignmentTable.classList.remove('hidden');
        
        // Clear inputs
        assignmentSubject.value = '';
        assignmentChapters.value = '';
        assignmentYear.value = '';
        assignmentSemester.value = '';
        
        // Add event listener to delete button
        row.querySelector('.delete-assignment').addEventListener('click', function() {
            row.remove();
            if (assignmentTableBody.children.length === 0) {
                assignmentTable.classList.add('hidden');
            }
        });
    });
    
    // Add lab file to table
    addLabBtn.addEventListener('click', function() {
        if (!labSubject.value || !labExperiments.value || !labYear.value || !labSemester.value) {
            alert('Please fill all lab file details');
            return;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b">${labSubject.value}</td>
            <td class="py-2 px-4 border-b">${labExperiments.value}</td>
            <td class="py-2 px-4 border-b">${labYear.options[labYear.selectedIndex].text}</td>
            <td class="py-2 px-4 border-b">${labSemester.options[labSemester.selectedIndex].text}</td>
            <td class="py-2 px-4 border-b">
                <button class="text-red-500 hover:text-red-700 delete-lab">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        labTableBody.appendChild(row);
        labTable.classList.remove('hidden');
        
        // Clear inputs
        labSubject.value = '';
        labExperiments.value = '';
        labYear.value = '';
        labSemester.value = '';
        
        // Add event listener to delete button
        row.querySelector('.delete-lab').addEventListener('click', function() {
            row.remove();
            if (labTableBody.children.length === 0) {
                labTable.classList.add('hidden');
            }
        });
    });
    
    // Web3Forms submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if at least one service is selected
        if (!assignmentCheckbox.checked && !labFileCheckbox.checked && !graphicDesignCheckbox.checked) {
            alert('Please select at least one service');
            return;
        }
        
        // Check if assignment details are complete if assignment is selected
        if (assignmentCheckbox.checked && assignmentTableBody.children.length === 0) {
            alert('Please add at least one assignment');
            return;
        }
        
        // Check if lab file details are complete if lab file is selected
        if (labFileCheckbox.checked && labTableBody.children.length === 0) {
            alert('Please add at least one lab file');
            return;
        }
        
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Please wait..."
        result.style.display = "block";
        result.className = ""; // Clear previous classes
        result.classList.add("success");

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                result.className = "";
                result.classList.add("success");
                
                // Enable proceed to pay button
                proceedToPayBtn.disabled = false;
                proceedToPayBtn.classList.remove("opacity-50", "cursor-not-allowed");
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.className = "";
                result.classList.add("error");
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.className = "";
            result.classList.add("error");
        })
        .then(function() {
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
    });
    
    // Proceed to payment
    proceedToPayBtn.addEventListener('click', function() {
        userDetailsModal.classList.add('hidden');
        paymentModal.classList.remove('hidden');
        startTimer();
    });
    
    // Payment form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('paymentAmount').value;
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Generate QR code
        const qr = qrcode(0, 'L');
        qr.addData(`upi://pay?pa=${upiAddress.value}&pn=Fearless%20Assignments&am=${amount}&cu=INR`);
        qr.make();
        qrCode.innerHTML = qr.createImgTag(4);
        qrCodeContainer.classList.remove('hidden');
        
        // Simulate payment processing
        setTimeout(function() {
            qrCodeContainer.classList.add('hidden');
            paymentForm.classList.add('hidden');
            transactionSuccess.classList.remove('hidden');
            clearInterval(timerInterval);
        }, 120000);
    });
    
    // Timer functionality
    let timerInterval;
    function startTimer() {
        let minutes = 10;
        let seconds = 0;
        
        timerInterval = setInterval(function() {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
});
