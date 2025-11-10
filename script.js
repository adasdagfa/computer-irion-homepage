/**
 * 컴퓨터이리온 로고 클릭 시 로딩 바 애니메이션 및 새로고침 기능
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. 로고 링크 요소와 로딩 바 요소를 가져옵니다. (index.html에서 id 부여)
    const logoLink = document.getElementById('logo-link');
    const loadingBar = document.getElementById('loading-bar');

    if (logoLink && loadingBar) {
        // 2. 로고 클릭 이벤트 리스너를 추가합니다.
        logoLink.addEventListener('click', function (event) {
            // 기본 동작 (URL 변경)을 막습니다.
            event.preventDefault();

            // 로딩 바를 보이게 하고 애니메이션을 시작합니다.
            loadingBar.style.opacity = '1';
            loadingBar.style.width = '80%'; // 80%까지 빠르게 채우기

            // 0.4초 후 100%로 채우기 시작
            setTimeout(function () {
                loadingBar.style.width = '100%';
            }, 400);

            // 0.8초(800ms) 후에 최종 새로고침을 실행합니다.
            setTimeout(function () {
                window.location.reload(); // 페이지 새로고침 실행
            }, 800);
        });
    }
});