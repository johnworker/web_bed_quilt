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

// FAQ下拉開合
$(document).ready(function () {
  $('.faq_question').click(function () {
    const faqItem = $(this).closest('.faq_item');
    faqItem.toggleClass('active');
    faqItem.siblings().removeClass('active').find('.faq_answer').slideUp();
    faqItem.find('.faq_answer').slideToggle();
  });
});

// 影像循環區
document.addEventListener('DOMContentLoaded', function () {
  const moveContainer = document.querySelector('.move_container');
  const moveItems = Array.from(document.querySelectorAll('.move_item'));
  const containerWidth = moveContainer.clientWidth;
  const itemWidth = moveItems[0].clientWidth;
  const totalItems = moveItems.length;

  // 複製所有項目並附加到容器末尾以實現無縫循環
  moveItems.forEach(item => {
    const clone = item.cloneNode(true);
    moveContainer.appendChild(clone);
  });

  // 計算動畫持續時間
  const animationDuration = 20; // 動畫持續時間（秒），根據需要調整
  moveContainer.style.animationDuration = `${animationDuration}s`;

  // 動態生成@keyframes，確保無縫循環
  const keyframes = `
      @keyframes moveLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-${itemWidth}px * ${totalItems})); }
      }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);

  // 動畫結束時重置動畫以達到無縫循環
  moveContainer.addEventListener('animationiteration', () => {
    moveContainer.style.animation = 'none';
    moveContainer.offsetHeight; /* 觸發重繪 */
    moveContainer.style.animation = null;
  });
});
