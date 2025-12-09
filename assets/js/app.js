/* ============================
        CONFIG
============================ */
const ITEMS_PER_PAGE = 25;
let currentPage = 1;

/* ============================
        SORT GAME
============================ */
// - Game có updated: true nằm trên cùng
// - Nếu cùng updated, so createdAt
const sortedGames = gamesData.sort((a, b) => {
    if (a.updated && !b.updated) return -1;
    if (!a.updated && b.updated) return 1;

    return new Date(b.createdAt || "2000-01-01") - new Date(a.createdAt || "2000-01-01");
});


/* ============================
    RENDER PAGINATION
============================ */
function renderPagination(totalPages) {
    const pag = document.getElementById("pagination");
    pag.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        if (i === currentPage) btn.classList.add("active");
        btn.innerText = i;

        btn.onclick = () => {
            currentPage = i;
            renderGames();
        };

        pag.appendChild(btn);
    }
}


/* ============================
        RENDER GAME LIST
============================ */
function renderGames() {
    const list = document.getElementById("gameList");
    list.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const items = sortedGames.slice(start, start + ITEMS_PER_PAGE);

    items.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        /* BADGE */
        let badges = "";

        // Badge VIP / SALE (game.badge chứa: "VIP", "SALE",...)
        if (game.badge) {
            badges += `<span class="badge badge-${game.badge.toLowerCase()}">${game.badge}</span>`;
        }

        // Badge UPDATE (luôn nằm dưới SALE)
        if (game.updated) {
            badges += `<span class="badge badge-update">Update</span>`;
        }

        // Nếu game FREE
        if (game.free) {
            badges += `<span class="badge badge-free">FREE</span>`;
        }

        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${game.image}" class="game-img">
                <div class="badge-box">${badges}</div>
            </div>

            <div class="game-name">${game.name}</div>

            <div class="show-details-wrapper">
                <button class="btn-details show-btn">Show Details</button>
            </div>

            <div class="details-box">
                <b>Mô tả:</b> ${game.description}<br><br>

                <b>Features:</b>
                <ul>${(game.features || []).map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <div class="price-box">💳 Giá tháng: <b>${game.monthly}K</b></div>
                <div class="price-box">💎 Vĩnh viễn: <b>${game.lifetime}K</b></div>

                <div class="updated-date">📅 Cập nhật: <b>${game.createdAt || "Không rõ"}</b></div>

                <a class="btn-buy" href="https://t.me/YakultIpramovic">Mua ngay</a>
                <a class="btn-update" href="https://t.me/YakultIpramovic">Yêu cầu cập nhật</a>
            </div>
        `;

        /* Toggle chi tiết */
        card.querySelector(".btn-details").onclick = () => {
            const box = card.querySelector(".details-box");
            box.style.display = box.style.display === "block" ? "none" : "block";
        };

        list.appendChild(card);
    });

    renderPagination(Math.ceil(sortedGames.length / ITEMS_PER_PAGE));
}


/* ============================
      INIT RENDER
============================ */
renderGames();

/* Tổng số script */
document.getElementById("totalScripts").innerText = gamesData.length;
// SHOP TÀI NGUYÊN
const shopList = document.getElementById("shopList");

gamesData.forEach(game => {
    const item = document.createElement("div");
    item.className = "game-card";

    item.innerHTML = `
        <img src="${game.image}" class="game-img">

        <div class="game-name">${game.name}</div>

        <button class="btn-details">Xem Gói Nạp</button>

        <div class="details-box">

            <b>Loại tài khoản:</b>
            <ul>
                <li>✔ Account: ${game.accountType ?? "Login / Package"}</li>
            </ul>

            <b>Tài nguyên hỗ trợ:</b>
            <ul>
                <li>✔ Ruby</li>
                <li>✔ Gold</li>
                <li>✔ Diamond</li>
                <li>✔ Exp</li>
                <li>✔ Stone</li>
                <li>✔ Coin</li>
            </ul>

            <b>Gói nạp:</b>
            <ul>
                <li>💎 10K – 20K – 50K</li>
                <li>💎 100K – 200K – 500K</li>
                <li>💎 Custom theo yêu cầu</li>
            </ul>

            <a class="btn-buy" href="https://t.me/YakultIpramovic">Liên hệ mua</a>
        </div>
    `;

    item.querySelector(".btn-details").onclick = () => {
        const box = item.querySelector(".details-box");
        box.style.display = box.style.display === "block" ? "none" : "block";
    };

    shopList.appendChild(item);
});

