// الأزرار والأقسام
const buttons = [
    { btn: document.getElementById("child4"), section: document.querySelector(".level1") },
    { btn: document.getElementById("child6"), section: document.querySelector(".level2") },
    { btn: document.getElementById("child8"), section: document.querySelector(".level3") }
];

// دالة تعرض القسم المختار وتخفي الباقي
function showLevel(selected) {
    buttons.forEach(function (item) {
        item.section.style.display = (item === selected) ? "flex" : "none";
    });
}

// عند الضغط على كل زر
buttons.forEach(function (item) {
    item.btn.addEventListener("click", function () {
        showLevel(item);
    });
});

// ================== حماية الفيديوهات (تصعيب مش منع تام) ==================
const videos = document.querySelectorAll("video");

videos.forEach(function (v) {
    // منع زرار التحميل وتشغيل الفيديو في نافذة منفصلة
    v.setAttribute("controlsList", "nodownload noplaybackrate");
    v.disablePictureInPicture = true;
    // منع الضغط كليك يمين على الفيديو
    v.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });
});

// منع كليك يمين على أي فيديو
document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "VIDEO") e.preventDefault();
});

// لما تتضغط PrintScreen: وقف الفيديوهات وامسح الكليب بورد
document.addEventListener("keyup", function (e) {
    if (e.key === "PrintScreen") {
        videos.forEach(function (v) { v.pause(); });
        if (navigator.clipboard) navigator.clipboard.writeText("").catch(function () {});
    }
});

// لما الصفحة تفقد التركيز (زي فتح أداة سكرين شوت): وقف الفيديوهات واخفيها
function hideVideos() {
    videos.forEach(function (v) {
        v.pause();
        v.style.visibility = "hidden";
    });
}
function showVideos() {
    videos.forEach(function (v) {
        v.style.visibility = "visible";
    });
}
window.addEventListener("blur", hideVideos);
window.addEventListener("focus", showVideos);
document.addEventListener("visibilitychange", function () {
    if (document.hidden) hideVideos(); else showVideos();
});
