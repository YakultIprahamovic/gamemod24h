// ===========================
// CHỐNG DEVTOOLS
// ===========================
setInterval(() => {
    const threshold = 160;
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
        logout();
        alert("DevTools bị phát hiện! Bạn đã bị đăng xuất.");
    }
}, 800);

// ===========================
// AUTO LOGOUT SAU 15 PHÚT
// ===========================
const timeout = 15 * 60 * 1000;

function checkActivity() {
    const last = localStorage.getItem("yakult_last_active");
    if (!last || Date.now() - last > timeout) {
        logout();
    }
}
setInterval(checkActivity, 10000);

document.onclick = () =>
    localStorage.setItem("yakult_last_active", Date.now());
document.onkeypress = () =>
    localStorage.setItem("yakult_last_active", Date.now());

// ===========================
// LOGOUT
// ===========================
function logout() {
    localStorage.removeItem("yakult_admin_token");
    window.location.href = "admin-login.html";
}

// ===========================
// PHẦN QUẢN TRỊ GAME
// ===========================
/* (TOÀN BỘ CODE admin.js gốc của bạn để render game, thêm game, xóa game...) */
