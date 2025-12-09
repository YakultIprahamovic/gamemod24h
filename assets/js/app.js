const gameList = document.getElementById("gameList");
const bestList = document.getElementById("bestList");

const itemsPerPage = 25;
let currentPage = 1;

/* =====================================
    SORT GAME — NEWEST UPDATE FIRST
===================================== */
gamesData.sort((a, b) => new Date(b.updated) - new Date(a.updated));

/* =====================================
    RENDER BEST SELLERS
===================================== */
function renderBestSellers() {
    if (!bestList) return;

    bestList.innerHTML = "";

    const bestGames = gamesData.filter(g => g.bestSeller).slice(0, 4);

    bestGames.forEach(game => {
        const el = document.createElement("div");
        el.className = "game-card";

        el.innerHTML = `
            <div class="image-wrapper">
                <img src="${game.image}" class="game-img">
                <span class="badge vip-badge">VIP</span>
                <span class="badge update-badge">${game.updateCount || 0}</span>
            </div>

            <div class="game-name">${game.name}</div>
            <div style="font-size:13px;color:#00eaff;margin-top:4px;">
                ⏱ Update: ${game.updated}
            </div>
        `;

        bestList.appendChild(el);
    });
}

/* =====================================
    PAGINATION
===================================== */
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

/* =====================================
    RENDER GAME LIST
===================================== */
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
            <div class="update-date">⏱ ${game.updated}</div>

            <div class="action-buttons">
                <button class="btn-script">Script</button>
                ${game.shop && game.shop.length > 0 
                    ? `<button class="btn-shop">Shop Tài Nguyên</button>`
                    : ""
                }
            </div>

            <div class="details-box script-box">
                <button class="close-box">✕</button>

                <b>Mô tả:</b> ${game.description}<br><br>

                <b>Features:</b>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Tháng: <b>${game.monthly}K</b></div>
                <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>

            <div class="details-box shop-box">
                <button class="close-box">✕</button>

                ${
                    (!game.shop || game.shop.length === 0)
                    ? `<i>❌ Game này không hỗ trợ tài nguyên.</i>`
                    : `
                        <b>Danh sách gói tài nguyên:</b><br><br>
                        <ul>
                            ${game.shop.map(s => `<li>💠 ${s.name}: <b>${s.price}</b></li>`).join("")}
                        </ul>

                        <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>
                    `
                }
            </div>
        `;

        const scriptBtn = card.querySelector(".btn-script");
        const shopBtn = card.querySelector(".btn-shop");
        const scriptBox = card.querySelector(".script-box");
        const shopBox = card.querySelector(".shop-box");

        scriptBtn.onclick = () => {
            const open = scriptBox.classList.contains("show");
            closeAllPopups();
            if (!open) scriptBox.classList.add("show");
        };

        if (shopBtn) {
            shopBtn.onclick = () => {
                const open = shopBox.classList.contains("show");
                closeAllPopups();
                if (!open) shopBox.classList.add("show");
            };
        }

        card.querySelectorAll(".close-box").forEach(btn => {
            btn.onclick = () => {
                scriptBox.classList.remove("show");
                shopBox.classList.remove("show");
            };
        });

        gameList.appendChild(card);
    });

    renderPagination(Math.ceil(gamesData.length / itemsPerPage));
}

/* =====================================
    CLOSE ALL POPUPS
===================================== */
function closeAllPopups() {
    document.querySelectorAll(".details-box").forEach(box => {
        box.classList.remove("show");
    });
}

/* =====================================
    COUNT ANIMATION
===================================== */
function animateCount(target) {
    let start = 0;
    const counter = document.getElementById("totalScripts");

    const timer = setInterval(() => {
        start++;
        counter.innerText = start;

        if (start >= target) clearInterval(timer);
    }, 20);
}

/* =====================================
                INIT
===================================== */
animateCount(gamesData.length);
renderBestSellers();
renderGames();
