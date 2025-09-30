const pages = document.querySelectorAll(".page");
let startX = 0;
let currentPage = 0;

// ترتيب الصفحات
function updateZIndex() {
  pages.forEach((page, i) => {
    page.style.zIndex = pages.length - i;
  });
}

// بداية السحب
function handleStart(e) {
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

// نهاية السحب
function handleEnd(e) {
  let endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff < -50 && currentPage < pages.length - 1) {
    pages[currentPage].classList.add("flipped");
    currentPage++;
  } else if (diff > 50 && currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove("flipped");
  }

  updateZIndex();
}

// أحداث السحب
pages.forEach(page => {
  page.addEventListener("mousedown", handleStart);
  page.addEventListener("mouseup", handleEnd);
  page.addEventListener("touchstart", handleStart);
  page.addEventListener("touchend", handleEnd);
});

// ترتيب أولي
updateZIndex();
const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

// محاولة تشغيل تلقائي
window.addEventListener("load", () => {
  music.play().catch(() => {
    console.log("المتصفح منع التشغيل التلقائي");
  });
});

// تشغيل عند أول تفاعل
function enableMusic() {
  music.play().catch(()=>{});
  document.removeEventListener("click", enableMusic);
}
document.addEventListener("click", enableMusic);

// زرار التحكم
btn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    btn.textContent = "🔊 إيقاف";
  } else {
    music.pause();
    btn.textContent = "🎵 تشغيل";
  }
});