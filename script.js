// إظهار زر الرجوع لأعلى عند التمرير
window.onscroll = function () {
    const btn = document.getElementById("scrollTopBtn");
    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// الرجوع لأعلى الصفحة بسلاسة
document.getElementById("scrollTopBtn").onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// فتح وإغلاق الفورم
function openForm() {
    // منع السلوك الافتراضي
    if (event) event.preventDefault();
    
    // إظهار النافذة
    document.getElementById("waModal").style.display = "flex";
    
    // منع التمرير في الخلفية
    document.body.style.overflow = "hidden";
}

function closeForm() {
    // إخفاء النافذة
    document.getElementById("waModal").style.display = "none";
    
    // إعادة التمرير
    document.body.style.overflow = "auto";
}

// إغلاق الفورم عند النقر خارج الصندوق
window.addEventListener('click', function(event) {
    const modal = document.getElementById("waModal");
    if (event.target === modal) {
        closeForm();
    }
});

// الأسئلة الشائعة - فتح وإغلاق
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;

        // إغلاق باقي الأسئلة
        document.querySelectorAll(".faq-answer").forEach(a => {
            if (a !== answer) {
                a.style.maxHeight = null;
                a.previousElementSibling.classList.remove("active");
            }
        });

        // فتح / غلق السؤال الحالي
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            button.classList.remove("active");
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            button.classList.add("active");
        }
    });
});

// دالة إرسال واتساب
function sendWhatsApp() {
    const name = document.getElementById("name").value.trim();
    const cont = document.getElementById("cont").value.trim();
    const ageYear = document.getElementById("ageYear").value;
    const ageMonth = document.getElementById("ageMonth").value;
    const ageDay = document.getElementById("ageDay").value;
    const lip = document.getElementById("lip").checked;
    const palate = document.getElementById("palate").checked;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const notes = document.getElementById("notes").value.trim();

    // التحقق من الحقول الإلزامية
    if (!name || !cont) {
        alert('من فضلك املأ اسم المريض وبلد الإقامة');
        return;
    }
    
    if (!lip && !palate) {
        alert('من فضلك حدد نوع الحالة');
        return;
    }
    
    if (!gender) {
        alert('من فضلك حدد جنس المريض');
        return;
    }

    if (!notes) {
        alert('من فضلك حدد  ضع الخدمه المطلوبه');
        return;
    }

    let caseType = '';
    if (lip) caseType += 'شفة أرنبية ';
    if (palate) caseType += 'شق سقف الحلق';
    caseType = caseType.trim();

    const message = `
اسم المريض: ${name}
بلد الإقامة: ${cont}
العمر: ${ageYear} - ${ageMonth} - ${ageDay} 
نوع الحالة: ${caseType}
الجنس: ${gender}
الخدمة المطلوبة: ${notes || "لا يوجد"}`;

    const url = `https://api.whatsapp.com/send?phone=201095715211&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    
    // إغلاق الفورم بعد الإرسال
    closeForm();
}

// العداد المتزايد
const counters = document.querySelectorAll('.counter');
const dingSound = new Audio('ding-80828.mp3');

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        
        const speed = Math.max(target / 200, 1);

        const update = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                // ضبط الرقم النهائي
                if (target > 100) {
                    counter.innerText = target + "+";
                } else {
                    counter.innerText = target + "%";
                }
                // تشغيل الصوت بعد انتهاء العد
                setTimeout(() => {
                    dingSound.currentTime = 0;
                    dingSound.play().catch(() => {
                        console.log("تم منع تشغيل الصوت تلقائيًا من المتصفح");
                    });
                }, 50);
            }
        };
        update();
    });
};

// تشغيل العد عند ظهور القسم
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
    }
});

// ربط الأقسام بالـ observer
document.querySelectorAll('.impact-section, .impact').forEach(section => {
    observer.observe(section);
});

// الوضع الليلي
document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('darkToggle');
    
    // التحقق من الوضع المحفوظ
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        darkToggle.textContent = '☀️ الوضع النهاري';
    }
    
    // تبديل الوضع الليلي
    darkToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
            darkToggle.textContent = '☀️ الوضع النهاري';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkToggle.textContent = '🌙 الوضع الليلي';
        }
    });
    
    // تبديل اللغة (دالة أساسية)
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', function() {
        alert('ميزة الترجمة قريبًا إن شاء الله');
    });
});

// تهيئة التاريخ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ملء السنوات
    const yearSelect = document.getElementById("ageYear");
    const currentYear = new Date().getFullYear();
    
    // ملء السنوات من 1950 إلى السنة الحالية
    for(let y = 1950; y <= currentYear; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.text = y;
        yearSelect.appendChild(option);
    }
    
    // تعيين السنة الافتراضية
    if (currentYear >= 2026) {
        yearSelect.value = 2026;
    } else {
        yearSelect.value = currentYear;
    }
    
    // ملء الأيام
    const daySelect = document.getElementById("ageDay");
    for(let d = 1; d <= 31; d++) {
        const option = document.createElement("option");
        option.value = d;
        option.text = d;
        daySelect.appendChild(option);
    }
    
    // تعيين التاريخ الحالي
    const today = new Date();
    const monthSelect = document.getElementById("ageMonth");
    const day = today.getDate();
    
    // تعيين اليوم الحالي
    if (daySelect) {
        daySelect.value = day;
    }
    
    // تعيين الشهر الحالي (مع تعديل الفهرس)
    if (monthSelect) {
        // نبدأ من الفهرس 1 لأن الفهرس 0 هو "الشهر *"
        monthSelect.selectedIndex = today.getMonth() + 1;
    }
});

// تحسين تجربة المستخدم - إغلاق الفورم بضغط ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeForm();
    }
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-actions a');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY || window.pageYOffset;

  sections.forEach((section) => {
    if(scrollPos >= section.offsetTop - 100 && scrollPos < section.offsetTop + section.offsetHeight){
      navLinks.forEach(link => link.classList.remove('active'));
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-actions a[href="#${id}"]`);
      if(activeLink) activeLink.classList.add('active');
    }
  });
});

const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(btn => {
  btn.setAttribute('tabindex', '0'); // يسمح بالـ Tab
  btn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click(); // يفتح/يغلق FAQ
    }
  });
});
