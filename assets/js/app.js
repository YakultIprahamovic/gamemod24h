const gameList = document.getElementById("gameList");
const gamesPerPage = 25;  // 5 cột × 5 hàng
let currentPage = 1;

// ===== SẮP XẾP GAME: UPDATED → lên đầu =====
let sortedGames = [...gamesData].sort((a, b) => {
    return (b.updated === true) - (a.updated === true);
});

// ===== RENDER TRANG =====
function renderGames(page) {
    gameList.innerHTML = "";

    const start = (page - 1) * gamesPerPage;
    const end = start + gamesPerPage;

    const gamesToShow = sortedGames.slice(start, end);

    gamesToShow.forEach(game => {
        const el = document.createElement("div");
        el.className = "game-card";

        el.innerHTML = `
            <img src="${game.image}" class="game-img">

            <div class="game-name">${game.name}</div>

            <div class="badge-wrap">
                ${game.sale ? `<div class="badge-sale">🔥 SALE</div>` : ""}
                ${game.updated ? `<div class="badge-update">✨ UPDATE</div>` : ""}
            </div>

            <button class="btn-details">Show Details</button>

            <div class="details-box">
                <b>Mô tả:</b> ${game.description}<br><br>

                <b>Features:</b>
                <ul>${game.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
                <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>
        `;

        el.querySelector(".btn-details").onclick = () => {
            const box = el.querySelector(".details-box");
            box.style.display = box.style.display === "block" ? "none" : "block";
        };

        gameList.appendChild(el);
    });

    renderPagination();
}

// ===== NÚT CHUYỂN TRANG =====
function renderPagination() {
    const totalPages = Math.ceil(sortedGames.length / gamesPerPage);

    let paginationHTML = `<div class="pagination">`;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentPage ? "active" : ""}"
                    onclick="goToPage(${i})">${i}</button>
        `;
    }

    paginationHTML += `</div>`;

    document.getElementById("games").insertAdjacentHTML("beforeend", paginationHTML);
}

// ===== ĐI ĐẾN TRANG =====
function goToPage(page) {
    currentPage = page;
    renderGames(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== KHỞI TẠO =====
renderGames(1);
