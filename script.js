document.addEventListener("DOMContentLoaded", function () {
    // 1. 로딩 바 스크립트 
    const loadingBar = document.getElementById('loading-bar');
    const gameImages = document.querySelectorAll('.carousel-track img');
    const totalAssets = gameImages.length;
    let loadedAssets = 0;

    loadingBar.style.opacity = '1';
    loadingBar.style.width = '10%';

    function updateLoadingBar() {
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        loadingBar.style.width = progress + '%';

        if (loadedAssets >= totalAssets) {
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => {
                    loadingBar.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    gameImages.forEach(img => {
        if (img.complete) {
            updateLoadingBar();
        } else {
            img.addEventListener('load', updateLoadingBar);
            img.addEventListener('error', updateLoadingBar);
        }
    });

    // 2. 모바일 메뉴 토글 스크립트 
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('header nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // 3. 로고 클릭 시 페이지 최상단으로 스크롤 
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Hero 섹션 배경 이미지 관성 스크롤 효과 
    const heroSection = document.getElementById('home');

    let targetY = 0;
    let currentY = 0;

    const inertia = 0.05;
    const speedRatio = 0.2;

    function animateParallax() {
        // Hero 섹션이 존재하는지 확인 (NPE 방지)
        if (!heroSection) {
            return;
        }

        targetY = -window.scrollY * speedRatio;
        currentY += (targetY - currentY) * inertia;
        currentY = parseFloat(currentY.toFixed(3));

        heroSection.style.backgroundPositionY = currentY + 'px';

        requestAnimationFrame(animateParallax);
    }

    animateParallax();


    // 5. 이미지 확대 모달 기능 (제거됨)


    // 🔴 6. 방문자 카운터 스크립트 (CountAPI 사용) - 키 수정됨
    const countElement = document.getElementById('visitor-count-number');

    // countElement가 존재하는지 확인 (NPE 방지)
    if (countElement) {
        // 🔴 고유 키 값으로 변경: 이 값을 변경하면 카운트가 0부터 다시 시작됩니다.
        const namespace = 'computer-irion-page-v20251111';
        const key = 'main-page-hit-v2';

        function animateCountUp(targetCount) {
            let currentCount = 0;
            const duration = 1000; // 1초 동안 애니메이션
            const stepTime = 20; // 20ms 마다 갱신
            const steps = duration / stepTime;
            const increment = Math.max(1, Math.ceil(targetCount / steps));

            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= targetCount) {
                    currentCount = targetCount;
                    clearInterval(timer);
                }
                countElement.textContent = currentCount.toLocaleString();
            }, stepTime);
        }

        // API 호출하여 방문자 수 업데이트 및 가져오기
        fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
            .then(response => response.json())
            .then(data => {
                animateCountUp(data.value);
            })
            .catch(error => {
                console.error('Visitor counter error:', error);
                countElement.textContent = 'Error';
            });
    }

});