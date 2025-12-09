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
   BEST SELLER – ONE LINE HORIZONTAL ROW
===================================== */
function renderBestSellers() {
    if (!bestList) return;

    bestList.innerHTML = "";

    // Top 4 game bán chạy nhất
    const bestGames = [...gamesData]
        .filter(g => g.bestSeller)
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 4);

    bestGames.forEach((game, index) => {

        const row = document.createElement("div");
        row.className = "bestseller-horizontal";

        row.innerHTML = `
            <div class="best-col-img">
                <span class="hot-badge">🔥 HOT</span>
                <img src="${game.image}" class="best-img-large">
            </div>

            <div class="best-col-info">
                <h2 class="best-title">${game.name}</h2>

                <p class="best-meta">
                    ⏱ Cập nhật: <b>${game.updated}</b>  
                    • 🛒 Đã bán: <b>${game.soldCount || 0}</b>
                </p>

                <div class="best-features">
                    <b>Features:</b>
                    <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>
                </div>

                <p class="best-description">
                    <b>Mô tả:</b> ${game.description}
                </p>

                <p class="best-price">
                    💳 Tháng: <b>${game.monthly}K</b>
                    • 💎 Vĩnh viễn: <b>${game.lifetime}K</b>
                </p>

                <div class="best-buttons">
                    <button class="btn-script">Script</button>
                    ${game.shop ? `<button class="btn-shop">Shop Tài Nguyên</button>` : ""}
                </div>

                <!-- POPUP SCRIPT -->
                <div class="details-box script-box">
                    <button class="close-box">✕</button>
                    <h3>Script – ${game.name}</h3>

                    <b>Mô tả:</b> ${game.description}<br><br>

                    <b>Features:</b>
                    <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                    <div class="price-box">💳 Tháng: <b>${game.monthly}K</b></div>
                    <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                    <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                </div>

                <!-- POPUP SHOP -->
                <div class="details-box shop-box">
                    <button class="close-box">✕</button>
                    <h3>Shop tài nguyên</h3>

                    ${
                        !game.shop ? 
                        `<i>Không hỗ trợ tài nguyên</i>` :
                        `<ul>${game.shop.map(s => `<li>💠 ${s.name}: <b>${s.price}</b></li>`).join("")}</ul>
                         <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>`
                    }
                </div>
            </div>
        `;

        const scriptBtn = row.querySelector(".btn-script");
        const shopBtn = row.querySelector(".btn-shop");
        const scriptBox = row.querySelector(".script-box");
        const shopBox = row.querySelector(".shop-box");

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

        row.querySelectorAll(".close-box").forEach(btn =>
            btn.onclick = () => {
                scriptBox.classList.remove("show");
                shopBox.classList.remove("show");
            }
        );

        bestList.appendChild(row);
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
                    !game.shop?.length ?
                    `<i>❌ Không hỗ trợ tài nguyên.</i>`
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
        counter.style.transform = "scale(1.25)";
        counter.style.transition = "0.2s";

        setTimeout(() => {
            counter.style.transform = "scale(1)";
        }, 150);

        if (start >= target) clearInterval(timer);
    }, 20);
}

/* ==============================
           INIT
============================== */
animateCount(gamesData.length);
renderBestSellers();
renderGames();




