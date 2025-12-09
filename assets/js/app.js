/* ==============================
      BEST SELLER (One Horizontal Line)
============================== */
function renderBestSellers() {
    if (!bestList) return;

    bestList.innerHTML = "";

    // Lấy 4 game bán chạy nhất
    const bestGames = [...gamesData]
        .filter(g => g.bestSeller)
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 4);

    const rankIcons = ["🥇", "🥈", "🥉", "⭐"];
    const rankClass = ["rank-1", "rank-2", "rank-3", "rank-4"];

    bestGames.forEach((game, index) => {
        const card = document.createElement("div");
        card.className = "bestseller-card";

        card.innerHTML = `
            <div class="best-img-box">
                <img src="${game.image}" class="best-img">

                <span class="hot-badge">🔥 HOT</span>
                <span class="rank-badge ${rankClass[index]}">${rankIcons[index]}</span>
            </div>

            <div class="bestseller-name">${game.name}</div>

            <div class="bestseller-meta">
                ⏱ ${game.updated}<br>
                🛒 Đã bán: <b>${game.soldCount || 0}</b>
            </div>

            <div class="best-btn-box">
                <button class="best-btn best-btn-script">Script</button>
                ${game.shop ? `<button class="best-btn best-btn-shop">Shop</button>` : ""}
            </div>

            <!-- SCRIPT POPUP -->
            <div class="details-box script-box">
                <button class="close-box">✕</button>

                <h3>Script – ${game.name}</h3>
                <p>${game.description}</p>

                <b>Features:</b>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 ${game.monthly}K</div>
                <div class="price-box">💎 ${game.lifetime}K</div>
                <a href="https://t.me/YakultIpramovic" class="btn-buy">Mua ngay</a>
            </div>

            <!-- SHOP POPUP -->
            <div class="details-box shop-box">
                <button class="close-box">✕</button>

                ${
                    !game.shop
                    ? `<i>Không hỗ trợ tài nguyên</i>`
                    : `<ul>${game.shop.map(s => `<li>💠 ${s.name}: <b>${s.price}</b></li>`).join("")}</ul>
                       <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>`
                }
            </div>
        `;

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

        card.querySelectorAll(".close-box").forEach(btn => {
            btn.onclick = () => {
                scriptBox.classList.remove("show");
                shopBox.classList.remove("show");
            };
        });

        bestList.appendChild(card);
    });
}
