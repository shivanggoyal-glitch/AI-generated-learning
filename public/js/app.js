// Global State
const state = {
  currentPage: 'home',
  tours: [],
  cart: [],
  filteredTours: [],
  selectedTour: null,
  bookingForm: {}
};

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  fetchTours();
  render();
});

// Fetch tours from API
async function fetchTours() {
  try {
    const response = await fetch('/api/tours');
    state.tours = await response.json();
    state.filteredTours = state.tours;
  } catch (error) {
    console.error('Error fetching tours:', error);
  }
}

// Inject Styles
function injectStyles() {
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }

    .logo {
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-links {
      display: flex;
      gap: 20px;
      list-style: none;
    }

    .nav-link {
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.3s;
      background: rgba(255, 255, 255, 0.1);
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .nav-link.active {
      background: white;
      color: #667eea;
      font-weight: bold;
    }

    .cart-icon {
      position: relative;
      cursor: pointer;
      font-size: 20px;
    }

    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ff6b6b;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .hero {
      text-align: center;
      color: white;
      margin-bottom: 50px;
    }

    .hero h1 {
      font-size: 48px;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero p {
      font-size: 20px;
      margin-bottom: 30px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .search-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      justify-content: center;
    }

    .search-input {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      width: 300px;
      font-size: 16px;
    }

    .search-btn {
      padding: 12px 30px;
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.3s;
    }

    .search-btn:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }

    .filter-section {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .filter-btn {
      padding: 10px 20px;
      background: white;
      border: 2px solid #667eea;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .filter-btn:hover {
      background: #667eea;
      color: white;
    }

    .filter-btn.active {
      background: #667eea;
      color: white;
    }

    .tours-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .tour-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
      cursor: pointer;
    }

    .tour-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .tour-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .tour-content {
      padding: 20px;
    }

    .tour-name {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }

    .tour-destination {
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .tour-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
    }

    .tour-rating {
      color: #ffc107;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .tour-price {
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 15px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      width: 100%;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .tour-detail-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 200;
      align-items: center;
      justify-content: center;
    }

    .tour-detail-modal.active {
      display: flex;
    }

    .tour-detail-content {
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 30px;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 28px;
      cursor: pointer;
      color: #666;
      background: none;
      border: none;
    }

    .close-btn:hover {
      color: #333;
    }

    .detail-image {
      width: 100%;
      height: 350px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .detail-section {
      margin-bottom: 20px;
    }

    .detail-section h3 {
      color: #667eea;
      margin-bottom: 10px;
    }

    .cart-page {
      color: white;
    }

    .cart-item {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333;
    }

    .cart-summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      color: #333;
      margin-top: 30px;
      text-align: right;
    }

    .cart-total {
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 20px;
    }

    .booking-form {
      background: white;
      padding: 30px;
      border-radius: 12px;
      margin-top: 30px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
    }

    .form-group textarea {
      resize: vertical;
      min-height: 100px;
    }

    .btn-success {
      background: #10b981;
      color: white;
    }

    .btn-success:hover {
      background: #059669;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: white;
    }

    .empty-state h2 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    .empty-state p {
      font-size: 18px;
      margin-bottom: 30px;
    }

    .remove-btn {
      background: #ff6b6b;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .remove-btn:hover {
      background: #ff5252;
    }

    .success-message {
      background: #10b981;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
    }

    .no-results {
      text-align: center;
      color: white;
      padding: 40px;
      font-size: 18px;
    }
  `;
  document.getElementById('app-styles').textContent = styles;
}

// Render App
function render() {
  const root = document.getElementById('root');
  
  if (state.currentPage === 'home') {
    root.innerHTML = renderHome();
  } else if (state.currentPage === 'cart') {
    root.innerHTML = renderCart();
  } else if (state.currentPage === 'bookings') {
    root.innerHTML = renderBookings();
  }
  
  attachEventListeners();
}

// Render Home Page
function renderHome() {
  return `
    <header>
      <div class="header-container">
        <div class="logo" onclick="navigateTo('home')">
          ✈️ Tours & Travels
        </div>
        <nav>
          <ul class="nav-links">
            <li class="nav-link ${state.currentPage === 'home' ? 'active' : ''}" onclick="navigateTo('home')">Home</li>
            <li class="nav-link ${state.currentPage === 'bookings' ? 'active' : ''}" onclick="navigateTo('bookings')">My Bookings</li>
            <li class="nav-link" onclick="navigateTo('cart')">
              <span class="cart-icon">🛒</span>
              <span class="cart-count" style="display: ${state.cart.length > 0 ? 'flex' : 'none'}">${state.cart.length}</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container">
      <div class="hero">
        <h1>🌍 Explore the World</h1>
        <p>Discover amazing tours and travel experiences</p>
      </div>

      <div class="search-bar">
        <input type="text" class="search-input" id="searchInput" placeholder="Search tours...">
        <button class="search-btn" onclick="handleSearch()">Search</button>
      </div>

      <div class="filter-section">
        <button class="filter-btn active" onclick="filterByPrice('all')">All Tours</button>
        <button class="filter-btn" onclick="filterByPrice('budget')">Budget (< $1000)</button>
        <button class="filter-btn" onclick="filterByPrice('mid')">Mid Range ($1000-$1500)</button>
        <button class="filter-btn" onclick="filterByPrice('luxury')">Luxury (> $1500)</button>
      </div>

      ${state.filteredTours.length > 0 ? `
        <div class="tours-grid">
          ${state.filteredTours.map(tour => `
            <div class="tour-card" onclick="viewTourDetails(${tour.id})">
              <img src="${tour.image}" alt="${tour.name}" class="tour-image">
              <div class="tour-content">
                <div class="tour-name">${tour.name}</div>
                <div class="tour-destination">📍 ${tour.destination}</div>
                <div class="tour-details">
                  <span>⏱️ ${tour.duration}</span>
                  <span class="tour-rating">⭐ ${tour.rating}</span>
                </div>
                <div class="tour-price">$${tour.price}</div>
                <button class="btn btn-primary" onclick="addToCart(${tour.id}, event)">Add to Cart</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="no-results">No tours found. Try different search criteria.</div>
      `}
    </div>

    <div class="tour-detail-modal" id="tourDetailModal">
      <div class="tour-detail-content" id="tourDetailContent"></div>
    </div>
  `;
}

// Render Cart Page
function renderCart() {
  const total = state.cart.reduce((sum, tour) => sum + tour.price, 0);
  
  return `
    <header>
      <div class="header-container">
        <div class="logo" onclick="navigateTo('home')">✈️ Tours & Travels</div>
        <nav>
          <ul class="nav-links">
            <li class="nav-link" onclick="navigateTo('home')">Home</li>
            <li class="nav-link" onclick="navigateTo('bookings')">My Bookings</li>
            <li class="nav-link active" onclick="navigateTo('cart')">🛒</li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container cart-page">
      <h1>🛒 Your Cart</h1>
      
      ${state.cart.length > 0 ? `
        ${state.cart.map((tour, index) => `
          <div class="cart-item">
            <div>
              <h3>${tour.name}</h3>
              <p>${tour.destination}</p>
            </div>
            <div>
              <p style="font-size: 20px; font-weight: bold; color: #667eea;">$${tour.price}</p>
              <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
          </div>
        `).join('')}
        
        <div class="cart-summary">
          <div class="cart-total">Total: $${total}</div>
          <button class="btn btn-primary" style="width: auto; padding: 12px 30px;" onclick="proceedToBooking()">Proceed to Booking</button>
        </div>
      ` : `
        <div class="empty-state">
          <h2>Your cart is empty</h2>
          <p>Start exploring and add some amazing tours!</p>
          <button class="btn btn-primary" style="width: auto; padding: 12px 30px;" onclick="navigateTo('home')">Continue Shopping</button>
        </div>
      `}
    </div>
  `;
}

// Render Bookings Page
function renderBookings() {
  return `
    <header>
      <div class="header-container">
        <div class="logo" onclick="navigateTo('home')">✈️ Tours & Travels</div>
        <nav>
          <ul class="nav-links">
            <li class="nav-link" onclick="navigateTo('home')">Home</li>
            <li class="nav-link active" onclick="navigateTo('bookings')">My Bookings</li>
            <li class="nav-link" onclick="navigateTo('cart')">🛒</li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container">
      <h1 style="color: white; margin-bottom: 30px;">📋 My Bookings</h1>
      
      <div class="booking-form">
        <h2>Complete Your Booking</h2>
        <form onsubmit="submitBooking(event)">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="fullName" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" id="phone" required>
          </div>
          <div class="form-group">
            <label>Special Requests</label>
            <textarea id="specialRequests"></textarea>
          </div>
          <button type="submit" class="btn btn-success" style="width: 100%; padding: 12px;">Complete Booking</button>
        </form>
      </div>

      <div id="bookingsList" style="margin-top: 30px;"></div>
    </div>
  `;
}

// Navigation
function navigateTo(page) {
  state.currentPage = page;
  render();
  window.scrollTo(0, 0);
}

// Search functionality
function handleSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  state.filteredTours = state.tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm) ||
    tour.destination.toLowerCase().includes(searchTerm) ||
    tour.description.toLowerCase().includes(searchTerm)
  );
  render();
}

// Filter by price
function filterByPrice(category) {
  if (category === 'all') {
    state.filteredTours = state.tours;
  } else if (category === 'budget') {
    state.filteredTours = state.tours.filter(tour => tour.price < 1000);
  } else if (category === 'mid') {
    state.filteredTours = state.tours.filter(tour => tour.price >= 1000 && tour.price <= 1500);
  } else if (category === 'luxury') {
    state.filteredTours = state.tours.filter(tour => tour.price > 1500);
  }
  render();
}

// View tour details
function viewTourDetails(tourId) {
  const tour = state.tours.find(t => t.id === tourId);
  if (tour) {
    const modal = document.getElementById('tourDetailModal');
    const content = document.getElementById('tourDetailContent');
    content.innerHTML = `
      <button class="close-btn" onclick="closeTourDetail()">×</button>
      <img src="${tour.image}" alt="${tour.name}" class="detail-image">
      <h2>${tour.name}</h2>
      
      <div class="detail-section">
        <h3>📍 Destination</h3>
        <p>${tour.destination}</p>
      </div>
      
      <div class="detail-section">
        <h3>⏱️ Duration</h3>
        <p>${tour.duration}</p>
      </div>
      
      <div class="detail-section">
        <h3>⭐ Rating</h3>
        <p>${tour.rating} / 5.0</p>
      </div>
      
      <div class="detail-section">
        <h3>💰 Price</h3>
        <p style="font-size: 24px; color: #667eea; font-weight: bold;">$${tour.price}</p>
      </div>
      
      <div class="detail-section">
        <h3>📝 Description</h3>
        <p>${tour.description}</p>
      </div>
      
      <button class="btn btn-primary" style="width: 100%; padding: 12px;" onclick="addToCart(${tour.id}, event); closeTourDetail();">Add to Cart</button>
    `;
    modal.classList.add('active');
  }
}

// Close tour detail modal
function closeTourDetail() {
  document.getElementById('tourDetailModal').classList.remove('active');
}

// Add to cart
function addToCart(tourId, event) {
  event.stopPropagation();
  const tour = state.tours.find(t => t.id === tourId);
  if (tour) {
    state.cart.push(tour);
    alert(`${tour.name} added to cart!`);
    render();
  }
}

// Remove from cart
function removeFromCart(index) {
  state.cart.splice(index, 1);
  render();
}

// Proceed to booking
function proceedToBooking() {
  navigateTo('bookings');
}

// Submit booking
async function submitBooking(event) {
  event.preventDefault();
  
  const booking = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    specialRequests: document.getElementById('specialRequests').value,
    tours: state.cart,
    totalPrice: state.cart.reduce((sum, tour) => sum + tour.price, 0),
    bookingDate: new Date().toISOString()
  };
  
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    });
    
    if (response.ok) {
      alert('Booking confirmed! Check your email for confirmation.');
      state.cart = [];
      navigateTo('home');
    }
  } catch (error) {
    console.error('Error submitting booking:', error);
    alert('Error submitting booking. Please try again.');
  }
}

// Attach event listeners
function attachEventListeners() {
  document.addEventListener('click', (e) => {
    if (e.target.id === 'tourDetailModal') {
      closeTourDetail();
    }
  });
}
