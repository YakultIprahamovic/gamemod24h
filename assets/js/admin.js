/* LOGIN */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loginBox.style.display = "none";
        adminPanel.style.display = "block";
        loadGames();
    }
});

function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .catch(() => loginStatus.innerText = "Sai thông tin đăng nhập!");
}

function logout() {
    firebase.auth().signOut();
}

/* UPLOAD CLOUDINARY */
async function uploadImage(file) {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: form
    });

    const data = await res.json();
    return data.secure_url; 
}

/* ADD GAME */
async function addGame() {
    let id = Date.now();
    let file = gImage.files[0];
    if (!file) return alert("Chưa chọn ảnh!");

    let imageUrl = await uploadImage(file);

    let gameData = {
        id,
        name: gName.value,
        description: gDescription.value,
        status: gStatus.value,
        script: gScript.value,
        video: gVideo.value,
        image: imageUrl,
        features: gFeatures.value.split("\n").filter(x => x.trim() !== "")
    };

    db.ref("games/" + id).set(gameData);
    alert("Đã thêm game!");
    loadGames();
}

/* SHOW LIST */
function loadGames() {
    db.ref("games").on("value", snap => {
        let data = snap.val() || {};
        let html = "";

        for (let id in data) {
            let g = data[id];

            html += `
                <div class="game-item">
                    <img src="${g.image}" class="game-thumb">

                    <div class="info">
                        <h3>${g.name}</h3>
                        <span class="status-tag status-${g.status}">${g.status}</span>

                        <button class="showdetail-btn" onclick="toggleDetail(${g.id})">
                            Show Details
                        </button>
                        <button class="delete-btn" onclick="deleteGame(${g.id})">Xoá</button>

                        <div id="detail-${g.id}" class="detail-box">
                            <p><b>Mô tả:</b> ${g.description}</p>
                            <p><b>Script:</b> ${g.script}</p>
                            <p><b>Review:</b> ${g.video}</p>

                            <p><b>Features:</b></p>
                            <ul>
                                ${g.features.map(f => `<li>${f}</li>`).join("")}
                            </ul>

                            <a href="https://t.me/YakultIpramovic" 
                               target="_blank" 
                               class="buy-btn">Mua Script</a>
                        </div>
                    </div>
                </div>
            `;
        }

        gameList.innerHTML = html;
    });
}

/* TOGGLE DETAILS */
function toggleDetail(id) {
    let box = document.getElementById("detail-" + id);
    box.style.display = box.style.display === "none" ? "block" : "none";
}

/* DELETE */
function deleteGame(id) {
    if (confirm("Bạn có chắc muốn xoá?")) {
        db.ref("games/" + id).remove();
    }
}
