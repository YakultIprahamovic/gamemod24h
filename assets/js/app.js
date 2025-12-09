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

/* =====================================
   BEST SELLER – ONE LINE HORIZONTAL
===================================== */
/* ============================================
      BEST SELLER – 4 CARD / 1 ROW
============================================ */
function renderBestSellers() {
    if (!bestList) return;

    bestList.innerHTML = "";

    const bestGames = [...gamesData]
        .filter(g => g.bestSeller)
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 4);

    const rankIcons = ["Top 1", "Top 2", "Top 3", "Top 4"];
    const rankClass = ["rank-1", "rank-2", "rank-3", "rank-4"];

    bestGames.forEach((game, index) => {

        const card = document.createElement("div");
        card.className = "bestseller-card";

        card.innerHTML = `
            <div class="best-img-wrapper">
                <img src="${game.image}" class="best-img">

                <span class="hot-badge">🔥 HOT</span>
                <span class="rank-badge ${rankClass[index]}">${rankIcons[index]}</span>
            </div>

            <div class="best-info">
                <div class="bestseller-name">${game.name}</div>

                <div class="bestseller-meta">
                    ⏱ <b>${game.updated}</b><br>
                    🛒 Đã bán: <b>${game.soldCount || 0}</b>
                </div>

                <div class="best-features">
                    <b>Features:</b>
                    <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>
                </div>

                <div class="best-description">
                    <b>Mô tả:</b> ${game.description}
                </div>

                <div class="best-price">
                    💳 <b>${game.monthly}K / tháng</b><br>
                    💎 <b>${game.lifetime}K / vĩnh viễn</b>
                </div>

                <div class="best-buttons">
                    <button class="best-btn best-btn-script">Script</button>
                    ${game.shop ? `<button class="best-btn best-btn-shop">Shop</button>` : ""}
                </div>

                <!-- POPUP SCRIPT -->
                <div class="details-box script-box">
                    <button class="close-box">✕</button>

                    <h3>Script – ${game.name}</h3>
                    <p>${game.description}</p>

                    <b>Features:</b>
                    <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                    <div class="price-box">💳 ${game.monthly}K</div>
                    <div class="price-box">💎 ${game.lifetime}K</div>

                    <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                </div>

                <!-- POPUP SHOP -->
                <div class="details-box shop-box">
                    <button class="close-box">✕</button>

                    ${
                        !game.shop
                        ? `<i>Không hỗ trợ Shop tài nguyên</i>`
                        : `<ul>${game.shop.map(s => `<li>💠 ${s.name}: <b>${s.price}</b></li>`).join("")}</ul>
                           <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>`
                    }
                </div>
            </div>
        `;

        // Buttons
        const scriptBtn = card.querySelector(".best-btn-script");
        const shopBtn = card.querySelector(".best-btn-shop");
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

        // Close popup
        card.querySelectorAll(".close-box").forEach(btn => {
            btn.onclick = () => {
                scriptBox.classList.remove("show");
                shopBox.classList.remove("show");
            };
        });

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
        RENDER GAME GRID
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
                    :
                    `<b>Gói tài nguyên:</b><br><br>
                    <ul>${game.shop.map(s => `<li>💠 ${s.name}: <b>${s.price}</b></li>`).join("")}</ul>
                    <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>`
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

        card.querySelectorAll(".close-box").forEach(btn => {
            btn.onclick = () => {
                sBox.classList.remove("show");
                shBox.classList.remove("show");
            };
        });

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
      COUNT ANIMATION
============================== */
function animateCount(target) {
    let start = 0;
    const counter = document.getElementById("totalScripts");

    const timer = setInterval(() => {
        start++;
        counter.innerText = start;

        if (start >= target) clearInterval(timer);
    }, 20);
}

/* ==============================
           INIT
============================== */
animateCount(gamesData.length);
renderBestSellers();
renderGames();
/* ==================================
   🚀 AUTO SLIDE BEST SELLER
================================== */
let bestScrollPos = 0;

setInterval(() => {
    const box = document.getElementById("bestList");
    if (!box) return;

    bestScrollPos += 460; // mỗi card rộng 450px + khoảng cách
    if (bestScrollPos >= box.scrollWidth) {
        bestScrollPos = 0;
    }

    box.scrollTo({
        left: bestScrollPos,
        behavior: "smooth"
    });

}, 3500);  // 3.5 giây đổi 1 card


