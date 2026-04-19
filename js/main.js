/* =============================================
   BREWHAUS COFFEE — MAIN JAVASCRIPT
   Cart, Auth, Animations, Utilities
   ============================================= */

$(document).ready(function () {

  // ---- Active Nav Link ----
  const current = window.location.pathname.split('/').pop() || 'index.html';
  $('.navbar-brewhaus .nav-link').each(function () {
    const href = $(this).attr('href');
    if (href && href.includes(current)) $(this).addClass('active');
  });

  // ---- Auth System ----
  const Auth = {
    users: JSON.parse(sessionStorage.getItem('bh_users') || '[]'),
    current: JSON.parse(sessionStorage.getItem('bh_user') || 'null'),

    register(name, email, password) {
      if (this.users.find(u => u.email === email)) return { ok: false, msg: 'Email already registered.' };
      const user = { id: Date.now(), name, email, password, joined: new Date().toLocaleDateString() };
      this.users.push(user);
      sessionStorage.setItem('bh_users', JSON.stringify(this.users));
      this.login(email, password);
      return { ok: true };
    },

    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password);
      if (!user) return { ok: false, msg: 'Invalid email or password.' };
      this.current = user;
      sessionStorage.setItem('bh_user', JSON.stringify(user));
      this.updateUI();
      return { ok: true, user };
    },

    logout() {
      this.current = null;
      sessionStorage.removeItem('bh_user');
      this.updateUI();
      showToast('Signed out successfully.');
    },

    isLoggedIn() { return !!this.current; },

    updateUI() {
      if (this.current) {
        $('.auth-btn-nav').hide();
        $('#nav-user-menu').show();
        $('#nav-username').text(this.current.name.split(' ')[0]);
      } else {
        $('.auth-btn-nav').show();
        $('#nav-user-menu').hide();
      }
    }
  };

  window.Auth = Auth;
  Auth.updateUI();

  // Auth Modal
  $('#loginBtn, #signupBtn, .auth-btn-nav').on('click', function () {
    const tab = $(this).data('tab') || 'login';
    switchAuthTab(tab);
    $('#authModal').modal('show');
  });

  function switchAuthTab(tab) {
    $('.auth-tab-btn').removeClass('active');
    $(`.auth-tab-btn[data-tab="${tab}"]`).addClass('active');
    $('.auth-form').hide();
    $(`#form-${tab}`).show();
  }

  $('.auth-tab-btn').on('click', function () {
    switchAuthTab($(this).data('tab'));
  });

  // Register Form
  $('#form-register').on('submit', function (e) {
    e.preventDefault();
    const name = $('#reg-name').val().trim();
    const email = $('#reg-email').val().trim();
    const password = $('#reg-password').val();
    const confirm = $('#reg-confirm').val();
    if (password !== confirm) { showFormError('reg-error', 'Passwords do not match.'); return; }
    if (password.length < 6) { showFormError('reg-error', 'Password must be at least 6 characters.'); return; }
    const result = Auth.register(name, email, password);
    if (result.ok) {
      $('#authModal').modal('hide');
      showToast(`Welcome, ${name}! Account created.`);
      this.reset();
    } else {
      showFormError('reg-error', result.msg);
    }
  });

  // Login Form
  $('#form-login').on('submit', function (e) {
    e.preventDefault();
    const email = $('#login-email').val().trim();
    const password = $('#login-password').val();
    const result = Auth.login(email, password);
    if (result.ok) {
      $('#authModal').modal('hide');
      showToast(`Welcome back, ${result.user.name.split(' ')[0]}!`);
      this.reset();
      setTimeout(() => location.reload(), 800);
    } else {
      showFormError('login-error', result.msg);
    }
  });

  $('#nav-logout').on('click', function (e) {
    e.preventDefault();
    Auth.logout();
    setTimeout(() => location.reload(), 600);
  });

  // ---- Cart System ----
  const Cart = {
    items: JSON.parse(sessionStorage.getItem('bh_cart') || '[]'),

    save() { sessionStorage.setItem('bh_cart', JSON.stringify(this.items)); },

    add(id, name, price, img) {
      const existing = this.items.find(i => i.id === id);
      if (existing) {
        existing.qty++;
      } else {
        this.items.push({ id, name, price: parseFloat(price), img, qty: 1 });
      }
      this.save();
      this.render();
      updateCartCount();
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
      this.render();
      updateCartCount();
    },

    updateQty(id, delta) {
      const item = this.items.find(i => i.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) this.remove(id);
      else {
        this.save();
        this.render();
      }
      updateCartCount();
    },

    getTotal() {
      return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    getCount() {
      return this.items.reduce((sum, i) => sum + i.qty, 0);
    },

    render() {
      const $items = $('#cart-items');
      if (this.items.length === 0) {
        $items.html(`
          <div class="empty-cart">
            <div class="empty-icon">☕</div>
            <p style="font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--espresso);">Your cart is empty</p>
            <p style="font-size:0.82rem;">Add some delicious items to get started.</p>
          </div>`);
        $('#cart-total').text('$0.00');
        return;
      }
      let html = '';
      this.items.forEach(item => {
        html += `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              <div class="cart-qty-control">
                <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
              </div>
            </div>
            <button class="remove-item" data-id="${item.id}" title="Remove">✕</button>
          </div>`;
      });
      $items.html(html);
      $('#cart-total').text('$' + this.getTotal().toFixed(2));
    }
  };

  window.Cart = Cart;
  Cart.render();

  function updateCartCount() {
    const count = Cart.getCount();
    $('#cart-count').text(count);
    if (count > 0) $('#cart-count').show();
    else $('#cart-count').hide();
  }

  updateCartCount();

  // Cart open/close
  $('#cart-toggle, .cart-btn').on('click', function (e) {
    e.preventDefault();
    openCart();
  });

  $('#cart-close, .cart-overlay').on('click', function () {
    closeCart();
  });

  function openCart() {
    $('#cart-sidebar').addClass('open');
    $('.cart-overlay').addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeCart() {
    $('#cart-sidebar').removeClass('open');
    $('.cart-overlay').removeClass('active');
    $('body').css('overflow', '');
  }

  // Cart quantity & remove (delegated)
  $(document).on('click', '.qty-minus', function () {
    Cart.updateQty($(this).data('id'), -1);
  });
  $(document).on('click', '.qty-plus', function () {
    Cart.updateQty($(this).data('id'), 1);
  });
  $(document).on('click', '.remove-item', function () {
    Cart.remove($(this).data('id'));
    showToast('Item removed from cart.');
  });

  // Add to cart (product cards on any page)
  $(document).on('click', '.btn-add-cart', function () {
    const $btn = $(this);
    const id = $btn.data('id');
    const name = $btn.data('name');
    const price = $btn.data('price');
    const img = $btn.data('img');
    Cart.add(id, name, price, img);
    showToast(`"${name}" added to cart! ☕`);
    $btn.text('Added ✓').css('background', 'var(--caramel)');
    setTimeout(() => $btn.text('Add to Cart').css('background', ''), 1500);
  });

  // Checkout proceed
  $('#checkout-btn').on('click', function () {
    if (Cart.items.length === 0) { showToast('Your cart is empty!'); return; }
    closeCart();
    window.location.href = './checkout.html';
  });

  // ---- Scroll Animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ---- Toast Utility ----
  window.showToast = function (msg, duration = 2800) {
    let $toast = $('#brewhaus-toast');
    if (!$toast.length) {
      $toast = $('<div id="brewhaus-toast" class="toast-brewhaus"></div>').appendTo('body');
    }
    $toast.text(msg).addClass('show');
    clearTimeout($toast.data('timer'));
    $toast.data('timer', setTimeout(() => $toast.removeClass('show'), duration));
  };

  function showFormError(id, msg) {
    $(`#${id}`).text(msg).show();
    setTimeout(() => $(`#${id}`).fadeOut(), 4000);
  }

  // ---- Menu Category Tabs ----
  $(document).on('click', '.menu-tab', function () {
    $('.menu-tab').removeClass('active');
    $(this).addClass('active');
    const cat = $(this).data('cat');
    if (cat === 'all') {
      $('.product-grid-item').show();
    } else {
      $('.product-grid-item').hide();
      $(`.product-grid-item[data-cat="${cat}"]`).show();
    }
  });

});
