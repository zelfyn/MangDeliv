// Menu data
const menuItems = [
    { id: 1, name: 'Nasi Goreng Spesial', price: 25000, emoji: '🍛', description: 'Nasi goreng dengan bumbu rahasia dan telur' },
    { id: 2, name: 'Mie Ayam Bakso', price: 20000, emoji: '🍜', description: 'Mie ayam dengan bakso sapi pilihan' },
    { id: 3, name: 'Sate Ayam', price: 30000, emoji: '�串', description: '10 tusuk sate ayam dengan bumbu kacang' },
    { id: 4, name: 'Gado-Gado', price: 18000, emoji: '🥗', description: 'Sayuran segar dengan bumbu kacang' },
    { id: 5, name: 'Soto Ayam', price: 22000, emoji: '🍲', description: 'Soto ayam kuah kuning dengan nasi' },
    { id: 6, name: 'Rendang', price: 35000, emoji: '🍖', description: 'Rendang daging sapi dengan nasi' },
    { id: 7, name: 'Pecel Lele', price: 23000, emoji: '🐟', description: 'Lele goreng dengan sambal pecel' },
    { id: 8, name: 'Es Teh Manis', price: 5000, emoji: '🧋', description: 'Teh manis dingin segar' },
];

// Cart array
let cart = [];

// Show specific page
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    updateCartCount();
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        showPage('homePage');
        // Add welcome animation
        setTimeout(() => {
            alert('Selamat datang di UMKM Desa, ' + username + '! 🎉');
        }, 300);
    }
});

// Generate menu items
function generateMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';
    
    menuItems.forEach(item => {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'menu-item';
        menuDiv.innerHTML = `
            <div class="menu-image">${item.emoji}</div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <button class="btn-add" onclick="addToCart(${item.id})">Tambah ke Keranjang</button>
            </div>
        `;
        menuContainer.appendChild(menuDiv);
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartCount();
    
    // Show feedback animation
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Ditambahkan!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1000);
}

// Update cart count badges
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartCount2').textContent = count;
    document.getElementById('cartCount3').textContent = count;
    document.getElementById('cartCount4').textContent = count;
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Keranjang Anda masih kosong</p>';
        document.getElementById('totalPrice').textContent = 'Rp 0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.emoji} ${item.name}</h4>
                <p>Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
                <span style="font-weight: bold; min-width: 30px; text-align: center;">${item.quantity}</span>
                <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                <span style="margin-left: 20px; font-weight: bold; color: #ff6b00;">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
    
    document.getElementById('totalPrice').textContent = 'Rp ' + total.toLocaleString('id-ID');
}

// Increase item quantity
function increaseQuantity(itemId) {
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.quantity++;
        displayCart();
        updateCartCount();
    }
}

// Decrease item quantity
function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex(c => c.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
        displayCart();
        updateCartCount();
    }
}

// Checkout and start tracking
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda masih kosong!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const confirmation = confirm(`Total pembayaran: Rp ${total.toLocaleString('id-ID')}\n\nLanjutkan checkout?`);
    
    if (confirmation) {
        document.getElementById('trackingSection').style.display = 'block';
        startTracking();
        
        // Scroll to tracking section
        setTimeout(() => {
            document.getElementById('trackingSection').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}

// Driver tracking animation
function startTracking() {
    const driverMarker = document.getElementById('driverMarker');
    let position = 10;
    let time = 15;
    
    const trackingInterval = setInterval(() => {
        position += 1.5;
        time -= 0.3;
        
        driverMarker.style.left = position + '%';
        driverMarker.style.top = (20 + Math.sin(position / 10) * 15) + '%';
        
        document.getElementById('estimatedTime').textContent = Math.max(0, Math.round(time)) + ' menit';
        document.getElementById('trackingStatus').textContent = position < 80 ? 'Driver sedang dalam perjalanan...' : 'Driver hampir sampai! 🎉';
        
        if (position >= 85) {
            clearInterval(trackingInterval);
            alert('Pesanan Anda telah tiba! Selamat menikmati! 🎉');
            cart = [];
            displayCart();
            updateCartCount();
            document.getElementById('trackingSection').style.display = 'none';
        }
    }, 200);
}

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda. 📧');
    this.reset();
});

// Monitor cart page to update display
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.id === 'cartPage' && mutation.target.classList.contains('active')) {
            displayCart();
        }
    });
});

// Observe all pages
document.querySelectorAll('.page').forEach(page => {
    observer.observe(page, { attributes: true, attributeFilter: ['class'] });
});

// Initialize menu on page load
window.addEventListener('DOMContentLoaded', function() {
    generateMenu();
});