const gameList = document.getElementById("gameList");

gamesData.forEach(game => {
    const el = document.createElement("div");
    el.className = "game-card";

    el.innerHTML = `
        <img src="${game.image}" class="game-img">

        <div class="game-name">${game.name}</div>

        <div class="action-buttons">
            <button class="btn-details btn-script">Script</button>
            ${game.shop && game.shop.length > 0 
                ? `<button class="btn-details btn-shop">Shop Tài Nguyên</button>` 
                : ""}
        </div>

        <!-- SCRIPT BOX -->
        <div class="script-box details-box">
            <b>Mô tả:</b> ${game.description}<br><br>

            <b>Features:</b>
            <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

            <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
            <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

            <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
            <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
        </div>

        <!-- SHOP BOX -->
        <div class="shop-box details-box">
            <b>Các gói tài nguyên:</b><br><br>

            ${(!game.shop || game.shop.length === 0)
                ? `<i>❌ Game này không hỗ trợ tài nguyên.</i>`
                : `
                    <ul>
                        ${game.shop.map(s => `
                            <li>💠 ${s.name} → <b>${s.price}</b></li>
                        `).join("")}
                    </ul>
                    <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ nạp tài nguyên</a>
                `
            }
        </div>
    `;

    // BUTTON HANDLERS
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
    }

    gameList.appendChild(el);
});
