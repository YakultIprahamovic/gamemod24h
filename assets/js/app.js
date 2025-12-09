/* ==============================
      DOM ELEMENTS
============================== */
const gameList = document.getElementById("gameList");
const bestList = document.getElementById("bestList");

const itemsPerPage = 25;
let currentPage = 1;

/* ==============================
   SORT GAME – NEWEST FIRST
============================== */
gamesData.sort((a, b) => new Date(b.updated) - new Date(a.updated));

/* ==============================
        BEST SELLERS (Top 4)
============================== */
function renderBestSellers() {
    if (!bestList) return;

    bestList.innerHTML = "";

    const bestGames = gamesData
        .filter(g => g.bestSeller)
        .slice(0, 4);

    const rankIcons = ["🥇", "🥈", "🥉", "🔥"];
    const rankClass = ["rank-1", "rank-2", "rank-3", "rank-4"];

    bestGames.forEach((game, index) => {
        const card = document.createElement("div");
        card.className = "game-card best-seller-card";

        card.innerHTML = `
            <span class="hot-badge">🔥 HOT</span>

            <div class="image-wrapper">
                <img src="${game.image}" class="game-img">
                <span class="badge vip-badge">VIP</span>
                <span class="badge update-badge">${game.updateCount || 0}</span>
            </div>

            <div class="rank-badge ${rankClass[index]}">
                ${rankIcons[index]}
            </div>

            <div class="game-name">${game.name}</div>
            <div class="update-date">⏱ ${game.updated}</div>

            <div class="action-buttons">
                <button class="btn-script">Script</button>
                ${game.shop?.length ? `<button class="btn-shop">Shop Tài Nguyên</button>` : ""}
            </div>

            <!-- SCRIPT POPUP -->
            <div class="details-box script-box">
                <button class="close-box">✕</button>
                <b>Mô tả:</b> ${game.description}<br><br>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>
                <div class="price-box">💳 ${game.monthly}K / tháng</div>
                <div class="price-box">💎 ${game.lifetime}K vĩnh viễn</div>
                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
            </div>

            <!-- SHOP POPUP -->
            <div class="details-box shop-box">
                <button class="close-box">✕</button>
                ${
                    !game.shop?.length
                    ? `<i>❌ Không hỗ trợ Shop tài nguyên.</i>`
                    : `
                        <b>Gói tài nguyên:</b><br><br>
                        <ul>${game.shop.map(s => `<li>💠 ${s.name} — <b>${s.price}</b></li>`).join("")}</ul>
                        <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>
                      `
                }
            </div>
        `;

        /* BUTTON LOGIC */
        const sBtn = card.querySelector(".btn-script");
        const shopBtn = card.querySelector(".btn-shop");
        const sBox = card.querySelector(".script-box");
        const shBox = card.querySelector(".shop-box");

        sBtn.onclick = () => {
            const open = sBox.classList.contains("show");
            closeAllPopups();
            if (!open) sBox.classList.add("show");
        };

        if (shopBtn) {
            shopBtn.onclick = () => {
                const open = shBox.classList.contains("show");
                closeAllPopups();
                if (!open) shBox.classList.add("show");
            };
        }

        card.querySelectorAll(".close-box").forEach(x =>
            x.onclick = () => {
                sBox.classList.remove("show");
                shBox.classList.remove("show");
            }
        );

        bestList.appendChild(card);
    });
}

/* ==============================
        CLOSE ALL POPUPS
============================== */
function closeAllPopups() {
    document.querySelectorAll(".details-box").forEach(box => box.classList.remove("show"));
}

/* ==============================
        RENDER GAME LIST
============================== */
function renderGames() {
    gameList.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const list = gamesData.slice(start, end);

    list.forEach(game => {
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
                ${game.shop?.length ? `<button class="btn-shop">Shop Tài Nguyên</button>` : ""}
            </div>

            <div class="details-box script-box">
                <button class="close-box">✕</button>
                <b>Mô tả:</b> ${game.description}<br><br>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>
                <div class="price-box">💳 ${game.monthly}K</div>
                <div class="price-box">💎 ${game.lifetime}K</div>
                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
            </div>

            <div class="details-box shop-box">
                <button class="close-box">✕</button>
                ${
                    !game.shop?.length
                    ? `<i>❌ Không hỗ trợ tài nguyên.</i>`
                    : `
                        <b>Gói tài nguyên:</b><br><br>
                        <ul>${game.shop.map(s => `<li>💠 ${s.name}: <b>${s.price}</b></li>`).join("")}</ul>
                        <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>
                      `
                }
            </div>
        `;

        const sBtn = card.querySelector(".btn-script");
        const shBtn = card.querySelector(".btn-shop");
        const sBox = card.querySelector(".script-box");
        const shBox = card.querySelector(".shop-box");

        sBtn.onclick = () => {
            const open = sBox.classList.contains("show");
            closeAllPopups();
            if (!open) sBox.classList.add("show");
        };

        if (shBtn) {
            shBtn.onclick = () => {
                const open = shBox.classList.contains("show");
                closeAllPopups();
                if (!open) shBox.classList.add("show");
            };
        }

        card.querySelectorAll(".close-box").forEach(x =>
            x.onclick = () => {
                sBox.classList.remove("show");
                shBox.classList.remove("show");
            }
        );

        gameList.appendChild(card);
    });

    renderPagination(Math.ceil(gamesData.length / itemsPerPage));
}

/* ==============================
         PAGINATION
============================== */
function renderPagination(total) {
    const pag = document.getElementById("pagination");
    pag.innerHTML = "";

    for (let i = 1; i <= total; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        btn.textContent = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            renderGames();
            closeAllPopups();
        };

        pag.appendChild(btn);
    }
}

/* ==============================
           INIT
============================== */
animateCount(gamesData.length);
renderBestSellers();
renderGames();
