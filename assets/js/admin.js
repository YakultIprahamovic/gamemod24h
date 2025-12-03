function logout() {
    localStorage.removeItem("yakult_admin_token");
    window.location.href = "admin-login.html";
}

let editing = null;

// ================================
// HIỂN THỊ DANH SÁCH GAME
// ================================
function renderList() {
    const box = document.getElementById("gameList");
    box.innerHTML = "";

    gamesData.forEach(g => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <h3>${g.name}</h3>
            <img src="${g.image}" width="100%" style="border-radius:8px;margin:5px 0;">
            <p>${g.description}</p>

            <button class="btn delete" onclick="deleteGame(${g.id})">Xóa</button>
            <button class="btn save" onclick="editGame(${g.id})">Sửa</button>
        `;

        box.appendChild(card);
    });
}

// ================================
// XÓA GAME
// ================================
function deleteGame(id) {
    const index = gamesData.findIndex(g => g.id === id);
    if (index !== -1) {
        gamesData.splice(index, 1);
        renderList();
        alert("Đã xóa game!");
    }
}

// ================================
// SỬA GAME
// ================================
function editGame(id) {
    const g = gamesData.find(x => x.id === id);

    document.getElementById("editId").value = g.id;
    document.getElementById("name").value = g.name;
    document.getElementById("description").value = g.description;
    document.getElementById("script").value = g.script;

    editing = id;
}

// ================================
// THÊM / LƯU GAME
// ================================
document.getElementById("gameForm").onsubmit = async function(e) {
    e.preventDefault();

    const id = editing ?? (gamesData.at(-1)?.id + 1 || 1);
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const script = document.getElementById("script").value;

    let imgBase64 = null;
    const file = document.getElementById("imageInput").files[0];

    if (file) {
        imgBase64 = await toBase64(file);
    }

    const newGame = {
        id,
        name,
        description,
        script,
        image: imgBase64 || (gamesData.find(g => g.id === id)?.image ?? "")
    };

    if (editing) {
        const index = gamesData.findIndex(g => g.id === editing);
        gamesData[index] = newGame;
    } else {
        gamesData.push(newGame);
    }

    editing = null;
    this.reset();
    renderList();
    alert("Đã lưu game!");
};

// ================================
// CHUYỂN FILE → BASE64
// ================================
function toBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// ================================
// EXPORT games.js
// ================================
document.getElementById("exportBtn").onclick = function() {
    const content = "const gamesData = " + JSON.stringify(gamesData, null, 2) + ";";
    const a = document.createElement("a");

    a.href = URL.createObjectURL(new Blob([content], { type: "text/javascript" }));
    a.download = "games.js";
    a.click();
};

// Khởi động
renderList();
