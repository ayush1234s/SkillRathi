
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const buyNowBtn = document.getElementById('buyNowBtn');
    const userInfoModal = document.getElementById('userInfoModal');
    const paymentModal = document.getElementById('paymentModal');
    const userInfoForm = document.getElementById('userInfoForm');
    const paymentForm = document.getElementById('paymentForm');
    const transactionSuccess = document.getElementById('transactionSuccess');
    const transactionFailed = document.getElementById('transactionFailed');
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    const retryPaymentBtn = document.getElementById('retryPaymentBtn');
    const payBtn = document.getElementById('payBtn');
    const result = document.getElementById('result');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponCode = document.getElementById('couponCode');
    const couponMessage = document.getElementById('couponMessage');
    const discountRow = document.getElementById('discountRow');
    const totalPrice = document.getElementById('totalPrice');
    const modalTotalPrice = document.getElementById('modalTotalPrice');
    const paymentAmount = document.getElementById('paymentAmount');
    const formAmount = document.getElementById('formAmount');
    const upiPayContainer = document.getElementById('upiPayContainer');
    const openUpiAppBtn = document.getElementById('openUpiAppBtn');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const alreadyPurchasedPopup = document.getElementById('alreadyPurchasedPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popupName = document.getElementById('popupName');
    const popupEmail = document.getElementById('popupEmail');
    const popupAmount = document.getElementById('popupAmount');
    const paymentNote = document.getElementById('paymentNote');
    const purchaseStatus = document.getElementById('purchaseStatus');
    const couponApplied = document.getElementById('couponApplied');
    
    // Check if user already purchased the course
    function checkPurchaseStatus() {
        const purchaseData = localStorage.getItem('cyberSecurityPurchase');
        if (purchaseData) {
            return JSON.parse(purchaseData);
        }
        return null;
    }
    
    // Check and update purchase status on page load
    const purchaseData = checkPurchaseStatus();
    if (purchaseData) {
        buyNowBtn.textContent = "Access Course";
        purchaseStatus.classList.remove('hidden');
    }
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Toggle module content
    window.toggleModule = function(moduleHeader) {
        const moduleContent = moduleHeader.nextElementSibling;
        const chevron = moduleHeader.querySelector('i');
        
        if (moduleContent.classList.contains('hidden')) {
            moduleContent.classList.remove('hidden');
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        } else {
            moduleContent.classList.add('hidden');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    }
    
    // Valid coupon codes with flat ₹500 discount
    const validCoupons = [
        'CYBER500', 
        'SKILLC500',
        'INDIA500',
        'CYBERI500',
        'RATH500'
    ];
    
    // Check if device is mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Generate QR Code
    function generateQRCode(amount) {
        const qrCodeContainer = document.getElementById('qrcode');
        qrCodeContainer.innerHTML = '';
        
        // Create QR code for UPI payment
        const upiId = "7895896594@ptyes";
        const merchantName = "Skill Rathi";
        const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR`;
        
        // Generate QR code
        const qr = qrcode(0, 'L');
        qr.addData(upiLink);
        qr.make();
        qrCodeContainer.innerHTML = qr.createImgTag(5);
    }
    
    // Calculate total price
    function calculateTotalPrice(basePrice, hasDiscount) {
        const tax = basePrice * 0.00; // 5% tax
        let totalPrice = basePrice + tax;
        
        if (hasDiscount) {
            totalPrice -= 500; // Flat ₹500 discount
        }
        
        return {
            basePrice: basePrice,
            tax: tax,
            discount: hasDiscount ? 500 : 0,
            total: totalPrice
        };
    }
    
    // Update price displays
    function updatePriceDisplays(priceInfo, hasDiscount) {
        // Update discount row visibility
        if (hasDiscount) {
            discountRow.classList.remove('hidden');
            couponApplied.value = "Yes";
        } else {
            discountRow.classList.add('hidden');
            couponApplied.value = "No";
        }
        
        // Update total price displays
        totalPrice.textContent = `₹${priceInfo.total.toFixed(2)}`;
        modalTotalPrice.textContent = `₹${priceInfo.total.toFixed(2)}`;
        paymentAmount.textContent = `₹${priceInfo.total.toFixed(2)}`;
        formAmount.value = priceInfo.total.toFixed(2);
    }
    
    // Apply coupon code
    applyCouponBtn.addEventListener('click', function() {
        const code = couponCode.value.trim().toUpperCase();
        
        if (code === '') {
            showCouponMessage('Please enter a coupon code', false);
            return;
        }
        
        if (validCoupons.includes(code)) {
            // Apply ₹500 discount
            const priceInfo = calculateTotalPrice(2499, true);
            updatePriceDisplays(priceInfo, true);
            
            showCouponMessage('Coupon applied successfully! Flat ₹500 discount added.', true);
        } else {
            showCouponMessage('Invalid coupon code', false);
        }
    });
    
    function showCouponMessage(message, isSuccess) {
        couponMessage.textContent = message;
        couponMessage.classList.remove('hidden');
        if (isSuccess) {
            couponMessage.classList.remove('text-red-600');
            couponMessage.classList.add('text-green-600');
        } else {
            couponMessage.classList.remove('text-green-600');
            couponMessage.classList.add('text-red-600');
        }
    }
    
    // Open user info modal when Buy Now is clicked
    buyNowBtn.addEventListener('click', function() {
        // Check if user already purchased the course
        const purchaseData = checkPurchaseStatus();
        if (purchaseData) {
            // Show already purchased popup or redirect to enrolled courses
            if (buyNowBtn.textContent === "Access Course") {
                window.location.href = "enrolled-courses.html";
            } else {
                popupName.textContent = purchaseData.name;
                popupEmail.textContent = purchaseData.email;
                popupAmount.textContent = purchaseData.amount;
                alreadyPurchasedPopup.classList.remove('hidden');
            }
        } else {
            userInfoModal.classList.remove('hidden');
        }
    });

    // Close User Info Modal
    const closeUserInfoModal = document.getElementById('closeUserInfoModal');
    const cancelBtn = document.getElementById('cancelBtn');

    function closeModal() {
        userInfoModal.classList.add('hidden');
    }

    closeUserInfoModal.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    userInfoModal.addEventListener('click', function(e) {
        if (e.target === userInfoModal) {
            closeModal();
        }
    });
    
    // Close already purchased popup
    closePopupBtn.addEventListener('click', function() {
        alreadyPurchasedPopup.classList.add('hidden');
    });
    
    // Submit user information form
    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(userInfoForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Please wait..."
        result.style.display = "block";
        result.className = "";
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
                result.innerHTML = "Details submitted successfully! Redirecting to payment...";
                result.className = "";
                result.classList.add("success");
                
                setTimeout(() => {
                    userInfoModal.classList.add('hidden');
                    paymentModal.classList.remove('hidden');
                    
                    // Generate QR code with the amount
                    const amount = paymentAmount.textContent.replace('₹', '');
                    generateQRCode(amount);
                    
                    // Show appropriate payment option based on device
                    if (isMobile()) {
                        qrCodeContainer.classList.add('hidden');
                        upiPayContainer.classList.remove('hidden');
                        payBtn.classList.add('hidden');
                        paymentNote.classList.add('hidden');
                    } else {
                        qrCodeContainer.classList.remove('hidden');
                        upiPayContainer.classList.add('hidden');
                        payBtn.classList.remove('hidden');
                        paymentNote.classList.remove('hidden');
                        
                        // Enable pay button after 2 minutes
                        setTimeout(() => {
                            payBtn.disabled = false;
                            paymentNote.textContent = "Payment button is now enabled. Click PAY to complete your purchase.";
                        }, 120000); // 2 minutes = 120000 milliseconds
                    }
                }, 2000);
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
        });
    });
    
    // Open UPI app on mobile
    openUpiAppBtn.addEventListener('click', function() {
        const amount = paymentAmount.textContent.replace('₹', '');
        const upiLink = `upi://pay?pa=7895896594@ptyes&pn=Fearless%20Assignments&am=${amount}&cu=INR`;
        
        // Try to open UPI app
        window.location.href = upiLink;
        
        // Fallback if UPI app not installed
        setTimeout(function() {
            window.open(`https://upi.link/pay?pa=7895896594@ptyes&pn=Fearless%20Assignments&am=${amount}&cu=INR`, '_blank');
        }, 500);
        
        // Listen for payment status when user returns to the page
        window.addEventListener('focus', function() {
            // In a real implementation, you would check payment status with your backend
            // For demo purposes, we'll assume payment was successful
            showPaymentSuccess();
        }, { once: true });
    });
    
    // Show payment success
    function showPaymentSuccess() {
        paymentForm.classList.add('hidden');
        transactionSuccess.classList.remove('hidden');
        transactionFailed.classList.add('hidden');
        
        // Store user data in localStorage for receipt and purchase status
        const userData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            college: document.getElementById('college').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            course: "Cyber Security Full Course",
            amount: paymentAmount.textContent,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: new Date().toLocaleTimeString('en-IN'),
            transactionId: 'TXN' + Math.floor(Math.random() * 1000000000),
            couponApplied: couponApplied.value
        };
        localStorage.setItem('receiptData', JSON.stringify(userData));
        
        // Store purchase status
        localStorage.setItem('cyberSecurityPurchase', JSON.stringify({
            name: userData.name,
            email: userData.email,
            amount: userData.amount,
            date: userData.date
        }));
    }
    
    // Show payment failure
    function showPaymentFailure() {
        paymentForm.classList.add('hidden');
        transactionSuccess.classList.add('hidden');
        transactionFailed.classList.remove('hidden');
    }
    
    // Simulate payment
    payBtn.addEventListener('click', function() {
        // Show processing state
        payBtn.disabled = true;
        payBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        
        // Simulate payment processing (5 seconds for demo)
        setTimeout(function() {
            // Randomly determine if payment was successful or failed (for demo purposes)
            const isSuccessful = Math.random() > 0.3; // 70% chance of success
            
            if (isSuccessful) {
                showPaymentSuccess();
            } else {
                showPaymentFailure();
            }
        }, 5000);
    });
    
    // Retry payment
    retryPaymentBtn.addEventListener('click', function() {
        transactionFailed.classList.add('hidden');
        paymentForm.classList.remove('hidden');
        payBtn.disabled = false;
        payBtn.innerHTML = 'PAY';
    });
    
    // Download receipt
    downloadReceiptBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '/FearlessStore/Cyber/receipt.html';
    });
    
    // Initialize with base price and tax calculation
    const initialPriceInfo = calculateTotalPrice(2499, false);
    updatePriceDisplays(initialPriceInfo, false);
});
    