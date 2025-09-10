// Mobile menu toggle functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
        
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
            
    // Animate hamburger
    hamburger.classList.toggle('toggle');
});
        



//Rent

const product = [
    {
        id: 1,
        image: 'https://i.pinimg.com/1200x/3a/c1/8c/3ac18cfae36e8b690622bf533e472b4f.jpg',
        price: '$120'
    },
    {
        id: 1,
        image: 'https://i.pinimg.com/1200x/bd/f5/40/bdf540b4e0ef64826d36d6f6b36bb14b.jpg',
        price: '$150'
    },
    {
        id: 1,
        image: 'https://i.pinimg.com/1200x/2e/d4/0c/2ed40c740472ca4c879182f61ce92e38.jpg',
        price: '$180'
    },
    {
        id: 1,
        image: 'https://i.pinimg.com/1200x/eb/ce/c2/ebcec274d265b295d3a7335b222d897d.jpg',
        price: '$200'
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/1200x/94/42/8d/94428d7ab6f6ce60f821be3ef61adac9.jpg',
        price: '$110'
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/1200x/80/b1/ab/80b1ab23dc2b57f23f79744c3291cb65.jpg',
        price: '$100'
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/1200x/05/6a/fb/056afb9d5eb54b55bcdb83bb7e8d7e76.jpg',
        price: '$250'
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/736x/49/43/47/494347d2d240c83cf184edb26e241d9b.jpg',
        price: '$270'
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/1200x/d6/02/40/d6024026724f78b4176cb7d9cef06fb4.jpg',
        price: '$300'
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/736x/66/58/df/6658df4464e643cfb04e9859092eaab1.jpg',
        price: '$270'
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/736x/a4/76/86/a47686b2b55baf9ae43c06d04a65ad3e.jpg',
        price: '$210'
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/1200x/67/9b/a6/679ba64055e1ad642f45d03a4ceaaa2e.jpg',
        price: '$170'
    },
];



// Initialize variables
        let currentPage = 1;
        let itemsPerPage = 6;
        let filteredProducts = [...product];
        let currentFilter = 'all';

        // DOM Elements
        const productsContainer = document.getElementById('productsContainer');
        const paginationElement = document.getElementById('pagination');
        const itemsPerPageElement = document.getElementById('itemsPerPage');
        const filterButtons = document.querySelectorAll('.filter-buttons button');

        // Function to display products
        function displayProducts() {
            // Calculate start and end index
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
            
            // Clear products container
            productsContainer.innerHTML = '';
            
            // Add products to container
            paginatedProducts.forEach(prod => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');
                productElement.innerHTML = `
                    <div class="product-image">
                        <img src="${prod.image}" alt="Product Image">
                    </div>
                    <div class="product-info">
                        <div class="product-id">ID: ${prod.id}</div>
                        <div class="product-price">${prod.price}</div>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            });
            
            // Update pagination buttons
            updatePagination();
        }

        // Function to update pagination buttons
        function updatePagination() {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            
            // Clear pagination element
            paginationElement.innerHTML = '';
            
            // Previous button
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayProducts();
                }
            });
            if (currentPage === 1) prevButton.disabled = true;
            paginationElement.appendChild(prevButton);
            
            // Page buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                if (i === currentPage) pageButton.classList.add('active');
                
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayProducts();
                });
                
                paginationElement.appendChild(pageButton);
            }
            
            // Next button
            const nextButton = document.createElement('button');
            nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayProducts();
                }
            });
            if (currentPage === totalPages) nextButton.disabled = true;
            paginationElement.appendChild(nextButton);
        }

        // Event listener for items per page change
        itemsPerPageElement.addEventListener('change', () => {
            itemsPerPage = parseInt(itemsPerPageElement.value);
            currentPage = 1;
            displayProducts();
        });

        // Event listeners for filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Get filter ID
                const filterId = button.getAttribute('data-id');
                currentFilter = filterId;
                
                // Filter products
                if (filterId === 'all') {
                    filteredProducts = [...product];
                } else {
                    filteredProducts = product.filter(prod => prod.id === parseInt(filterId));
                }
                
                // Reset to first page and display
                currentPage = 1;
                displayProducts();
            });
        });

        // Initial display
        displayProducts();

        //contact
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = document.querySelectorAll('#contactForm [required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField.value && !emailPattern.test(emailField.value)) {
                emailField.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset form after successful submission
                setTimeout(() => {
                    this.reset();
                    document.getElementById('successMessage').style.display = 'none';
                }, 3000);
            }
        });
        
        // Remove error class when user starts typing
        const formInputs = document.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                }
            });
        });


    
        