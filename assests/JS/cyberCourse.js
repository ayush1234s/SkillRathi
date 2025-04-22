
document.addEventListener('DOMContentLoaded', function() {
    // ========== CONSTANTS ========== //
    const BASE_PRICE = 2499;
    const UPI_ID = "8920729358@ptaxis";
    const validCoupons = {
        'CYBER500': { type: 'partial', amount: 500 },
        'SKILLC500': { type: 'partial', amount: 500 },
        'INDIA500': { type: 'partial', amount: 500 },
        'HACK500': { type: 'partial', amount: 500 },
        'RATH500': { type: 'partial', amount: 500 },
        'GICRISE': { type: 'full', amount: BASE_PRICE }
    };

    // ========== DOM ELEMENTS ========== //
    const buyNowBtn = document.getElementById('buyNowBtn');
    const userInfoModal = document.getElementById('userInfoModal');
    const paymentModal = document.getElementById('paymentModal');
    const verificationModal = document.getElementById('verificationModal');
    const userInfoForm = document.getElementById('userInfoForm');
    const paymentForm = document.getElementById('paymentForm');
    const transactionSuccess = document.getElementById('transactionSuccess');
    const transactionFailed = document.getElementById('transactionFailed');
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    const retryPaymentBtn = document.getElementById('retryPaymentBtn');
    const verifyPaymentBtn = document.getElementById('verifyPaymentBtn');
    const result = document.getElementById('result');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponCode = document.getElementById('couponCode');
    const couponMessage = document.getElementById('couponMessage');
    const discountRow = document.getElementById('discountRow');
    const fullDiscountRow = document.getElementById('fullDiscountRow');
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
    const discountType = document.getElementById('discountType');
    const receiptDropArea = document.getElementById('receiptDropArea');
    const receiptUpload = document.getElementById('receiptUpload');
    const previewArea = document.getElementById('previewArea');
    const receiptPreview = document.getElementById('receiptPreview');
    const removePreview = document.getElementById('removePreview');
    const processingIndicator = document.getElementById('processingIndicator');
    const verificationResult = document.getElementById('verificationResult');
    const verificationSuccess = document.getElementById('verificationSuccess');
    const verificationFailed = document.getElementById('verificationFailed');
    const verifyReceiptBtn = document.getElementById('verifyReceiptBtn');
    const cancelVerificationBtn = document.getElementById('cancelVerificationBtn');
    const closeVerificationModal = document.getElementById('closeVerificationModal');
    const closeUserInfoModal = document.getElementById('closeUserInfoModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const certificateModal = document.getElementById('certificateModal');

    // ========== INITIALIZATION ========== //
    function init() {
        // Check purchase status on page load
        const purchaseData = checkPurchaseStatus();
        if (purchaseData) {
            buyNowBtn.textContent = "Access Course";
            purchaseStatus.classList.remove('hidden');
        }

        // Initialize price display
        const initialPriceInfo = calculateTotalPrice(BASE_PRICE, null, 0);
        updatePriceDisplays(initialPriceInfo, null);
    }

    // ========== HELPER FUNCTIONS ========== //

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Toggle module content
    window.toggleModule = function(moduleHeader) {
        const moduleContent = moduleHeader.nextElementSibling;
        const chevron = moduleHeader.querySelector('i');
        moduleContent.classList.toggle('hidden');
        chevron.classList.toggle('fa-chevron-down');
        chevron.classList.toggle('fa-chevron-up');
    }

    // Certificate modal functions
    window.openCertificateModal = function() {
        certificateModal.classList.remove('hidden');
    }

    window.closeCertificateModal = function() {
        certificateModal.classList.add('hidden');
    }

    // Check if device is mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Generate QR Code for payment
    function generateQRCode(amount) {
        const qrCodeContainer = document.getElementById('qrcode');
        qrCodeContainer.innerHTML = '';
        const upiLink = `upi://pay?pa=${UPI_ID}&pn=Skill%20Rathi&am=${amount}&cu=INR`;
        const qr = qrcode(0, 'L');
        qr.addData(upiLink);
        qr.make();
        qrCodeContainer.innerHTML = qr.createImgTag(5);
    }

    // Calculate total price with discounts
    function calculateTotalPrice(basePrice, discountType, discountAmount) {
        const tax = 0; // 0% tax
        let total = basePrice + tax;
        let discount = 0;

        if (discountType === 'partial') {
            discount = discountAmount;
            total -= discount;
        } else if (discountType === 'full') {
            discount = discountAmount;
            total = 0;
        }

        return { basePrice, tax, discount, total };
    }

    // Update all price displays
    function updatePriceDisplays(priceInfo, discountTypeValue) {
        // Update discount rows
        discountRow.classList.toggle('hidden', discountTypeValue !== 'partial');
        fullDiscountRow.classList.toggle('hidden', discountTypeValue !== 'full');
        
        // Update form values
        couponApplied.value = discountTypeValue ? "Yes" : "No";
        discountType.value = discountTypeValue || "None";

        // Format price display
        const formattedPrice = priceInfo.total === 0 ? 
            '₹0 <span class="free-course-badge">FREE</span>' : 
            `₹${priceInfo.total.toFixed(2)}`;

        totalPrice.innerHTML = formattedPrice;
        modalTotalPrice.innerHTML = formattedPrice;
        paymentAmount.innerHTML = formattedPrice;
        formAmount.value = priceInfo.total.toFixed(2);
    }

    // Check purchase status from localStorage
    function checkPurchaseStatus() {
        const purchaseData = localStorage.getItem('cyberSecurityPurchase');
        return purchaseData ? JSON.parse(purchaseData) : null;
    }

    // Show message for coupon application
    function showMessage(message, isSuccess) {
        couponMessage.textContent = message;
        couponMessage.className = 'text-sm mt-1 ' + (isSuccess ? 'text-green-600' : 'text-red-600');
        couponMessage.classList.remove('hidden');
        setTimeout(() => couponMessage.classList.add('hidden'), 5000);
    }

    // Show result message in forms
    function showResult(message, isSuccess) {
        result.textContent = message;
        result.className = isSuccess ? "success" : "error";
        result.style.display = "block";
    }

    // Show already purchased popup
    function showAlreadyPurchasedPopup(data) {
        popupName.textContent = data.name;
        popupEmail.textContent = data.email;
        popupAmount.textContent = data.amount;
        alreadyPurchasedPopup.classList.remove('hidden');
    }

    // ========== EVENT HANDLERS ========== //

    // Apply coupon button click
    applyCouponBtn.addEventListener('click', function() {
        const code = couponCode.value.trim().toUpperCase();
        
        if (!code) {
            showMessage('Please enter a coupon code', false);
            return;
        }

        if (validCoupons[code]) {
            const coupon = validCoupons[code];
            const priceInfo = calculateTotalPrice(BASE_PRICE, coupon.type, coupon.amount);
            updatePriceDisplays(priceInfo, coupon.type);
            
            const message = coupon.type === 'full' ? 
                '100% discount applied! Course is now FREE' : 
                `Coupon applied! ₹${coupon.amount} discount added`;
            showMessage(message, true);
        } else {
            showMessage('Invalid coupon code', false);
        }
    });

    // Buy Now button click
    buyNowBtn.addEventListener('click', function() {
        const purchaseData = checkPurchaseStatus();
        if (purchaseData) {
            if (buyNowBtn.textContent === "Access Course") {
                window.location.href = "/FearlessStore/enrolled-courses.html";
            } else {
                showAlreadyPurchasedPopup(purchaseData);
            }
        } else {
            userInfoModal.classList.remove('hidden');
        }
    });

    // Close modals
    closeUserInfoModal.addEventListener('click', () => userInfoModal.classList.add('hidden'));
    cancelBtn.addEventListener('click', () => userInfoModal.classList.add('hidden'));
    closePopupBtn.addEventListener('click', () => alreadyPurchasedPopup.classList.add('hidden'));
    closeVerificationModal.addEventListener('click', () => verificationModal.classList.add('hidden'));
    cancelVerificationBtn.addEventListener('click', () => verificationModal.classList.add('hidden'));

    // Close when clicking outside modal
    [userInfoModal, alreadyPurchasedPopup, verificationModal, certificateModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.classList.add('hidden');
        });
    });

    // User info form submission
    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        submitFormData(new FormData(userInfoForm));
    });

    // Validate form inputs
    function validateForm() {
        const fields = {
            phone: { value: document.getElementById('phone').value, regex: /^\d{10}$/, message: "10-digit phone number" },
            pincode: { value: document.getElementById('pincode').value, regex: /^\d{6}$/, message: "6-digit pincode" },
            email: { value: document.getElementById('email').value, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "valid email" }
        };

        for (const [field, { value, regex, message }] of Object.entries(fields)) {
            if (!regex.test(value)) {
                showResult(`Please enter a ${message}`, false);
                return false;
            }
        }
        return true;
    }

    // Submit form data to Web3Forms
    function submitFormData(formData) {
        showResult("Processing...", true);
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(async response => {
            const json = await response.json();
            if (response.ok) {
                showResult("Details submitted!", true);
                setTimeout(initiatePayment, 2000);
            } else {
                showResult(json.message || "Error submitting form", false);
            }
        })
        .catch(() => showResult("Network error", false));
    }

    // Initiate payment after form submission
    function initiatePayment() {
        userInfoModal.classList.add('hidden');
        paymentModal.classList.remove('hidden');
        
        const amount = parseFloat(formAmount.value);
        
        if (amount > 0) {
            generateQRCode(amount);
            setupPaymentOptions();
        } else {
            completePurchase(); // Free course
        }
    }

    // Setup payment options based on device
    function setupPaymentOptions() {
        if (isMobile()) {
            qrCodeContainer.classList.add('hidden');
            upiPayContainer.classList.remove('hidden');
        } else {
            qrCodeContainer.classList.remove('hidden');
            upiPayContainer.classList.add('hidden');
        }
    }

    // Open UPI app button click
    openUpiAppBtn.addEventListener('click', function() {
        const amount = parseFloat(formAmount.value);
        window.location.href = `upi://pay?pa=${UPI_ID}&pn=Skill%20Rathi&am=${amount}&cu=INR`;
        setTimeout(() => window.open(`https://upi.link/pay?pa=${UPI_ID}&pn=Skill%20Rathi&am=${amount}&cu=INR`, '_blank'), 500);
    });

    // Verify Payment button click
    verifyPaymentBtn.addEventListener('click', function() {
        paymentModal.classList.add('hidden');
        verificationModal.classList.remove('hidden');
        resetVerificationModal();
    });

    // Receipt Drop Area events
    receiptDropArea.addEventListener('click', function() {
        receiptUpload.click();
    });

    receiptDropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('border-rose-600');
    });

    receiptDropArea.addEventListener('dragleave', function() {
        this.classList.remove('border-rose-600');
    });

    receiptDropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('border-rose-600');
        
        if (e.dataTransfer.files.length) {
            handleReceiptFile(e.dataTransfer.files[0]);
        }
    });

    // Receipt Upload change event
    receiptUpload.addEventListener('change', function() {
        if (this.files.length) {
            handleReceiptFile(this.files[0]);
        }
    });

    // Handle receipt file upload
    function handleReceiptFile(file) {
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (JPG, PNG, JPEG)');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            receiptPreview.src = e.target.result;
            previewArea.classList.remove('hidden');
            verifyReceiptBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // Remove preview button click
    removePreview.addEventListener('click', function() {
        previewArea.classList.add('hidden');
        receiptPreview.src = '#';
        receiptUpload.value = '';
        verifyReceiptBtn.disabled = true;
    });

    // Verify Receipt button click
    verifyReceiptBtn.addEventListener('click', function() {
        processingIndicator.classList.remove('hidden');
        verifyReceiptBtn.disabled = true;
        
        // Simulate OCR processing with Tesseract.js
        setTimeout(function() {
            verifyReceipt(receiptPreview.src);
        }, 2000);
    });

    // Verify Receipt with OCR
    function verifyReceipt(imageUrl) {
        Tesseract.recognize(
            imageUrl,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            processingIndicator.classList.add('hidden');
            verificationResult.classList.remove('hidden');
            
            // Check if UPI ID is in the text
            if (text.includes(UPI_ID)) {
                showVerificationSuccess();
            } else {
                showVerificationFailure();
            }
        }).catch(error => {
            console.error("OCR error:", error);
            processingIndicator.classList.add('hidden');
            showVerificationFailure();
        });
    }

    // Show verification success
    function showVerificationSuccess() {
        verificationSuccess.classList.remove('hidden');
        verificationFailed.classList.add('hidden');
        
        // Auto close after 3 seconds and complete purchase
        setTimeout(function() {
            verificationModal.classList.add('hidden');
            completePurchase();
        }, 3000);
    }

    // Show verification failure
    function showVerificationFailure() {
        verificationSuccess.classList.add('hidden');
        verificationFailed.classList.remove('hidden');
        verifyReceiptBtn.disabled = false;
    }

    // Reset verification modal
    function resetVerificationModal() {
        previewArea.classList.add('hidden');
        processingIndicator.classList.add('hidden');
        verificationResult.classList.add('hidden');
        verificationSuccess.classList.add('hidden');
        verificationFailed.classList.add('hidden');
        receiptUpload.value = '';
        receiptPreview.src = '#';
        verifyReceiptBtn.disabled = true;
    }

    // Complete purchase and save data
    function completePurchase() {
        paymentForm.classList.add('hidden');
        transactionSuccess.classList.remove('hidden');
        
        const userData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            college: document.getElementById('college').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            course: "Cyber Security Full Course",
            amount: formAmount.value,
            date: new Date().toLocaleDateString('en-IN'),
            time: new Date().toLocaleTimeString('en-IN'),
            transactionId: 'TXN' + Math.floor(Math.random() * 1000000000),
            couponApplied: couponApplied.value,
            discountType: discountType.value
        };

        localStorage.setItem('receiptData', JSON.stringify(userData));
        localStorage.setItem('cyberSecurityPurchase', JSON.stringify({
            name: userData.name,
            email: userData.email,
            amount: userData.amount,
            date: userData.date
        }));

        buyNowBtn.textContent = "Access Course";
        purchaseStatus.classList.remove('hidden');
    }

    // Retry payment button click
    retryPaymentBtn.addEventListener('click', function() {
        transactionFailed.classList.add('hidden');
        paymentForm.classList.remove('hidden');
    });

    // Download receipt button click
    downloadReceiptBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '/FearlessStore/Cyber/receipt.html';
    });

    // Initialize the page
    init();
});
