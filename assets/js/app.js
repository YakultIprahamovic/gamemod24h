const gameList = document.getElementById("gameList");
const pagination = document.getElementById("pagination");

const gamesPerPage = 25; // 5 hàng × 5 cột
let currentPage = 1;

// Sắp xếp game: updated → lên đầu
let sortedGames = [...gamesData].sort((a, b) => {
    return (b.updated === true) - (a.updated === true);
});

function renderGames(page) {
    gameList.innerHTML = "";
    pagination.innerHTML = "";

    const start = (page - 1) * gamesPerPage;
    const end = start + gamesPerPage;

    const pageGames = sortedGames.slice(start, end);

    pageGames.forEach(game => {
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

                <a href="https://t.me/YakultIpramovic" class="btn-buy">Mua ngay</a>
                <a href="https://t.me/YakultIpramovic" class="btn-update">Yêu cầu cập nhật</a>
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

function renderPagination() {
    const totalPages = Math.ceil(sortedGames.length / gamesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn" + (i === currentPage ? " active" : "");
        btn.innerText = i;

        btn.addEventListener("click", () => {
            currentPage = i;
            renderGames(i);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        pagination.appendChild(btn);
    }
}

// Khởi chạy trang đầu
renderGames(1);
