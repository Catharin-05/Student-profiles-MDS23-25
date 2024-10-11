function downloadBrochure() {
    // Create an invisible anchor element
    const brochureLink = document.createElement('a');
    
    // Specify the file URL
    brochureLink.href = 'assets/Placement Brochure MDS25.pdf';  // Replace with the actual path to your brochure file
    
    // Set the download attribute with the file name you want to save as
    brochureLink.download = 'Brochure.pdf';  // Replace with desired filename
    
    // Append the anchor to the document body (necessary for Firefox)
    document.body.appendChild(brochureLink);
    
    // Programmatically click the anchor to trigger the download
    brochureLink.click();
    
    // Remove the anchor from the DOM after the click
    document.body.removeChild(brochureLink);
}

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



const ctx = document.getElementById('canvas').getContext('2d');
        
        const data = {
            labels: [
                'Internet of Things', 
                'Graph Analytics', 
                'Natural Language Processing',
                'Geospatial Data Analytics', 
                'Image and Video Analytics',
                'Quantum Machine Learning', 
                'Reinforcement Learning',
                'Categorical Variables', 
                'Multivariate Analysis', 
                'Stochastic Processes', 
                'Bio-Statistics', 
                'Econometrics'
            ],
            datasets: [
                {
                    label: 'Data Science Technologies Elective 1',
                    data: [39, 41, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    
                   
                },
                {
                    label: 'Data Science Technologies Elective 2',
                    data: [0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    
                },
                {
                    label: 'Data Science Technologies Elective 3',
                    data: [0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(173, 88, 145, 0.5)',
                   
                },
                {
                    label: 'Statistics Elective 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 41, 40, 42, 0, 0],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    
                },
                {
                    label: 'Statistics Elective 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 60],
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    
                }
            ]
        };


        const groupedBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                layout: {
                    padding: {
                        left: 20,  // Increase padding on the left
                        right: 20  // Increase padding on the right
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        
                        
                    },
                    y: {
                        beginAtZero: true,
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                
            }
        });


        const chartContext = document.getElementById('doughnutChartCanvas').getContext('2d');

        const doughnutData = {
            labels: ['Python', 'SQL', 'R', 'Web Development', 'Excel', 'Power BI', 'Java', 'Tableau', 'C/C++', 'AWS/Azure'],
            datasets: [{
                data: [119, 116, 117, 17, 42, 97, 9, 28, 62, 16],  // Number of students skilled in each technology
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(201, 203, 207, 0.5)',
                    'rgba(50, 203, 207, 0.5)',
                    'rgba(235, 99, 132, 0.5)',
                    'rgba(135, 99, 132, 0.5)'
                    
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                //     'rgba(201, 203, 207, 1)'
                // ],
                borderWidth: 1
            }]
        };

        const doughnutChart = new Chart(chartContext, {
            type: 'doughnut',
            data: doughnutData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const students = context.raw;
                                return `${label}: ${students} students`;
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        formatter: (value, context) => {
                            const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(2) + '%';
                            return percentage;  // Display the percentage
                        },
                        anchor: 'center',  // Center the label in the slice
                        align: 'center'    // Align the label in the center
                    }
                }
            },
            plugins: [ChartDataLabels]  // Register the datalabels plugin
        });