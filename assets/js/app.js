/* ===== PAGINATION ===== */
const ITEMS_PER_PAGE = 25;
let currentPage = 1;

/* ===== SORT GAME ===== */
const sortedGames = gamesData.sort((a, b) => {
    if (a.updated && !b.updated) return -1;
    if (!a.updated && b.updated) return 1;

    return new Date(b.createdAt || "2000-01-01") - new Date(a.createdAt || "2000-01-01");
});

/* ===== RENDER PAGINATION ===== */
function renderPagination(totalPages) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        if (i === currentPage) btn.classList.add("active");

        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderGames();
        };

        container.appendChild(btn);
    }
}

/* ===== RENDER GAME ===== */
function renderGames() {
    const list = document.getElementById("gameList");
    list.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const items = sortedGames.slice(start, start + ITEMS_PER_PAGE);

    items.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        // Badge logic
        let bad = "";
        if (game.badge) bad += `<span class="badge badge-${game.badge.toLowerCase()}">${game.badge}</span>`;
        if (game.updated) bad += `<span class="badge badge-update">UPDATE</span>`;

        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${game.image}" class="game-img">
                <div class="badge-box">${bad}</div>
            </div>

            <div class="game-name">${game.name}</div>
            <button class="btn-details show-btn">Show Details</button>

            <div class="details-box">
                <b>Mô tả:</b> ${game.description}<br><br>

                <b>Features:</b>
                <ul>${(game.features || []).map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Giá tháng: ${game.monthly}K</div>
                <div class="price-box">💎 Vĩnh viễn: ${game.lifetime}K</div>

                <div class="updated-date">📅 Cập nhật: ${game.createdAt || "Không rõ"}</div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>
        `;

        card.querySelector(".btn-details").onclick = () => {
            const box = card.querySelector(".details-box");
            box.style.display = box.style.display === "block" ? "none" : "block";
        };

        list.appendChild(card);
    });

    renderPagination(Math.ceil(sortedGames.length / ITEMS_PER_PAGE));
}

renderGames();

/* UPDATE TOTAL COUNT */
document.getElementById("totalScripts").innerText = gamesData.length;
