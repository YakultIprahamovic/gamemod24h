// LOAD LIST GAME FROM games.js
renderGames(gamesData);

// RENDER LIST
function renderGames(list) {
    const gameListEl = document.getElementById("gameList");
    gameListEl.innerHTML = "";

    list.forEach(g => {
        let card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <img src="${g.image}" class="game-img">
            <h3 class="game-title">${g.name}</h3>
            <div class="vip-tag">VIP</div>
            <button class="show-btn" onclick="showDetail(${g.id})">Show Details</button>
        `;
        gameListEl.appendChild(card);
    });
}

// SEARCH
function searchGame() {
    let txt = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".game-card");

    cards.forEach(c => {
        let name = c.querySelector(".game-title").innerText.toLowerCase();
        c.style.display = name.includes(txt) ? "block" : "none";
    });
}

// SHOW DETAIL POPUP
function showDetail(id) {
    let g = gamesData.find(x => x.id == id);
    if (!g) return;

    dImage.src = g.image;
    dName.innerText = g.name;
    dDescription.innerText = g.description;
    dFeatures.innerHTML = g.features.map(f => `<li>${f}</li>`).join("");

    dMonthly.innerText = g.monthly;
    dLifetime.innerText = g.lifetime;

    buyBtn.href = "https://t.me/YakultIpramovic";
    requestUpdate.onclick = () => window.open("https://t.me/YakultIpramovic");

    gameDetail.style.display = "flex";
}

function closeDetail() {
    gameDetail.style.display = "none";
}
