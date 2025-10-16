// رسائل
const messages = [
  "النهاردة مش اي يوم..دا اليوم اللي الدنيا نورت فيه بنزول كائن غريب زيك 😂 ",
  "ربنا يدينا صبر على بعض سنة كمان",
  "كل سنة وانتي طيبة يارب تبقي اسعد واحدة"
  ,"يارب سنتك دي تكون بداية لحاجات حلوة كتير ليكي",
  "ربنا يرزقك راحة البال ونور في الطريق وسعادة من غير سبب",
  "الدنيا مهما لخبطت ربنا دايما بيظبطها في الاخر",
  "عيد ميلادك فرصة نحتفل ونفتكر انك كبرتي سنة بس ماتعلمتيش ولا حاجة"
];
const msgBox = document.getElementById('messageBox');
document.getElementById('randomMsgBtn').addEventListener('click', () => {
  const i = Math.floor(Math.random()*messages.length);
  msgBox.textContent = messages[i];
});

// تشغيل الموسيقى
const audio = document.getElementById('bgAudio');
let playing = false;
document.getElementById('playAudio').addEventListener('click', async (event) => {
  if(!playing){ await audio.play(); playing=true; event.target.textContent='إيقاف الموسيقى'; }
  else{ audio.pause(); playing=false; event.target.textContent='تشغيل الموسيقى'; }
});

// زر المفاجأة → يفتح صفحة جديدة
document.getElementById('showSurprise').addEventListener('click', () => {
  window.location.href = "surprise.html";
});

// زر التايم لاين
document.getElementById('openTimeline').addEventListener('click', () => {
  alert("هنا ممكن تحط التايم لاين 🙂");
});

// عداد تنازلي مضبوط على 17/7/2025
let target = new Date("2025-10-17T00:00:00");

function updateCountdown(){
  const now = new Date();
  const diff = target - now;
  if(diff<=0){
    document.getElementById('days').textContent='0';
    document.getElementById('hours').textContent='0';
    document.getElementById('mins').textContent='0';
    document.getElementById('secs').textContent='0';

    // تفعيل الأزرار
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);

    // تشغيل الأغنية تلقائي
    audio.play().catch(()=>{});

    // رسالة تهنئة مع أنيميشن
    const msg = document.getElementById('congratsMsg');
    msg.classList.add('show');
    setTimeout(() => {
      msg.classList.add('hide');
      setTimeout(() => {
        msg.style.display = 'none';
      }, 1000);
    }, 5000);

    // confetti
    if (typeof confetti === "function") {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    clearInterval(timer);
    return;
  }
  const days = Math.floor(diff/86400000);
  const hours = Math.floor((diff%86400000)/3600000);
  const mins = Math.floor((diff%3600000)/60000);
  const secs = Math.floor((diff%60000)/1000);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('mins').textContent = mins;
  document.getElementById('secs').textContent = secs;
}
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

//تعطيل الأزرار لحد ما يخلص العداد
//document.querySelectorAll("button").forEach(btn => btn.disabled = true);
