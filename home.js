document.addEventListener('DOMContentLoaded', (event) => {
    const message = "Welcome To My Store";
    const div = document.getElementById('typewriter');
    let index = 0;

    function typeWriter() {
        if (index < message.length) {
            div.innerHTML += message.charAt(index);
            index++;
            if(index == message.length){index =0; 
                div.innerHTML="";
            }
            setTimeout(typeWriter, 300); // Adjust the delay time (in milliseconds) as needed

        } 
      
    }

    typeWriter();
}); 
/**
 * **********************************************************************************
 * Slider Part
 * ********************************************************************************
 */ 
class Counter {
    static count = 0;
}

let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.img-item');
    const totalSlides = slides.length;

    // Handle out-of-bounds indices by wrapping around
    if (index >= totalSlides) {
        Counter.count = 0;
    } else if (index < 0) {
        Counter.count = totalSlides - 1;
    } else {
        Counter.count = index;
    }

    // Reset the display of all slides
    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    // Display the current slide
    slides[Counter.count].style.display = "block";
}

function nextSlide() {
    showSlide(Counter.count + 1);
}

function prevSlide() {
    showSlide(Counter.count - 1);
}
showSlide(Counter.count);
/**
 * *******************************************************************************
 * fetch data And display categories 
 * ******************************************************************************
 */ 
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');

    // Define API endpoints
    const apiEndpoints = {
        all: 'https://fakestoreapi.com/products',
        jewelery: 'https://fakestoreapi.com/products/category/jewelery',
        mensClothing: 'https://fakestoreapi.com/products/category/men\'s clothing',
        electronics: 'https://fakestoreapi.com/products/category/electronics',
        womensClothing: 'https://fakestoreapi.com/products/category/women\'s clothing'
    };

    // Add event listeners to buttons
    document.getElementById('displayAllProducts').addEventListener('click', () => fetchAndDisplayProducts(apiEndpoints.all));
    document.getElementById('displayJewelery').addEventListener('click', () => fetchAndDisplayProducts(apiEndpoints.jewelery));
    document.getElementById('displayMensClothing').addEventListener('click', () => fetchAndDisplayProducts(apiEndpoints.mensClothing));
    document.getElementById('displayElectronics').addEventListener('click', () => fetchAndDisplayProducts(apiEndpoints.electronics));
    document.getElementById('displayWomensClothing').addEventListener('click', () => fetchAndDisplayProducts(apiEndpoints.womensClothing));

    // Fetch and display all products by default
    fetchAndDisplayProducts(apiEndpoints.all);

    async function fetchAndDisplayProducts(apiUrl) {
        try {
            // Fetch products from the API
            const response = await fetch(apiUrl);
            const products = await response.json();
            
            // Clear previous products
            productsContainer.innerHTML = '';

            // Display products
            products.forEach(product => {
                const prd = {
                    id: product.id,
                    img: product.image,
                    title: product.title,
                    price: product.price,
                    description: product.description
                };

                const productDiv = document.createElement('div');
                let truncatedDescription = product.description;
                if (truncatedDescription.length > 100) {
                    truncatedDescription = truncatedDescription.substring(0, 100) + '...';
                }
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <div class="card prd" style="width: 18rem;">
                        <img class="card-img-top" src="${product.image}" alt="Card image cap" width="300px" height="300px"/>
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${truncatedDescription}</p>
                            <p>Price: $${product.price}</p>
                            <p>Category: ${product.category}</p>
                            <button class="btn btn-outline-primary" onclick='addToLocalStorage(${JSON.stringify(prd)})'>Save Product</button>
                        </div>
                    </div>`;
                
                productsContainer.appendChild(productDiv);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
});

function addToLocalStorage(product) {
    let savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];

    // Check if the product is already in localStorage
    const productExists = savedProducts.some(savedProduct => savedProduct.id === product.id);

    if (productExists) {
        alert('Product is already saved!');
    } else {
        // Add the new product to the array
        savedProducts.push(product);

        // Save the updated array back to localStorage
        localStorage.setItem('savedProducts', JSON.stringify(savedProducts));

        alert('Product saved!');
    }
}

/**
 * ******************************************************************
 * Login Vlidation
 * *******************************
 */ 
const userName =JSON.parse(localStorage.getItem('userName'));
console.log(userName) 
var logo = document.getElementById('logo'); 
logo.textContent=userName[0].userName;