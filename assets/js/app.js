/* ===============================
        GET ELEMENTS
================================*/
const gameList = document.getElementById("gameList");
const itemsPerPage = 25;
let currentPage = 1;

/* ===============================
        PAGINATION RENDER
================================*/
function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    if (!pagination) return;

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        btn.innerText = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            renderGames();
        };

        pagination.appendChild(btn);
    }
}

/* ===============================
        RENDER GAME CARDS
================================*/
function renderGames() {
    gameList.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = gamesData.slice(start, end);

pageData.forEach(game => {

    const el = document.createElement("div");
    el.className = "game-card";

    el.innerHTML = `
        <div class="image-wrapper">
            <img src="${game.image}" class="game-img">

            <span class="badge vip-badge animate-badge">VIP</span>
            <span class="badge update-badge animate-badge">${game.updateCount || 0}</span>
        </div>

        <div class="game-name">${game.name}</div>

        <div class="action-buttons">
            <button class="btn-details btn-script">Script</button>
            ${game.shop && game.shop.length > 0 
                ? `<button class="btn-details btn-shop">Shop Tài Nguyên</button>`
                : ""}
        </div>

        <div class="script-box details-box">
            <button class="close-box">✕</button>
            <b>Mô tả:</b> ${game.description}<br><br>
            <b>Features:</b>
            <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

            <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
            <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

            <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
            <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
        </div>

        <div class="shop-box details-box">
            <button class="close-box">✕</button>
            ${(!game.shop || game.shop.length === 0)
                ? `<i>❌ Game này không hỗ trợ tài nguyên.</i>`
                : `
                    <b>Các gói tài nguyên:</b><br><br>
                    <ul>
                        ${game.shop.map(s => `<li>💠 ${s.name} → <b>${s.price}</b></li>`).join("")}
                    </ul>
                    <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp tài nguyên</a>
                `}
        </div>
    `;

    // Nút Script
    const scriptBtn = el.querySelector(".btn-script");
    const shopBtn = el.querySelector(".btn-shop");
    const scriptBox = el.querySelector(".script-box");
    const shopBox = el.querySelector(".shop-box");

    scriptBtn.onclick = () => {
        scriptBox.style.display = scriptBox.style.display === "block" ? "none" : "block";
        if (shopBox) shopBox.style.display = "none";
    };

    if (shopBtn) {
        shopBtn.onclick = () => {
            shopBox.style.display = shopBox.style.display === "block" ? "none" : "block";
            scriptBox.style.display = "none";
        };

    // Nút X đóng popup
    el.querySelectorAll(".close-box").forEach(btn => {
        btn.onclick = () => {
            scriptBox.style.display = "none";
            if (shopBox) shopBox.style.display = "none";
        };
    });

    gameList.appendChild(el);
});

        // Đóng tất cả trước
        document.querySelectorAll(".details-box").forEach(b => b.classList.remove("show"));

        // Nếu đang mở → đóng, đang đóng → mở
        if (!isOpen) shopBox.classList.add("show");
    };
}



        gameList.appendChild(el);
    });

    renderPagination(Math.ceil(gamesData.length / itemsPerPage));
}

/* ===============================
        COUNT ANIMATION
================================*/
function animateCount(target) {
    let start = 0;
    const end = target;
    const speed = 20;

    const counter = document.getElementById("totalScripts");

    function update() {
        if (start < end) {
            start++;
            counter.innerText = start;

            counter.style.transform = "scale(1.3)";
            counter.style.opacity = "0.8";

            setTimeout(() => {
                counter.style.transform = "scale(1)";
                counter.style.opacity = "1";
            }, 100);

            setTimeout(update, speed);
        }
    }
    update();
}


document.addEventListener("click", function(e) {
    if (!e.target.closest(".details-box") && !e.target.closest(".btn-details")) {
        document.querySelectorAll(".details-box").forEach(box => box.classList.remove("show"));
    }
});


/* ===============================
        INIT LOAD
================================*/
animateCount(gamesData.length);
renderGames();









