# Tours & Travels Ecommerce SPA

A modern single-page application (SPA) for tours and travels ecommerce built with **Node.js and pure JavaScript** - no HTML or CSS files!

## 🚀 Features

✅ **Pure JavaScript Architecture**
- No separate HTML/CSS files
- All styles dynamically injected via JavaScript
- Single HTML file with dynamic DOM manipulation

✅ **Single Page Application (SPA)**
- Client-side routing (Home, Cart, Bookings)
- Smooth navigation without page reloads
- State management with global state object

✅ **Ecommerce Features**
- Browse 6 sample tours with details
- Search functionality
- Price-based filtering (Budget, Mid-Range, Luxury)
- Shopping cart system
- Tour detail modal
- Booking management

✅ **Responsive Design**
- Beautiful gradient UI
- Grid-based tour cards
- Mobile-friendly layout
- Smooth animations and transitions

## 📋 Project Structure

```
.
├── package.json          # Node dependencies
├── server.js             # Express backend with API routes
└── public/
    ├── index.html        # Single HTML file (minimal)
    └── js/
        └── app.js        # All logic, styling, and rendering
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivanggoyal-glitch/AI-generated-learning.git
   cd AI-generated-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📚 API Endpoints

### GET /api/tours
Fetch all available tours
```json
[
  {
    "id": 1,
    "name": "Paris City Tour",
    "destination": "Paris, France",
    "duration": "5 days",
    "price": 1200,
    "image": "...",
    "description": "...",
    "rating": 4.8
  }
]
```

### GET /api/tours/:id
Fetch a specific tour by ID

### POST /api/bookings
Create a new booking
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "specialRequests": "...",
  "tours": [...],
  "totalPrice": 2400,
  "bookingDate": "2024-01-01T..."
}
```

### GET /api/bookings
Fetch all bookings

## 🎨 Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS injected dynamically via JavaScript
- **Architecture**: SPA with client-side routing

## 🎯 How It Works

1. **App Initialization**
   - Styles are injected into the DOM on page load
   - Tours are fetched from the backend API
   - App renders based on current page state

2. **State Management**
   - Single global state object tracks:
     - Current page
     - Tours and filtered tours
     - Shopping cart
     - Selected tour

3. **Dynamic Rendering**
   - `render()` function regenerates entire UI based on state
   - Navigation updates state and triggers re-render
   - No separate template files

4. **Event Handling**
   - Event listeners attached during render
   - Search, filter, and cart operations update state
   - API calls for bookings management

## 📱 Pages

### Home
- Hero section
- Search bar
- Price-based filters
- Tour cards grid
- Tour detail modal

### Cart
- View all added tours
- Remove items
- See total price
- Proceed to booking

### Bookings
- Complete booking form
- Submit booking to backend
- Manage your bookings

## 🚀 Future Enhancements

- User authentication
- Database integration (MongoDB/PostgreSQL)
- Payment gateway integration
- Review and rating system
- Booking history
- Email notifications
- Advanced filtering
- User profiles

## 📝 License

MIT License - Feel free to use this project for learning and development!

## 👨‍💻 Author

Shivang Goyal - Learning as a beginner developer
