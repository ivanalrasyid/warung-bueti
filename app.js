const menus = [
  {
    name: "Nasi Rames Ayam/Dadar Telur",
    price: 15000,
    image: "images/rames.jpeg",
  },
  {
    name: "Nasi Goreng",
    price: 13000,
    image: "images/nasi-goreng.jpeg",
  },
  {
    name: "Nasi Uduk",
    price: 10000,
    image: "images/nasi-uduk.jpeg",
  },
  {
    name: "Donat Bomboloni (3 pcs)",
    price: 10000,
    image: "images/donat.jpg",
  },
  {
    name: "Gorengan (4 pcs)",
    price: 10000,
    image: "images/gorengan.jpg",
  },
  {
    name: "Makaroni Bumbu Rujak",
    price: 6000,
    image: "images/makaroni.webp",
  },
  {
    name: "Buah Potong",
    price: 25000,
    image: "images/buah.jpg",
  },
  {
    name: "Kue Gabin/Roti Pizza (3 pcs)",
    price: 10000,
    image: "images/gabin.webp",
  },
];

let cart = [];

const menuContainer = document.getElementById("menu-container");

menus.forEach((menu, index) => {
  const card = document.createElement("div");
  card.className = "menu-card";

  card.innerHTML = `
      <img src="${menu.image}" class="menu-image">
  
      <div class="menu-info">
          <h3>${menu.name}</h3>
          <p>Rp${menu.price.toLocaleString("id-ID")}</p>
      </div>
  
      <button onclick="addToCart(${index})">Tambah</button>
    `;

  menuContainer.appendChild(card);
});

function addToCart(index) {
  const existingItem = cart.find((item) => item.name === menus[index].name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      ...menus[index],
      qty: 1,
    });
  }

  renderCart();
}

function increaseQty(index) {
  cart[index].qty += 1;
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalText = document.getElementById("total");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <p>
            Rp${item.price.toLocaleString("id-ID")}
          </p>
        </div>
  
        <div class="qty-box">
          <button onclick="decreaseQty(${index})">-</button>
  
          <span>${item.qty}</span>
  
          <button onclick="increaseQty(${index})">+</button>
  
          <button class="delete-btn"
            onclick="removeItem(${index})">
            🗑️
          </button>
        </div>
      `;

    cartItems.appendChild(div);
  });

  totalText.innerText = `Total: Rp${total.toLocaleString("id-ID")}`;
}

let waMessage = "";

function checkoutWhatsApp() {
  const name = document.getElementById("customerName").value;

  const address = document.getElementById("customerAddress").value;

  const orderDate = document.getElementById("orderDate").value;

  if (!name.trim()) {
    alert("Nama wajib diisi");
    return;
  }

  if (cart.length === 0) {
    alert("Keranjang masih kosong");
    return;
  }

  let total = 0;

  waMessage = "Halo Bu Eti,%0A%0ASaya mau pesan:%0A";

  cart.forEach((item) => {
    waMessage +=
      `- ${item.name} x${item.qty} ` +
      `(Rp${(item.price * item.qty).toLocaleString("id-ID")})%0A`;

    total += item.price * item.qty;
  });

  waMessage += `%0ATotal: Rp${total.toLocaleString("id-ID")}%0A`;

  waMessage +=
    `%0ANama: ${name}` +
    `%0AAlamat: ${address}` +
    `%0ATanggal Pesanan: ${orderDate}`;

  document.getElementById("qrisBox").style.display = "block";

  document.getElementById("checkoutBtn").style.display = "none";

  document.getElementById(
    "qrisTotal"
  ).innerText = `Total Bayar: Rp${total.toLocaleString("id-ID")}`;
}

function sendWhatsApp() {
  window.open(`https://wa.me/6281386016327?text=${waMessage}`, "_blank");
}
