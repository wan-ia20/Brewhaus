/* =============================================
   BREWHAUS — SHARED COMPONENTS (pages context)
   Nav path prefix = '../'
   ============================================= */

window.BrewhausNav = function () {
  return `
  <nav class="navbar navbar-brewhaus navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="../index.html">
        <span class="brand-icon">☕</span>
        Brew<span>haus</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav mx-auto gap-1">
          <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="menu.html">Menu</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="feedback.html">Reviews</a></li>
        </ul>
        <div class="d-flex align-items-center gap-2">
          <button class="nav-link auth-btn-nav" data-tab="login" data-bs-toggle="modal" data-bs-target="#authModal">Sign In</button>
          <div id="nav-user-menu" class="dropdown" style="display:none;">
            <button class="nav-link auth-btn-nav dropdown-toggle" data-bs-toggle="dropdown" style="border:1px solid var(--caramel);">
              👤 <span id="nav-username">User</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" style="background:var(--espresso);border:1px solid rgba(200,147,74,0.3);">
              <li><a class="dropdown-item" href="#" id="nav-logout" style="color:var(--cream);font-size:0.85rem;">Sign Out</a></li>
            </ul>
          </div>
          <a href="#" class="nav-link cart-btn" id="cart-toggle">🛒 Cart <span id="cart-count" style="display:none">0</span></a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Cart Sidebar -->
  <div class="cart-overlay"></div>
  <div id="cart-sidebar">
    <div class="cart-header">
      <h4>Your Order</h4>
      <button class="cart-close" id="cart-close">✕</button>
    </div>
    <div id="cart-items"></div>
    <div class="cart-footer">
      <div class="cart-total-row">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-amount" id="cart-total">$0.00</span>
      </div>
      <button class="btn-brewhaus w-100" id="checkout-btn">Proceed to Checkout →</button>
    </div>
  </div>

  <!-- Auth Modal -->
  <div class="modal fade modal-brewhaus" id="authModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">☕ Brewhaus Account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex border-bottom mb-3" style="border-color:var(--parchment)!important;">
            <button class="auth-tab-btn active" data-tab="login">Sign In</button>
            <button class="auth-tab-btn" data-tab="register">Create Account</button>
          </div>
          <p id="login-error" class="text-danger small" style="display:none;"></p>
          <form id="form-login" class="auth-form form-brewhaus">
            <div class="mb-3">
              <label>Email Address</label>
              <input type="email" id="login-email" class="form-control" placeholder="your@email.com" required>
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn-brewhaus w-100">Sign In</button>
          </form>
          <p id="reg-error" class="text-danger small" style="display:none;"></p>
          <form id="form-register" class="auth-form form-brewhaus" style="display:none;">
            <div class="mb-3">
              <label>Full Name</label>
              <input type="text" id="reg-name" class="form-control" placeholder="Jane Doe" required>
            </div>
            <div class="mb-3">
              <label>Email Address</label>
              <input type="email" id="reg-email" class="form-control" placeholder="your@email.com" required>
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input type="password" id="reg-password" class="form-control" placeholder="Min. 6 characters" required>
            </div>
            <div class="mb-3">
              <label>Confirm Password</label>
              <input type="password" id="reg-confirm" class="form-control" placeholder="Repeat password" required>
            </div>
            <button type="submit" class="btn-brewhaus w-100">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;
};

window.BrewhausFooter = function () {
  return `
  <footer>
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="footer-brand">Brew<span>haus</span></div>
          <p class="footer-desc">Artisan coffee crafted with purpose. From the farm to your cup, every sip tells the story of exceptional beans and passionate people.</p>
          <div class="social-links mt-3">
            <a href="#" class="social-link">𝕏</a>
            <a href="#" class="social-link">in</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">f</a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <p class="footer-heading">Menu</p>
          <ul class="footer-links">
            <li><a href="menu.html">Espresso Drinks</a></li>
            <li><a href="menu.html">Cold Brews</a></li>
            <li><a href="menu.html">Pastries</a></li>
            <li><a href="menu.html">Merchandise</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <p class="footer-heading">Company</p>
          <ul class="footer-links">
            <li><a href="about.html">Our Story</a></li>
            <li><a href="about.html">Our Team</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="feedback.html">Reviews</a></li>
          </ul>
        </div>
        <div class="col-lg-4">
          <p class="footer-heading">Visit Us</p>
          <p style="font-size:0.88rem;color:rgba(245,239,224,0.65);line-height:1.8;">
            24 Artisan Lane, SoHo<br>New York, NY 10013<br><br>
            Mon–Fri: 7am – 9pm<br>Sat–Sun: 8am – 10pm<br><br>
            📞 (212) 555-0187<br>✉️ hello@brewhaus.coffee
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2024 Brewhaus Coffee Co. All rights reserved.</span>
        <div style="font-size:0.78rem;color:rgba(245,239,224,0.35);">Made with ☕ & passion</div>
      </div>
    </div>
  </footer>`;
};
