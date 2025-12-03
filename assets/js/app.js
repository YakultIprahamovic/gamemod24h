// ===============================
// Yakult Script Hub – App Logic
// ===============================

// ELEMENTS
const gameListEl = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalScript = document.getElementById("modalScript");
const copyBtn = document.getElementById("copyBtn");

// RENDER GAME CARDS
function renderGames(list) {
    gameListEl.innerHTML = "";

    list.forEach(g => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.onclick = () => openModal(g);

        card.innerHTML = `
            <img src="${g.image}" class="game-img">
            <div class="game-info">
                <div class="game-title">${g.name}</div>
                <div class="game-desc">${g.description}</div>
            </div>
        `;

        gameListEl.appendChild(card);
    });
}

// SEARCH FUNCTION
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();

    const filtered = gamesData.filter(g =>
        g.name.toLowerCase().includes(keyword)
    );

    renderGames(filtered);
});

// OPEN MODAL
function openModal(game) {
    modalImg.src = game.image;
    modalTitle.innerText = game.name;
    modalDesc.innerText = game.description;
    modalScript.innerText = game.script || "// Chưa có script";

    modal.classList.remove("hidden");
}

// CLOSE MODAL
modalClose.onclick = () => modal.classList.add("hidden");
modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add("hidden");
};

// COPY SCRIPT BUTTON
copyBtn.onclick = () => {
    const text = modalScript.innerText;

    navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerText = "Đã Copy!";
        setTimeout(() => (copyBtn.innerText = "Copy Script"), 1200);
    });
};

// INITIAL RENDER
function renderGames(list) {
    gameListEl.innerHTML = "";

    list.forEach(g => {
        let card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <img src="${g.image}" class="game-img">
            <h3 class="game-title">${g.name}</h3>
            <span class="vip-tag">VIP</span>

            <button class="show-btn" onclick="showDetail(${g.id})">
                Show Details
            </button>
        `;
        gameListEl.appendChild(card);
    });
}

function showDetail(id) {
    db.ref("games/" + id).once("value", snap => {
        let g = snap.val();
        if (!g) return;

        dImage.src = g.image;
        dName.innerText = g.name;
        dDescription.innerText = g.description;

        dFeatures.innerHTML = g.features.map(f => `<li>${f}</li>`).join("");

        dMonthly.innerText = g.monthly || "8$";
        dLifetime.innerText = g.lifetime || "80$";

        buyBtn.href = "https://t.me/YakultIpramovic";

        requestUpdate.onclick = () => {
            window.open("https://t.me/YakultIpramovic", "_blank");
        };

        gameDetail.style.display = "flex";
    });
}

function closeDetail() {
    gameDetail.style.display = "none";
}


