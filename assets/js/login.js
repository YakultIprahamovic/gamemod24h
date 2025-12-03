// USERNAME & SHA256 PASSWORD HASH
const ADMIN_USERNAME = "yakult_admin";
const ADMIN_PASSWORD_HASH = "f88496b0dd14940bb0e3c1a5e96b4ea737c75406e42b065bfeeba4eaa0f2e8c3";

// SHA-256 Hàm mã hoá mật khẩu
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// LOGIN
async function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (user !== ADMIN_USERNAME) {
        document.getElementById("error").innerText = "Sai username!";
        return;
    }

    const hashed = await sha256(pass);

    if (hashed !== ADMIN_PASSWORD_HASH) {
        document.getElementById("error").innerText = "Sai mật khẩu!";
        return;
    }

    // Lưu token đăng nhập
    localStorage.setItem("yakult_admin_token", "logged");

    // Chuyển sang admin panel
    window.location.href = "admin.html";
}
