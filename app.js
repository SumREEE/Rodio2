var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 600,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 20,
        depth: 800,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    on: {
        slideChange: function () {
            // ซ่อนภาพข้อความทั้งหมด
            document.querySelectorAll('.text').forEach((text) => {
                text.classList.remove('text-active');
            });

            // แสดงภาพข้อความของสไลด์ปัจจุบัน
            const currentIndex = swiper.realIndex;
            const activeText = document.querySelector(`.text[data-slide="${currentIndex}"]`);
            if (activeText) {
                activeText.classList.add('text-active');
            }
        },
    },
});

// แสดงภาพข้อความของสไลด์แรกเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    const firstText = document.querySelector(`.text[data-slide="0"]`);
    if (firstText) {
        firstText.classList.add('text-active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slideIndex = urlParams.get('slide');

    // เปลี่ยนไปยังสไลด์ที่ระบุในพารามิเตอร์
    if (slideIndex) {
        swiper.slideTo(parseInt(slideIndex) - 1, 0); // slideTo(index, speed)
    }
});

// จับเวลา inactivity 10 วินาทีเพื่อนำผู้ใช้ไปที่หน้า home.html
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer); // รีเซ็ตตัวจับเวลา
    inactivityTimer = setTimeout(() => {
        window.location.href = "index.html"; // เปลี่ยนไปยังหน้า home
    }, 20000); // ตั้งเวลา 10 วินาที
}

// เริ่มต้นจับเวลาและตรวจจับกิจกรรมผู้ใช้
window.onload = () => {
    resetInactivityTimer(); // เริ่มจับเวลาเมื่อโหลดหน้าเว็บ
    document.addEventListener('mousemove', resetInactivityTimer); // ตรวจจับการขยับเมาส์
    document.addEventListener('keypress', resetInactivityTimer); // ตรวจจับการกดคีย์บอร์ด
    document.addEventListener('touchstart', resetInactivityTimer); // ตรวจจับการแตะบนจอ
};

    
