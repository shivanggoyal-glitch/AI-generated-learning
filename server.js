const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/tours', (req, res) => {
  res.json(tours);
});

app.get('/api/tours/:id', (req, res) => {
  const tour = tours.find(t => t.id === parseInt(req.params.id));
  if (tour) {
    res.json(tour);
  } else {
    res.status(404).json({ message: 'Tour not found' });
  }
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  bookings.push(booking);
  res.status(201).json({ message: 'Booking created', booking });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Sample data
let tours = [
  {
    id: 1,
    name: 'Paris City Tour',
    destination: 'Paris, France',
    duration: '5 days',
    price: 1200,
    image: 'https://via.placeholder.com/400x300?text=Paris',
    description: 'Experience the beauty of Paris with guided tours of Eiffel Tower, Louvre, and Notre-Dame.',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    duration: '7 days',
    price: 1500,
    image: 'https://via.placeholder.com/400x300?text=Tokyo',
    description: 'Explore Tokyo\'s vibrant culture, temples, and modern architecture.',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Dubai Desert Safari',
    destination: 'Dubai, UAE',
    duration: '3 days',
    price: 800,
    image: 'https://via.placeholder.com/400x300?text=Dubai',
    description: 'Experience the thrill of desert safari with camel rides and traditional BBQ.',
    rating: 4.7
  },
  {
    id: 4,
    name: 'New York Explorer',
    destination: 'New York, USA',
    duration: '4 days',
    price: 1100,
    image: 'https://via.placeholder.com/400x300?text=NewYork',
    description: 'Discover the city that never sleeps with iconic landmarks and Broadway shows.',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Maldives Paradise',
    destination: 'Maldives',
    duration: '6 days',
    price: 2000,
    image: 'https://via.placeholder.com/400x300?text=Maldives',
    description: 'Relax on pristine beaches with water sports and luxury resort experience.',
    rating: 5.0
  },
  {
    id: 6,
    name: 'Swiss Alps Expedition',
    destination: 'Switzerland',
    duration: '8 days',
    price: 1800,
    image: 'https://via.placeholder.com/400x300?text=Switzerland',
    description: 'Adventure through the majestic Alps with hiking, skiing, and breathtaking views.',
    rating: 4.8
  }
];

let bookings = [];

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
