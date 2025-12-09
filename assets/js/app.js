/* =====================================
      RENDER BEST SELLERS – SORT BY SOLD
===================================== */
function renderBestSellers() {
    if (!bestList) return;

    bestList.innerHTML = "";

    // Sắp xếp theo số lượng bán giảm dần
    const bestGames = [...gamesData]
        .filter(g => g.bestSeller)
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 4);

    // Icon rank và CSS
    const rankIcons = ["🥇", "🥈", "🥉", "⭐"];
    const rankClass = ["rank-1", "rank-2", "rank-3", "rank-4"];

    bestGames.forEach((game, index) => {
        const row = document.createElement("div");
        row.className = "best-seller-row";

        row.innerHTML = `
            <div class="best-left">
                <img src="${game.image}" class="best-img">

                <span class="hot-badge">🔥 HOT</span>
                <span class="rank-circle ${rankClass[index]}">${rankIcons[index]}</span>
            </div>

            <div class="best-right">
                <h3 class="best-title">${game.name}</h3>

                <p class="best-meta">
                    ⏱ Cập nhật: <b>${game.updated}</b>
                    • 🛒 Đã bán: <b>${game.soldCount || 0}</b>
                </p>

                <div class="best-features">
                    <b>Features:</b>
                    <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>
                </div>

                <p class="best-price">
                    💳 Tháng: <b>${game.monthly}K</b>  
                    • 💎 Vĩnh viễn: <b>${game.lifetime}K</b>
                </p>

                <!-- BUTTONS -->
                <div class="best-buttons">
                    <button class="best-btn-script btn-script">Script</button>
                    ${game.shop ? `<button class="best-btn-shop btn-shop">Shop Tài Nguyên</button>` : ""}
                </div>

                <!-- SCRIPT POPUP -->
                <div class="details-box script-box">
                    <button class="close-box">✕</button>
                    <h4>Script – ${game.name}</h4>
                    <p><b>Mô tả:</b> ${game.description}</p>

                    <b>Features:</b>
                    <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                    <div class="price-box">💳 Tháng: <b>${game.monthly}K</b></div>
                    <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                    <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                </div>

                <!-- SHOP POPUP -->
                <div class="details-box shop-box">
                    <button class="close-box">✕</button>
                    <h4>Shop tài nguyên</h4>

                    ${
                        !game.shop ? 
                        `<i>❌ Không hỗ trợ tài nguyên.</i>`
                        :
                        `<ul>
                            ${game.shop.map(s => `<li>💠 ${s.name} — <b>${s.price}</b></li>`).join("")}
                        </ul>
                        <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp</a>`
                    }
                </div>
            </div>
        `;

        // Button Actions
        const scriptBtn = row.querySelector(".btn-script");
        const shopBtn = row.querySelector(".btn-shop");
        const scriptBox = row.querySelector(".script-box");
        const shopBox = row.querySelector(".shop-box");

        // Open script popup
        scriptBtn.onclick = () => {
            const open = scriptBox.classList.contains("show");
            closeAllPopups();
            if (!open) scriptBox.classList.add("show");
        };

        // Open shop popup
        if (shopBtn) {
            shopBtn.onclick = () => {
                const open = shopBox.classList.contains("show");
                closeAllPopups();
                if (!open) shopBox.classList.add("show");
            };
        }

        // Close popup
        row.querySelectorAll(".close-box").forEach(btn => {
            btn.onclick = () => {
                scriptBox.classList.remove("show");
                shopBox.classList.remove("show");
            };
        });

        bestList.appendChild(row);
    });
}
