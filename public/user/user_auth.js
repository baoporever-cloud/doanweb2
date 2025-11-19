// Đổi base URL này theo backend của bạn
const API_BASE = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const registerForm = document.querySelector(".register-form");

  if (loginForm) {
    setupLoginForm(loginForm);
  }

  if (registerForm) {
    setupRegisterForm(registerForm);
  }
});

// XỬ LÝ ĐĂNG NHẬP
function setupLoginForm(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.querySelector("#username").value.trim();
    const password = form.querySelector("#password").value.trim();

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Đăng nhập thất bại.");
        return;
      }

      // Ví dụ: lưu token + info user
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Đăng nhập thành công!");
      // Chuyển trang sau khi đăng nhập, ví dụ: trang chủ hoặc profile
      window.location.href = "Trangchu.html";  // đổi theo project của bạn
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server. Vui lòng thử lại sau.");
    }
  });
}

// XỬ LÝ ĐĂNG KÝ
function setupRegisterForm(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.querySelector("#username").value.trim();
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value.trim();
    const confirm = form.querySelector("#confirm").value.trim();

    if (!username || !email || !password || !confirm) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Đăng ký thất bại.");
        return;
      }

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      window.location.href = "login.html"; // quay về trang login
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server. Vui lòng thử lại sau.");
    }
  });
}
