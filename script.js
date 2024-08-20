
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider .slide');
    const totalSlides = slides.length;
    const intervalTime = 5000; // 5000 milliseconds = 5 seconds
    let slideInterval;

    // Function to change slide
    function changeSlide(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }

    // Event listeners for manual slide control
    document.querySelector('.slider-controls .prev').addEventListener('click', function () {
        changeSlide(-1);
        resetInterval();
    });

    document.querySelector('.slider-controls .next').addEventListener('click', function () {
        changeSlide(1);
        resetInterval();
    });

    // Function to start the auto sliding
    function startSlide() {
        slideInterval = setInterval(function () {
            changeSlide(1);
        }, intervalTime);
    }

    // Function to reset the interval
    function resetInterval() {
        clearInterval(slideInterval);
        startSlide();
    }

    // Start the auto sliding when the page loads
    startSlide();
});


// Chatbot functionality
// function toggleChatbot() {
//     const chatbot = document.getElementById('chatbot');
//     if (chatbot.style.display === 'none' || chatbot.style.display === '') {
//         chatbot.style.display = 'block';
//     } else {
//         chatbot.style.display = 'none';
//     }
// }






// Student profiles

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-bar');
    const profileContainer = document.getElementById('profiles-container');


    
    // Function to create profile card
    function createProfileCard(data) {
        
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.dataset.name = data.name;
        card.dataset.specialization = data.specialization;
        card.dataset.skills = data.skills;


        

        card.innerHTML = `
            <img src="${data.photo}" alt="${data.name}">
            <h3>${data.name}</h3>
            <p>${data.specialization}</p>
            <p class="skills">Skills: ${data.skills}</p>
            <div class="social-media">
                ${data.github ? `<a href="${data.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                ${data.kaggle ? `<a href="${data.kaggle}" target="_blank"><i class="fab fa-kaggle"></i></a>` : ''}
                ${data.portfolio ? `<a href="${data.portfolio}" target="_blank"><i class="fas fa-user"></i></a>` : ''}
            </div>
        `;
        

        if(typeof data.name !== 'undefined') {profileContainer.appendChild(card)
            console.log(data.name)
        };
    }

    // Fetch and parse CSV
    Papa.parse('assets/data/students.csv', {
        download: true,
        header: true,
        complete: function(results) {
            console.log(results);

        const profiles = results.data;

        // Filter out invalid profiles
        const validProfiles = profiles.filter(profile => profile.name);

        // Sort profiles alphabetically
        validProfiles.sort((a, b) => a.name.localeCompare(b.name));

        // Create profile cards
        validProfiles.forEach(profile => createProfileCard(profile));


            
        }
    });

    // Function to filter profiles
    function filterProfiles() {
        const query = searchInput.value.toLowerCase();
        const profileCards = document.querySelectorAll('.profile-card');

        profileCards.forEach(profile => {
            const name = profile.dataset.name.toLowerCase();
            const specialization = profile.dataset.specialization.toLowerCase();
            const skills = profile.dataset.skills.toLowerCase();

            if (name.includes(query) || specialization.includes(query) || skills.includes(query)) {
                profile.style.display = 'block';
            } else {
                profile.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProfiles);
});





document.addEventListener('DOMContentLoaded', function () {
    const highlightBoxes = document.querySelectorAll('.highlight-box');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkVisibility() {
        highlightBoxes.forEach(box => {
            if (isElementInViewport(box)) {
                box.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('touchmove', checkVisibility); // For touch devices
    checkVisibility(); // Initial check

    
    
    
    

    // Smooth scrolling for menu links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            // Ensure visibility check after scrolling
            setTimeout(checkVisibility, 600); // Adjust timing to match scroll duration
        });
    });
});

$('.slick.marquee').slick({
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    initialSlide: 1,
    arrows: false,
    buttons: false
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.industry-slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Show the first slide initially
    showSlide(currentIndex);

    // Auto-play slider
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Add event listeners to slider controls
    document.querySelector('.industry-slider-controls .next').addEventListener('click', nextSlide);
    document.querySelector('.industry-slider-controls .prev').addEventListener('click', prevSlide);
});
