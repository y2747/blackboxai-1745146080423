// JavaScript for VerdeVista e-commerce site

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Cart data stored in localStorage
  const cartKey = 'verdevistaCart';

  // Sample product data for featured products and catalog
  const products = [
    {
      id: 1,
      name: 'PureHydra Moisturizer',
      price: 29.99,
      image: 'https://images.pexels.com/photos/3965546/pexels-photo-3965546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Lightweight moisturizer with organic hyaluronic acid for deep hydration.',
    },
    {
      id: 2,
      name: 'GreenCleanser Facial Cleanser',
      price: 19.99,
      image: 'https://images.pexels.com/photos/4050311/pexels-photo-4050311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Gentle, effective cleanser with natural extracts.',
    },
    {
      id: 3,
      name: 'VitaC Serum',
      price: 34.99,
      image: 'https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Concentrated vitamin C serum for brightening and protection.',
    },
    {
      id: 4,
      name: 'EcoToner Balancing Toner',
      price: 24.99,
      image: 'https://images.pexels.com/photos/4050313/pexels-photo-4050313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Natural toner to balance skin pH and tighten pores.',
    },
    {
      id: 5,
      name: 'BambooExfoliant Gentle Scrub',
      price: 22.99,
      image: 'https://images.pexels.com/photos/4050314/pexels-photo-4050314.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Biodegradable exfoliating scrub with bamboo particles.',
    },
    {
      id: 6,
      name: 'NightRepair Cream',
      price: 39.99,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Rich night cream for overnight skin repair.',
    },
    {
      id: 7,
      name: 'SunShield SPF 30',
      price: 27.99,
      image: 'https://images.pexels.com/photos/4050316/pexels-photo-4050316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Lightweight, non-greasy sunscreen with natural ingredients.',
    },
    {
      id: 8,
      name: 'EyeRevive Cream',
      price: 25.99,
      image: 'https://images.pexels.com/photos/4050317/pexels-photo-4050317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Nourishing eye cream for dark circles and puffiness.',
    },
    {
      id: 9,
      name: 'FaceMask Detox Clay Mask',
      price: 29.99,
      image: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Detoxifying clay mask with natural charcoal.',
    },
    {
      id: 10,
      name: 'LipCare Balm',
      price: 14.99,
      image: 'https://images.pexels.com/photos/4050319/pexels-photo-4050319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
      description: 'Natural lip balm with organic beeswax and oils.',
    },
  ];

  // Load cart from localStorage or initialize
  function loadCart() {
    const cartJSON = localStorage.getItem(cartKey);
    return cartJSON ? JSON.parse(cartJSON) : [];
  }

  // Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  // Update cart count in header
  function updateCartCount() {
    const cart = loadCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
  }

  // Add product to cart
  function addToCart(productId) {
    const cart = loadCart();
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
    alert('Product added to cart!');
  }

  // Render featured products on homepage
  function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    // Show first 6 products as featured
    const featured = products.slice(0, 6);
    featured.forEach(product => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow p-4 flex flex-col';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="text-lg font-semibold text-green-800 mb-2">${product.name}</h3>
        <p class="text-green-700 mb-4">$${product.price.toFixed(2)}</p>
        <button class="bg-green-700 text-white py-2 rounded hover:bg-green-800 transition" data-product-id="${product.id}">Add to Cart</button>
      `;
      featuredContainer.appendChild(card);
    });

    // Add event listeners to Add to Cart buttons
    featuredContainer.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.getAttribute('data-product-id'));
        addToCart(productId);
      });
    });
  }

  // Initialize
  updateCartCount();
  renderFeaturedProducts();

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput.value) {
      alert(`Thank you for subscribing with ${emailInput.value}!`);
      emailInput.value = '';
    }
  });

  // Cart button click - redirect to cart page
  const cartButton = document.getElementById('cart-button');
  cartButton.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
});
