/* ============================
    AUTH
============================ */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loginBox.style.display = "none";
        adminPanel.style.display = "block";
        loadGames();
    }
});

function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .catch(() => loginStatus.innerText = "Sai tài khoản hoặc mật khẩu!");
}

function logout() {
    firebase.auth().signOut();
}


/* ============================
    CLOUDINARY UPLOAD
============================ */
async function uploadImage(file) {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);

    const res = await fetch(url, {
        method: "POST",
        body: form
    });

    const data = await res.json();
    return data.secure_url; // link ảnh
}


/* ============================
    ADD GAME
============================ */
async function addGame() {
    let id = Date.now();

    let name = gName.value;
    let description = gDescription.value;
    let script = gScript.value;
    let video = gVideo.value;
    let features = gFeatures.value.split("\n").filter(f => f.trim() !== "");

    let file = gImage.files[0];
    if (!file) return alert("Chưa chọn ảnh!");

    // UPLOAD CLOUDINARY
    let imageUrl = await uploadImage(file);

    db.ref("games/" + id).set({
        id, name, description, script, video, image: imageUrl, features
    });

    alert("Đã thêm game!");
    loadGames();
}


/* ============================
    LOAD GAME LIST
============================ */
function loadGames() {
    db.ref("games").once("value", snap => {
        let data = snap.val() || {};
        let html = "";

        Object.values(data).forEach(g => {
            html += `
                <div class="gameRow">
                    <img src="${g.image}" class="thumb">
                    <b>${g.name}</b>
                    <button onclick="deleteGame(${g.id})">Xoá</button>
                </div>
            `;
        });

        document.getElementById("gameList").innerHTML = html;
    });
}


/* ============================
    DELETE GAME
============================ */
function deleteGame(id) {
    if (!confirm("Xoá game này?")) return;

    db.ref("games/" + id).remove();
    loadGames();
}
