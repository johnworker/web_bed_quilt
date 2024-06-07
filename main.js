// 選單效果
$(".menu_btn").click(function () {
  $(".menu_wrap").toggleClass("active");
  $(this).toggleClass("active");
});


// 背景影片切換
$(document).ready(function() {
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
  videos.forEach(function(video) {
      video.addEventListener('ended', switchVideo);
  });

  // 確保影片自動播放
  videos[currentVideoIndex].play();
});

// 卷軸移動換影片
// 初始化 GSAP 和 ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    let videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach((wrapper, index) => {
        ScrollTrigger.create({
            trigger: wrapper,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => switchVideo(index),
            onEnterBack: () => switchVideo(index),
        });
    });

    function switchVideo(index) {
        videoWrappers.forEach((wrapper, i) => {
            if (i === index) {
                wrapper.classList.add('active');
            } else {
                wrapper.classList.remove('active');
            }
        });
    }
});