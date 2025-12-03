const gameList = document.getElementById("gameList");
const totalScripts = document.getElementById("totalScripts");

totalScripts.innerText = gamesData.length;

gamesData.forEach(game => {
    const el = document.createElement("div");
    el.className = "game-card";

    // 3D TILT
    el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    });
    el.addEventListener("mouseleave", () => {
        el.style.transform = "rotateY(0) rotateX(0)";
    });

el.innerHTML = `
    <div class="badge-box">
        ${game.free ? `<span class="badge free">FREE</span>` : ""}
        ${game.sale ? `<span class="badge sale">${game.sale}</span>` : ""}
    </div>

    <div class="game-top">

        <img src="${game.image}" class="game-img">

        <div class="game-name">${game.name}</div>

    </div>

    <div class="game-bottom">

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

    </div>
`;


