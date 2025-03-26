
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const noCourses = document.getElementById('noCourses');
    const enrolledCourses = document.getElementById('enrolledCourses');
    const accessCourseBtn = document.getElementById('accessCourseBtn');
    const viewRecordingsBtn = document.getElementById('viewRecordingsBtn');
    const courseContentPopup = document.getElementById('courseContentPopup');
    const closeCourseContentBtn = document.getElementById('closeCourseContentBtn');
    const recordedClassesPopup = document.getElementById('recordedClassesPopup');
    const closeRecordedClassesBtn = document.getElementById('closeRecordedClassesBtn');
    const videoPlayerPopup = document.getElementById('videoPlayerPopup');
    const closeVideoPlayerBtn = document.getElementById('closeVideoPlayerBtn');
    const videoFrame = document.getElementById('videoFrame');
    const videoTitle = document.getElementById('videoTitle');
    const playVideoBtns = document.querySelectorAll('.play-video-btn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Check if user has purchased the course
    function checkPurchaseStatus() {
        const purchaseData = localStorage.getItem('cyberSecurityPurchase');
        if (purchaseData) {
            return JSON.parse(purchaseData);
        }
        return null;
    }
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Check purchase status and show appropriate content
    const purchaseData = checkPurchaseStatus();
    if (purchaseData) {
        noCourses.classList.add('hidden');
        enrolledCourses.classList.remove('hidden');
    } else {
        noCourses.classList.remove('hidden');
        enrolledCourses.classList.add('hidden');
    }
    
    // Access Course button
    if (accessCourseBtn) {
        accessCourseBtn.addEventListener('click', function() {
            courseContentPopup.classList.remove('hidden');
        });
    }
    
    // View Recordings button
    if (viewRecordingsBtn) {
        viewRecordingsBtn.addEventListener('click', function() {
            recordedClassesPopup.classList.remove('hidden');
        });
    }
    
    // Close Course Content popup
    closeCourseContentBtn.addEventListener('click', function() {
        courseContentPopup.classList.add('hidden');
    });
    
    // Close Recorded Classes popup
    closeRecordedClassesBtn.addEventListener('click', function() {
        recordedClassesPopup.classList.add('hidden');
    });
    
    // Close Video Player popup
    closeVideoPlayerBtn.addEventListener('click', function() {
        videoPlayerPopup.classList.add('hidden');
        videoFrame.src = '';
    });
    
    // Play video buttons
    playVideoBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoParent = this.closest('.border');
            const title = videoParent.querySelector('h5').textContent;
            
            videoTitle.textContent = title;
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoPlayerPopup.classList.remove('hidden');
            recordedClassesPopup.classList.add('hidden');
        });
    });
    
    // Close popups when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === courseContentPopup) {
            courseContentPopup.classList.add('hidden');
        }
        if (e.target === recordedClassesPopup) {
            recordedClassesPopup.classList.add('hidden');
        }
        if (e.target === videoPlayerPopup) {
            videoPlayerPopup.classList.add('hidden');
            videoFrame.src = '';
        }
    });
});
