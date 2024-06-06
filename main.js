// 選單效果
$(".menu_btn").click(function () {
    $(".menu_wrap").toggleClass("active");
    $(this).toggleClass("active");
  });


// 背景影片切換
$(document).ready(function() {
  var videoElement = document.getElementById('backgroundVideo');
  var videoSource = document.getElementById('videoSource');
  var videos = ['./video/Quilt_promo_one.mp4', './video/Quilt_promo_two.mp4'];
  var currentVideoIndex = 0;

  videoElement.addEventListener('ended', function() {
      // 切換到下一個影片
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      videoSource.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play();
  });
});