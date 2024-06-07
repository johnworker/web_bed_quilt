// 選單效果
$(".menu_btn").click(function () {
  $(".menu_wrap").toggleClass("active");
  $(this).toggleClass("active");
});


// 背景影片切換
$(document).ready(function () {
  var video1 = document.getElementById('backgroundVideo1');
  var video2 = document.getElementById('backgroundVideo2');
  var video3 = document.getElementById('backgroundVideo3');
  var videos = [video1, video2, video3];
  var currentVideoIndex = 0;

  function switchVideo() {
    var currentVideo = videos[currentVideoIndex];
    var nextVideoIndex = (currentVideoIndex + 1) % videos.length;
    var nextVideo = videos[nextVideoIndex];

    // 切換顯示狀態
    currentVideo.classList.remove('active');
    currentVideo.classList.add('inactive');
    nextVideo.classList.remove('inactive');
    nextVideo.classList.add('active');

    // 重設下一個影片並播放
    nextVideo.currentTime = 0;
    nextVideo.play();

    // 更新當前影片索引
    currentVideoIndex = nextVideoIndex;
  }

  // 當前影片播放結束時觸發切換
  videos.forEach(function (video) {
    video.addEventListener('ended', switchVideo);
  });

  // 確保影片自動播放
  videos[currentVideoIndex].play();
});


// 卷軸移動換圖
// 初始化 GSAP 和 ScrollTrigger
gsap.utils.toArray(".comparisonSection").forEach((section) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
      end: () => "+=" + section.offsetWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1
    },
    defaults: { ease: "none" }
  });
  // animate the container one way...
  tl.fromTo(
    section.querySelector(".afterImage"),
    { xPercent: 100, x: 0 },
    { xPercent: 0 }
  )
    // ...and the image the opposite way (at the same time)
    .fromTo(
      section.querySelector(".afterImage img"),
      { xPercent: -100, x: 0 },
      { xPercent: 0 },
      0
    );
});

// 示例：添加動畫效果
document.addEventListener('DOMContentLoaded', function () {
  const logo = document.querySelector('.block_intro .logo');
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(logo);
});