const gameList = document.getElementById("gameList");
const itemsPerPage = 25;
let currentPage = 1;

/* ===========================
        RENDER PAGINATION
=========================== */
function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
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

/* ===========================
        RENDER GAMES
=========================== */
function renderGames() {
    gameList.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageData = gamesData.slice(start, end);

    pageData.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${game.image}" class="game-img">

                <span class="badge vip-badge">VIP</span>
                <span class="badge update-badge">${game.updateCount || 0}</span>
            </div>

            <div class="game-name">${game.name}</div>

            <div class="action-buttons">
                <button class="btn-script">Script</button>
                ${game.shop && game.shop.length > 0 
                    ? `<button class="btn-shop">Shop Tài Nguyên</button>`
                    : ""}
            </div>

            <!-- SCRIPT POPUP -->
            <div class="details-box script-box">
                <button class="close-box">✕</button>
                <b>Mô tả:</b> ${game.description}<br><br>
                <b>Features:</b>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
                <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>

            <!-- SHOP POPUP -->
            <div class="details-box shop-box">
                <button class="close-box">✕</button>

                ${
                    (!game.shop || game.shop.length === 0)
                        ? `<i>❌ Game này không hỗ trợ tài nguyên.</i>`
                        : `
                            <b>Các gói tài nguyên:</b><br><br>
                            <ul>
                                ${game.shop.map(s => `<li>💠 ${s.name} → <b>${s.price}</b></li>`).join("")}
                            </ul>
                            <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp tài nguyên</a>
                        `
                }
            </div>
        `;

        const scriptBtn = card.querySelector(".btn-script");
        const shopBtn = card.querySelector(".btn-shop");

        const scriptBox = card.querySelector(".script-box");
        const shopBox = card.querySelector(".shop-box");

        const closeBtns = card.querySelectorAll(".close-box");

        /* ================================
              CLICK SCRIPT
        ================================= */
        scriptBtn.onclick = () => {
            const isOpen = scriptBox.classList.contains("show");
            closeAllPopups();
            if (!isOpen) scriptBox.classList.add("show");
        };

        /* ================================
              CLICK SHOP
        ================================= */
        if (shopBtn) {
            shopBtn.onclick = () => {
                const isOpen = shopBox.classList.contains("show");
                closeAllPopups();
                if (!isOpen) shopBox.classList.add("show");
            };
        }

        /* ================================
              CLOSE POPUP (X button)
        ================================= */
        closeBtns.forEach(btn =>
            btn.onclick = () => {
                scriptBox.classList.remove("show");
                shopBox.classList.remove("show");
            }
        );

        gameList.appendChild(card);
    });

    renderPagination(Math.ceil(gamesData.length / itemsPerPage));
}

/* ===========================
    CLOSE ALL POPUPS
=========================== */
function closeAllPopups() {
    document.querySelectorAll(".details-box").forEach(box => {
        box.classList.remove("show");
    });
}

/* ===========================
   COUNT ANIMATION
=========================== */
function animateCount(target) {
    let start = 0;
    const counter = document.getElementById("totalScripts");

    const timer = setInterval(() => {
        start++;
        counter.innerText = start;

        if (start >= target) clearInterval(timer);
    }, 20);
}

/* ===========================
            INIT
=========================== */
animateCount(gamesData.length);
renderGames();
