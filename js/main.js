// --- Quinta do Cota Docs password gate (hashed version) ---
(async function() {
  // SHA-256 hash for password "quinta2025"
  const STORED_HASH = "edcff9cd51f1d4bff9a5d1e7148901e7f08a782f24f24fb16124ff7f731f505f";
  const ACCESS_KEY = "quinta_docs_access";

  async function sha256(text) {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  if (localStorage.getItem(ACCESS_KEY) === "true") return;

  // Overlay UI
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    color: "#fff",
    fontFamily: "system-ui",
    transition: "opacity 0.4s ease",
    opacity: "1"
  });

  const box = document.createElement("div");
  Object.assign(box.style, {
    background: "#1b1b1b",
    border: "1px solid #333",
    padding: "2rem",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "320px",
    width: "90%"
  });

  const title = document.createElement("h2");
  title.textContent = "🔒 Acesso Restrito";

  const input = document.createElement("input");
  Object.assign(input, { type: "password", placeholder: "Insira a palavra-passe" });
  Object.assign(input.style, {
    width: "100%",
    padding: "0.6rem",
    margin: "0.8rem 0",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#000",
    color: "#fff"
  });

  const btn = document.createElement("button");
  btn.textContent = "Entrar";
  Object.assign(btn.style, {
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "6px",
    background: "#e57373",
    color: "#fff",
    cursor: "pointer"
  });

  const msg = document.createElement("p");
  msg.style.color = "#f66";
  msg.style.fontSize = "0.9rem";

  btn.onclick = async () => {
    const hash = await sha256(input.value);
    if (hash === STORED_HASH) {
      localStorage.setItem(ACCESS_KEY, "true");
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 400);
    } else {
      msg.textContent = "Palavra-passe incorreta.";
      input.value = "";
    }
  };

  box.append(title, input, btn, msg);
  overlay.append(box);
  document.body.append(overlay);
})();
