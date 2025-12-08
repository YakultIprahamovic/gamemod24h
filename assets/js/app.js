// ====== PAGINATION CONFIG ======
const ITEMS_PER_PAGE = 25;
let currentPage = 1;

// ====== SORT GAME BY UPDATED + DATE ======
const sortedGames = gamesData.sort((a, b) => {
    if (a.updated && !b.updated) return -1;
    if (!a.updated && b.updated) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
});

// ====== RENDER PAGINATION ======
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

// ====== RENDER GAME LIST ======
function renderGames() {
    const gameList = document.getElementById("gameList");
    gameList.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const pageItems = sortedGames.slice(start, end);

    pageItems.forEach(game => {
        const el = document.createElement("div");
        el.className = "game-card";

        // Badge logic
        let badgeHTML = "";
        if (game.badge)
            badgeHTML += `<span class="badge badge-${game.badge.toLowerCase()}">${game.badge}</span>`;
        if (game.updated)
            badgeHTML += `<span class="badge badge-update">UPDATE</span>`;

        el.innerHTML = `
            <div class="img-wrapper">
                <img src="${game.image}" class="game-img">
                <div class="badge-box">${badgeHTML}</div>
            </div>

            <div class="game-title">${game.name}</div>

            <button class="btn-details show-btn">Show Details</button>

            <div class="details-box">
                <b>Mô tả:</b> ${game.description}<br><br>

                <b>Features:</b>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
                <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                <div class="updated-date">📅 Cập nhật: ${game.createdAt}</div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>
        `;

        // Toggle details
        el.querySelector(".btn-details").onclick = () => {
            const box = el.querySelector(".details-box");
            box.style.display = box.style.display === "block" ? "none" : "block";
        };

        gameList.appendChild(el);
    });

    // Re-render pagination
    const totalPages = Math.ceil(sortedGames.length / ITEMS_PER_PAGE);
    renderPagination(totalPages);
}

renderGames();
document.getElementById("totalScripts").innerText = gamesData.length;
