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

                <!-- BADGES -->
                <span class="badge vip-badge">VIP</span>
                <span class="badge update-badge">${game.updateCount || ""}</span>
            </div>

            <div class="game-name">${game.name}</div>

            <!-- Buttons row -->
            <div class="action-buttons">
                <button class="btn-details btn-script">Script</button>
                ${game.shop && game.shop.length > 0 
                    ? `<button class="btn-details btn-shop">Shop Tài Nguyên</button>` 
                    : ""}
            </div>

            <!-- SCRIPT DETAILS -->
            <div class="script-box details-box">
                <b>Mô tả:</b> ${game.description}<br><br>
                <b>Features:</b>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
                <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>

            <!-- SHOP DETAILS -->
            <div class="shop-box details-box">
                ${(!game.shop || game.shop.length === 0)
                    ? `<i>❌ Game này không hỗ trợ tài nguyên.</i>`
                    : `
                        <b>Các gói tài nguyên:</b><br><br>
                        <ul>
                            ${game.shop.map(s => `<li>💠 ${s.name} → <b>${s.price}</b></li>`).join("")}
                        </ul>
                        <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>
                    `}
            </div>
        `;

        // Buttons
        const scriptBtn = el.querySelector(".btn-script");
        const shopBtn = el.querySelector(".btn-shop");
        const scriptBox = el.querySelector(".script-box");
        const shopBox = el.querySelector(".shop-box");

          // SCRIPT BUTTON
        scriptBtn.onclick = () => {
            scriptBox.classList.toggle("show");
            if (shopBox) shopBox.classList.remove("show");
        };
        
        // SHOP BUTTON
        if (shopBtn) {
            shopBtn.onclick = () => {
                shopBox.classList.toggle("show");
                scriptBox.classList.remove("show");
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

/* ===============================
        INIT LOAD
================================*/
animateCount(gamesData.length);
renderGames();


