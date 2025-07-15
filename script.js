document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const startButton = document.getElementById('start-button');
    const menuItems = document.querySelectorAll('.menu-item');
    const backButtons = document.querySelectorAll('.back-button');

    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('main-menu');
        document.getElementById('background-music').play();
    });

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreen = item.getAttribute('data-target');
            showScreen(targetScreen);
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreen = button.getAttribute('data-target');
            showScreen(targetScreen);
        });
    });

    // Placeholder data for projects
    const projects = [
        {
            title: 'Project Alpha',
            description: 'A web app for managing tasks.',
            link: '#'
        },
        {
            title: 'Project Beta',
            description: 'An e-commerce site for retro games.',
            link: '#'
        }
    ];

    const projectList = document.querySelector('.project-list');
    projects.forEach(project => {
        const projectElement = document.createElement('a');
        projectElement.href = '#';
        projectElement.className = 'menu-item';
        projectElement.textContent = project.title;
        projectElement.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(project);
        });
        projectList.appendChild(projectElement);
    });

    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    const backgroundMusic = document.getElementById('background-music');
    const musicNextButton = document.getElementById('music-next');
    const musicPrevButton = document.getElementById('music-prev');

    const musicPlaylist = [
        'assets/music/Nobody Gets Me.mp3',
        'assets/music/Kill Bill.mp3',
        'assets/music/Snooze.mp3',
        'assets/music/I Think They Call This Love.mp3',
        'assets/music/about you.mp3',
        'assets/music/blue.mp3',
        'assets/music/You Be in My Heart.mp3'
    ];
    let currentTrackIndex = 0;
    let isPlaying = false;

    function loadTrack(index) {
        backgroundMusic.src = musicPlaylist[index];
        backgroundMusic.load();
        if (isPlaying) {
            backgroundMusic.play();
        }
    }

    // Play music automatically after splash screen, but only if user interacts
    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('main-menu');
        if (!isPlaying) {
            loadTrack(currentTrackIndex);
            backgroundMusic.play();
            isPlaying = true;
            musicIcon.innerHTML = '&#10074;&#10074;'; // Pause icon
        }
    });

    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.innerHTML = '&#9658;'; // Play icon
        } else {
            backgroundMusic.play();
            musicIcon.innerHTML = '&#10074;&#10074;'; // Pause icon
        }
        isPlaying = !isPlaying;
    });

    musicNextButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
        loadTrack(currentTrackIndex);
    });

    musicPrevButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + musicPlaylist.length) % musicPlaylist.length;
        loadTrack(currentTrackIndex);
    });

    function openModal(project) {
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalLink.href = project.link;
        modal.style.display = 'block';
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent scrolling
            if (isPlaying) {
                backgroundMusic.pause();
                musicIcon.innerHTML = '&#9658;'; // Play icon
            } else {
                backgroundMusic.play();
                musicIcon.innerHTML = '&#10074;&#10074;'; // Pause icon
            }
            isPlaying = !isPlaying;
        }
    });
});