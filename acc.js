// =========================
// DATA DEMO (có thể xóa sau)
// =========================

const DEMO_ACCOUNTS = [
  {
    id: 1,
    title: "LMHT random 25k",
    game: "LMHT",
    rank: "Vàng",
    price: 25000,
    server: "VN",
    description: "Acc random LMHT, có skin lẻ, thích hợp làm acc phụ.",
    is_sold: 0
  },
  {
    id: 2,
    title: "LMHT rank Kim Cương",
    game: "LMHT",
    rank: "Kim Cương",
    price: 390000,
    server: "VN",
    description: "Acc chính, tướng nhiều, có khung, lịch sử sạch.",
    is_sold: 0
  },
  {
    id: 3,
    title: "TFT random chibi",
    game: "TFT",
    rank: "Bạch Kim",
    price: 180000,
    server: "VN",
    description: "Random chibi, nhiều linh thú đẹp.",
    is_sold: 1
  }
];

let currentAccounts = [];
let selectedAccount = null;

// =========================
// KHỞI ĐỘNG
// =========================

document.addEventListener("DOMContentLoaded", () => {
  // load dữ liệu lúc đầu
  currentAccounts = DEMO_ACCOUNTS;
  renderAccounts(currentAccounts);

  document.getElementById("btnFilter").addEventListener("click", handleFilter);
});

// =========================
// RENDER LIST ACC
// =========================

function renderAccounts(list) {
  const grid = document.getElementById("product-grid");
  const accCount = document.getElementById("accCount");

  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<p style="color:#ffffff">Không tìm thấy tài khoản nào.</p>`;
    accCount.textContent = "0 tài khoản";
    return;
  }

  accCount.textContent = `${list.length} tài khoản`;

  list.forEach((acc) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const statusClass = acc.is_sold ? "status-sold" : "status-available";
    const statusText = acc.is_sold ? "ĐÃ BÁN" : "CÒN HÀNG";

    // tạm dùng ảnh chung
    card.innerHTML = `
      <img src="https://via.placeholder.com/300x150?text=${encodeURIComponent(acc.game)}" alt="${acc.title}">
      <h3>${acc.title}</h3>
      <p>Game: <b>${acc.game}</b> | Rank: <b>${acc.rank || "Chưa rõ"}</b></p>
      <p>Server: ${acc.server || "VN"}</p>
      <p>Giá: <b>${acc.price.toLocaleString("vi-VN")} VNĐ</b></p>
      <p>Trạng thái: <span class="${statusClass}">${statusText}</span></p>
      <div class="card-actions">
        <button class="btn-detail" onclick="openDetail(${acc.id})">Chi tiết</button>
        <button class="btn-buy" onclick="openBuy(${acc.id})" ${acc.is_sold ? "disabled" : ""}>Mua ngay</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// =========================
// LỌC DỮ LIỆU (client-side)
// =========================

function handleFilter() {
  const keyword = document.getElementById("keyword").value.trim().toLowerCase();
  const game = document.getElementById("game").value;
  const rank = document.getElementById("rank").value;
  const priceRange = document.getElementById("price").value;

  let filtered = DEMO_ACCOUNTS.slice();

  if (keyword) {
    filtered = filtered.filter((acc) =>
      (acc.title + acc.game + acc.rank).toLowerCase().includes(keyword)
    );
  }

  if (game) {
    filtered = filtered.filter((acc) => acc.game === game);
  }

  if (rank) {
    filtered = filtered.filter((acc) => acc.rank === rank);
  }

  if (priceRange) {
    filtered = filtered.filter((acc) => {
      if (priceRange === "1") return acc.price < 100000;
      if (priceRange === "2") return acc.price >= 100000 && acc.price <= 500000;
      if (priceRange === "3") return acc.price > 500000 && acc.price <= 1000000;
      if (priceRange === "4") return acc.price > 1000000;
    });
  }

  currentAccounts = filtered;
  renderAccounts(currentAccounts);
}

// =========================
// MODAL / CHI TIẾT / MUA
// =========================

function openDetail(id) {
  const acc = currentAccounts.find((a) => a.id === id);
  if (!acc) return;
  selectedAccount = acc;
  fillModal(acc, false);
}

function openBuy(id) {
  const acc = currentAccounts.find((a) => a.id === id);
  if (!acc) return;
  selectedAccount = acc;
  fillModal(acc, true);
}

function fillModal(acc, canBuy) {
  const modal = document.getElementById("account-modal");

  document.getElementById("modal-title").textContent = acc.title;
  document.getElementById("modal-game-rank").textContent = `Game: ${acc.game} | Rank: ${acc.rank || "Chưa rõ"}`;
  document.getElementById("modal-price").textContent = `Giá: ${acc.price.toLocaleString("vi-VN")} VNĐ`;
  document.getElementById("modal-server").textContent = `Server: ${acc.server || "VN"}`;
  document.getElementById("modal-desc").textContent = acc.description || "Không có mô tả.";
  document.getElementById("modal-status").textContent = acc.is_sold ? "Tài khoản đã được bán." : "Tài khoản còn hàng.";

  // Ẩn thông tin login
  document.getElementById("modal-credentials").classList.add("hidden");
  document.getElementById("modal-username").textContent = "";
  document.getElementById("modal-password").textContent = "";

  const buyBtn = document.getElementById("modal-buy-btn");
  if (acc.is_sold) {
    buyBtn.style.display = "none";
  } else {
    buyBtn.style.display = "block";
    buyBtn.onclick = () => buyAccount(acc.id);
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("account-modal").classList.add("hidden");
}

// Giả lập mua acc – sau này bạn đổi thành gọi API /orders
function buyAccount(id) {
  const acc = currentAccounts.find((a) => a.id === id);
  if (!acc) return;

  if (!confirm(`Bạn chắc chắn muốn mua "${acc.title}" với giá ${acc.price.toLocaleString("vi-VN")} VNĐ?`)) {
    return;
  }

  // Giả lập mua thành công và trả về tài khoản / mật khẩu
  const username = "demo_user_" + id;
  const password = "demo_pass_" + id;

  document.getElementById("modal-username").textContent = username;
  document.getElementById("modal-password").textContent = password;
  document.getElementById("modal-credentials").classList.remove("hidden");

  // Đánh dấu đã bán (demo)
  acc.is_sold = 1;
  renderAccounts(currentAccounts);

  alert("Mua tài khoản demo thành công! Thông tin đăng nhập đã hiển thị.");
}
