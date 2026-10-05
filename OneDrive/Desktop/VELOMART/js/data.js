// Sample Vehicle Data
const vehicles = [
    {
        id: 1,
        name: 'Toyota Corolla Altis 2022',
        category: 'cars',
        type: 'Sedan',
        price: 980000,
        year: 2022,
        mileage: '35,000 km',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
        images: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ],
        description: 'Well-maintained Toyota Corolla Altis 2022. Smooth drive, very fuel efficient. Complete papers and clean history.',
        features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Bluetooth', 'Backup Camera', 'Cruise Control'],
        seller: 'Verified Seller',
        location: 'Metro Manila',
        status: 'active'
    },
    {
        id: 2,
        name: 'Honda Click 150i 2023',
        category: 'motorcycles',
        type: 'Scooter',
        price: 125000,
        year: 2023,
        mileage: '8,500 km',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Red',
        image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=500',
        images: [
            'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
            'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
            'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800'
        ],
        description: 'Almost brand new Honda Click 150i. Very economical and perfect for daily commute.',
        features: ['LED Lights', 'Digital Display', 'USB Charging', 'Anti-theft Alarm', 'Under Seat Storage'],
        seller: 'Verified Seller',
        location: 'Quezon City',
        status: 'active'
    },
    {
        id: 3,
        name: 'Suzuki Dzire 2020',
        category: 'cars',
        type: 'Sedan',
        price: 420000,
        year: 2020,
        mileage: '45,000 km',
        transmission: 'Manual',
        fuelType: 'Gasoline',
        color: 'Silver',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500',
        images: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ],
        description: 'Reliable and fuel-efficient Suzuki Dzire. Perfect first car or family vehicle.',
        features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'ABS Brakes'],
        seller: 'Verified Seller',
        location: 'Caloocan',
        status: 'active'
    },
    {
        id: 4,
        name: 'Ford Ranger 2021',
        category: 'trucks',
        type: 'Pickup',
        price: 1250000,
        year: 2021,
        mileage: '28,000 km',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
        images: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
        ],
        description: 'Powerful Ford Ranger 2021. Perfect for both work and adventure.',
        features: ['4x4 Drive', 'Turbo Diesel', 'Leather Seats', 'Touchscreen Display', 'Reverse Camera'],
        seller: 'Verified Seller',
        location: 'Cavite',
        status: 'active'
    },
    {
        id: 5,
        name: 'Toyota Hiace 2019',
        category: 'vans',
        type: 'Van',
        price: 850000,
        year: 2019,
        mileage: '65,000 km',
        transmission: 'Manual',
        fuelType: 'Diesel',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=500',
        images: [
            'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800'
        ],
        description: 'Spacious Toyota Hiace 2019. Ideal for family or business use. 15-seater capacity.',
        features: ['15 Seater', 'Air Conditioning', 'Spacious Interior', 'Diesel Engine'],
        seller: 'Verified Seller',
        location: 'Rizal',
        status: 'active'
    },
    {
        id: 6,
        name: 'Yamaha NMAX 2021',
        category: 'motorcycles',
        type: 'Scooter',
        price: 115000,
        year: 2021,
        mileage: '12,000 km',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Blue',
        image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500',
        images: [
            'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
            'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'
        ],
        description: 'Popular Yamaha NMAX. Comfortable for long rides and daily commute.',
        features: ['ABS Brakes', 'Smart Key', 'LED Lights', 'Digital Display', 'USB Port'],
        seller: 'Verified Seller',
        location: 'Pasig City',
        status: 'active'
    },
    {
        id: 7,
        name: 'Kia Carnival 2020',
        category: 'vans',
        type: 'MPV',
        price: 1450000,
        year: 2020,
        mileage: '38,000 km',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Gray',
        image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=500',
        images: [
            'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800'
        ],
        description: 'Luxurious Kia Carnival with premium features. Perfect for family trips.',
        features: ['Leather Seats', 'Sunroof', 'Entertainment System', 'Captain Seats', '7 Seater'],
        seller: 'Verified Seller',
        location: 'Makati',
        status: 'active'
    },
    {
        id: 8,
        name: 'Kawasaki Rouser NS160 2022',
        category: 'motorcycles',
        type: 'Sport',
        price: 98000,
        year: 2022,
        mileage: '5,000 km',
        transmission: 'Manual',
        fuelType: 'Gasoline',
        color: 'Black/Green',
        image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=500',
        images: [
            'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800'
        ],
        description: 'Sporty Kawasaki Rouser. Low mileage, excellent condition.',
        features: ['Digital Display', 'LED Lights', 'Disc Brakes', 'Sporty Design'],
        seller: 'Verified Seller',
        location: 'Marikina',
        status: 'active'
    },
    {
        id: 9,
        name: 'Caterpillar 320D Excavator 2019',
        category: 'heavy',
        type: 'Excavator',
        price: 3500000,
        year: 2019,
        mileage: '2,800 hours',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Yellow',
        image: 'images/komatsu-pc200.jpg',
        images: [
            'images/komatsu-pc200.jpg',
            'https://images.unsplash.com/photo-1590319015799-23b191d76d3d?w=800&q=80',
            'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80'
        ],
        description: 'Heavy-duty Caterpillar 320D Excavator. Perfect for construction and mining projects. Well-maintained with complete service records.',
        features: ['Hydraulic System', 'Air Conditioned Cabin', 'GPS Tracking', 'Auto-Greasing System', '20-ton Capacity', 'Backup Camera'],
        seller: 'Verified Seller',
        location: 'Batangas',
        status: 'active'
    },
    {
        id: 10,
        name: 'Komatsu PC200 Excavator 2020',
        category: 'heavy',
        type: 'Excavator',
        price: 4200000,
        year: 2020,
        mileage: '1,500 hours',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Yellow',
        image: 'images/caterpillar-320d.jpg',
        images: [
            'images/caterpillar-320d.jpg',
            'https://images.unsplash.com/photo-1625225233840-695456021cde?w=800&q=80',
            'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80'
        ],
        description: 'Komatsu PC200 Excavator in excellent condition. Low operating hours. Ideal for heavy construction work.',
        features: ['22-ton Class', 'Eco Mode', 'Hydraulic Quick Coupler', 'Rearview Camera', 'Air Suspension Seat', 'LED Work Lights'],
        seller: 'Verified Seller',
        location: 'Pampanga',
        status: 'active'
    },
    {
        id: 11,
        name: 'JCB Backhoe Loader 3CX 2021',
        category: 'heavy',
        type: 'Backhoe Loader',
        price: 2800000,
        year: 2021,
        mileage: '1,200 hours',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        color: 'Yellow/Black',
        image: 'images/jcb-backhoe-3cx.jpg',
        images: [
            'images/jcb-backhoe-3cx.jpg',
            'https://images.unsplash.com/photo-1581578017093-cd30ed25cc61?w=800&q=80',
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
        ],
        description: 'Versatile JCB 3CX Backhoe Loader. Excellent for excavation, loading, and digging operations. Well-maintained unit.',
        features: ['4WD', 'Extendable Dipper', 'Quick Hitch', 'Air Conditioning', 'Power Shift Transmission', '4-in-1 Bucket'],
        seller: 'Verified Seller',
        location: 'Bulacan',
        status: 'active'
    },
    {
        id: 12,
        name: 'Tesla Model 3 2023',
        category: 'electric',
        type: 'Sedan',
        price: 2450000,
        year: 2023,
        mileage: '8,000 km',
        transmission: 'Automatic',
        fuelType: 'Electric',
        color: 'Pearl White',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
            'https://images.unsplash.com/photo-1617788138017-5a6c0d1a6a8d?w=800&q=80',
            'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80'
        ],
        description: 'Premium Tesla Model 3 Long Range. Autopilot enabled. Zero emissions. Full self-driving capability. Outstanding range and performance.',
        features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Heated Seats', '15-inch Touchscreen', 'Over-the-Air Updates', 'Supercharger Access'],
        seller: 'Verified Seller',
        location: 'BGC, Taguig',
        status: 'active'
    },
    {
        id: 13,
        name: 'Nissan Leaf 2022',
        category: 'electric',
        type: 'Hatchback',
        price: 1890000,
        year: 2022,
        mileage: '12,000 km',
        transmission: 'Automatic',
        fuelType: 'Electric',
        color: 'White',
        image: 'images/nissan-leaf-2022.jpg',
        images: [
            'images/nissan-leaf-2022.jpg',
            'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80'
        ],
        description: 'Nissan Leaf - The world\'s best-selling electric car. Perfect for city driving. Zero emissions and very economical.',
        features: ['ProPILOT Assist', 'e-Pedal', 'Apple CarPlay', 'Android Auto', 'Around View Monitor', '40 kWh Battery', 'CHAdeMO Fast Charging'],
        seller: 'Verified Seller',
        location: 'Makati',
        status: 'active'
    },
    {
        id: 14,
        name: 'BYD Atto 3 2023',
        category: 'electric',
        type: 'SUV',
        price: 1798000,
        year: 2023,
        mileage: '5,000 km',
        transmission: 'Automatic',
        fuelType: 'Electric',
        color: 'Gray',
        image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'
        ],
        description: 'BYD Atto 3 Electric SUV. Spacious, modern, and eco-friendly. Advanced safety features and impressive range.',
        features: ['60.48 kWh Battery', '420km Range', '12.8-inch Rotating Screen', 'Panoramic Sunroof', 'Adaptive Cruise Control', 'Wireless Charging'],
        seller: 'Verified Seller',
        location: 'Quezon City',
        status: 'active'
    },
    {
        id: 15,
        name: 'Hyundai Ioniq 5 2023',
        category: 'electric',
        type: 'Crossover',
        price: 2998000,
        year: 2023,
        mileage: '3,500 km',
        transmission: 'Automatic',
        fuelType: 'Electric',
        color: 'Silver',
        image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
            'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=800&q=80'
        ],
        description: 'Award-winning Hyundai Ioniq 5. Futuristic design with cutting-edge technology. Ultra-fast charging and impressive range.',
        features: ['72.6 kWh Battery', '481km Range', 'Vehicle-to-Load', 'Augmented Reality HUD', 'Relaxation Seats', 'Smart Parking', '800V Fast Charging'],
        seller: 'Verified Seller',
        location: 'Pasig City',
        status: 'active'
    }
];

// Format price to Philippine Peso
function formatPrice(price) {
    return '₱' + price.toLocaleString('en-PH');
}

// Get vehicle by ID
function getVehicleById(id) {
    return vehicles.find(v => v.id === parseInt(id));
}

// Filter vehicles
function filterVehicles(category = null, minPrice = 0, maxPrice = Infinity, searchTerm = '') {
    return vehicles.filter(v => {
        const matchesCategory = !category || category === 'all' || v.category === category;
        const matchesPrice = v.price >= minPrice && v.price <= maxPrice;
        const matchesSearch = !searchTerm || 
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch && v.status === 'active';
    });
}

// Get featured vehicles (first 4)
function getFeaturedVehicles() {
    return vehicles.filter(v => v.status === 'active').slice(0, 4);
}
