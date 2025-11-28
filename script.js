// Data Toko UMKM
const storeData = {
    'warung-bu-ani': {
        name: 'Warung Bu Ani',
        logo: '🍲',
        desc: 'Warung Bu Ani menyajikan makanan tradisional khas desa dengan cita rasa autentik dan bumbu rempah pilihan. Sudah berdiri sejak 1995 dan menjadi favorit warga.',
        menu: [
            { name: 'Nasi Goreng Kampung', price: 'Rp 15.000', desc: 'Nasi goreng dengan bumbu tradisional' },
            { name: 'Soto Ayam', price: 'Rp 12.000', desc: 'Soto ayam kuah bening segar' },
            { name: 'Pecel Lele', price: 'Rp 18.000', desc: 'Lele goreng dengan sambal pecel' },
            { name: 'Es Teh Manis', price: 'Rp 3.000', desc: 'Teh manis segar' }
        ]
    },
    'toko-jajanan-manis': {
        name: 'Toko Jajanan Manis',
        logo: '🍰',
        desc: 'Menyediakan aneka kue dan jajanan manis buatan rumahan dengan resep turun temurun. Semua dibuat fresh setiap hari tanpa pengawet.',
        menu: [
            { name: 'Kue Lapis', price: 'Rp 25.000', desc: 'Kue lapis legit original' },
            { name: 'Brownies Kukus', price: 'Rp 20.000', desc: 'Brownies lembut kukus' },
            { name: 'Klepon', price: 'Rp 10.000', desc: 'Klepon isi gula merah' },
            { name: 'Onde-onde', price: 'Rp 12.000', desc: 'Onde-onde wijen kacang hijau' }
        ]
    },
    'kedai-kopi-desa': {
        name: 'Kedai Kopi Desa',
        logo: '☕',
        desc: 'Kedai kopi yang menggunakan biji kopi lokal pilihan dari kebun warga. Disangrai dengan teknik tradisional untuk menghasilkan aroma dan rasa terbaik.',
        menu: [
            { name: 'Kopi Tubruk', price: 'Rp 8.000', desc: 'Kopi hitam tradisional' },
            { name: 'Kopi Susu', price: 'Rp 12.000', desc: 'Kopi dengan susu segar' },
            { name: 'Cappuccino', price: 'Rp 15.000', desc: 'Kopi dengan foam susu' },
            { name: 'Kopi Gula Aren', price: 'Rp 10.000', desc: 'Kopi dengan gula aren asli' }
        ]
    },
    'toko-kerajinan': {
        name: 'Toko Kerajinan Tangan',
        logo: '🎨',
        desc: 'Menjual berbagai kerajinan tangan unik hasil karya warga desa. Setiap produk dibuat dengan penuh cinta dan ketelitian tinggi.',
        menu: [
            { name: 'Tas Anyaman', price: 'Rp 75.000', desc: 'Tas anyaman bambu handmade' },
            { name: 'Hiasan Dinding', price: 'Rp 50.000', desc: 'Hiasan dinding dari kayu' },
            { name: 'Tempat Tisu', price: 'Rp 35.000', desc: 'Tempat tisu anyaman rotan' },
            { name: 'Gelang Etnik', price: 'Rp 25.000', desc: 'Gelang dengan motif tradisional' }
        ]
    }
};

// Keranjang belanja
let cart = [];

// Fungsi untuk menampilkan halaman dengan animasi
function showPage(page) {
    // Dapatkan halaman yang sedang aktif
    const pages = ['homePage', 'storePage', 'storeDetail', 'contactPage', 'cartPage'];
    let currentPage = null;
    
    pages.forEach(pageId => {
        const pageElement = document.getElementById(pageId);
        if (pageElement.style.display === 'block') {
            currentPage = pageElement;
        }
    });
    
    // Jika ada halaman aktif, fade out dulu
    if (currentPage) {
        currentPage.classList.add('fade-out');
        
        setTimeout(() => {
            // Sembunyikan semua halaman
            pages.forEach(pageId => {
                const pageElement = document.getElementById(pageId);
                pageElement.style.display = 'none';
                pageElement.classList.remove('fade-out');
            });
            
            // Tampilkan halaman yang dipilih dengan animasi
            if (page === 'home') {
                document.getElementById('homePage').style.display = 'block';
            } else if (page === 'store') {
                document.getElementById('storePage').style.display = 'block';
            } else if (page === 'contact') {
                document.getElementById('contactPage').style.display = 'block';
            } else if (page === 'cart') {
                document.getElementById('cartPage').style.display = 'block';
                renderCart();
            }
            
            // Scroll ke atas dengan smooth behavior
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
    } else {
        // Jika tidak ada halaman aktif, langsung tampilkan
        pages.forEach(pageId => {
            document.getElementById(pageId).style.display = 'none';
        });
        
        if (page === 'home') {
            document.getElementById('homePage').style.display = 'block';
        } else if (page === 'store') {
            document.getElementById('storePage').style.display = 'block';
        } else if (page === 'contact') {
            document.getElementById('contactPage').style.display = 'block';
        } else if (page === 'cart') {
            document.getElementById('cartPage').style.display = 'block';
            renderCart();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Fungsi untuk menampilkan detail toko dengan animasi
function showStoreDetail(storeId) {
    const store = storeData[storeId];
    const storePage = document.getElementById('storePage');
    const detailPage = document.getElementById('storeDetail');
    
    // Fade out store page
    storePage.classList.add('fade-out');
    
    setTimeout(() => {
        // Sembunyikan halaman toko
        storePage.style.display = 'none';
        storePage.classList.remove('fade-out');
        
        // Tampilkan halaman detail
        detailPage.style.display = 'block';
        
        // Update informasi toko
        document.getElementById('detailLogo').textContent = store.logo;
        document.getElementById('detailName').textContent = store.name;
        document.getElementById('detailDesc').textContent = store.desc;
        
        // Generate menu items
        const menuGrid = document.getElementById('menuGrid');
        menuGrid.innerHTML = '';
        
        store.menu.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="price">${item.price}</div>
                <button class="order-btn" onclick="orderItem('${item.name}', '${item.price}', '${store.name}')">Order</button>
            `;
            menuGrid.appendChild(menuItem);
        });
        
        // Scroll ke atas dengan smooth behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
}

// Fungsi untuk order item dengan animasi
function orderItem(itemName, price, storeName) {
    const button = event.target;
    const originalText = button.textContent;
    
    // Animasi button loading
    button.textContent = '⏳ Memproses...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = '✓ Ditambahkan!';
        button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        // Tambahkan ke keranjang
        addToCart(itemName, price, storeName);
        
        setTimeout(() => {
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = 'linear-gradient(135deg, #FF8C42, #FF6B35)';
        }, 800);
    }, 600);
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, price, storeName) {
    // Cek apakah item sudah ada di keranjang
    const existingItem = cart.find(item => 
        item.name === itemName && item.store === storeName
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            store: storeName,
            quantity: 1,
            desc: getItemDescription(itemName, storeName)
        });
    }
    
    updateCartBadge();
    
    // Notifikasi
    showNotification(`${itemName} ditambahkan ke keranjang!`);
}

// Fungsi untuk mendapatkan deskripsi item
function getItemDescription(itemName, storeName) {
    for (let storeId in storeData) {
        if (storeData[storeId].name === storeName) {
            const item = storeData[storeId].menu.find(m => m.name === itemName);
            return item ? item.desc : '';
        }
    }
    return '';
}

// Fungsi untuk update badge keranjang
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    
    // Animasi bounce
    badge.classList.remove('updated');
    void badge.offsetWidth; // Trigger reflow
    badge.classList.add('updated');
}

// Fungsi untuk render keranjang
function renderCart() {
    const cartEmpty = document.getElementById('cartEmpty');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.innerHTML = '';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';
    
    // Render items
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-store">${item.store}</div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-desc">${item.desc}</div>
            </div>
            <div class="cart-item-price">${item.price}</div>
            <div class="cart-item-actions">
                <div class="qty-control">
                    <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})">Hapus</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update summary
    updateCartSummary();
}

// Fungsi untuk update summary
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalPrice').textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}

// Fungsi untuk increase quantity
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartBadge();
    renderCart();
}

// Fungsi untuk decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCartBadge();
        renderCart();
    }
}

// Fungsi untuk remove item dari cart
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    updateCartBadge();
    renderCart();
    showNotification(`${itemName} dihapus dari keranjang`);
}

// Fungsi untuk clear cart
function clearCart() {
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
        cart = [];
        updateCartBadge();
        renderCart();
        showNotification('Keranjang telah dikosongkan');
    }
}

// Fungsi untuk checkout
function checkout() {
    if (cart.length === 0) return;
    
    let message = '🛒 *Pesanan MangDeliv*\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        const subtotal = price * item.quantity;
        total += subtotal;
        
        message += `📦 *${item.name}*\n`;
        message += `   Toko: ${item.store}\n`;
        message += `   Jumlah: ${item.quantity}x\n`;
        message += `   Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━\n`;
    message += `💰 *Total: Rp ${total.toLocaleString('id-ID')}*\n\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += 'Dengan Penerima : <Tulis Nama Anda disini>';
    message += 'Alamat : <Tulis alamat anda disini>';
    message += `━━━━━━━━━━━━━━━\n`;
    message += `Mohon konfirmasi pesanan ini. Terima kasih! 🙏`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6282129210772?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Fungsi untuk show notification
function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOutDown 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Smooth scroll untuk navigasi
document.addEventListener('DOMContentLoaded', function() {
    // Set halaman home sebagai default
    showPage('home');
});