let savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];

        // References to the table body and other elements
        const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
        const productCount = document.getElementById('productCount');
        const totalPriceElement = document.getElementById('totalPrice');
        const checkoutButton = document.getElementById('checkoutButton');
        checkoutButton.classList.add('btn')
        checkoutButton.classList.add('btn-primary')

        // Function to create a table row for each product
        function createTableRow(product, index) {
            const row = document.createElement('tr');

            const cellImage = document.createElement('td');
            const img = document.createElement('img');
            img.src = product.img;
            img.alt = product.title;
            img.width = 50;  // Set image width
            cellImage.appendChild(img);
            row.appendChild(cellImage);

            const cellTitle = document.createElement('td');
            cellTitle.textContent = product.title;
            row.appendChild(cellTitle);

            const cellPrice = document.createElement('td');
            cellPrice.textContent = `$${product.price.toFixed(2)}`;
            row.appendChild(cellPrice);

            const cellDescription = document.createElement('td');
            cellDescription.textContent = product.description;
            row.appendChild(cellDescription);

            const cellActions = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete'; 
            deleteButton.classList.add('btn') 
            deleteButton.classList.add('btn-danger') 
            deleteButton.addEventListener('click', () => deleteProduct(index));
            cellActions.appendChild(deleteButton);
            row.appendChild(cellActions);

            return row;
        }

        // Function to delete a product
        function deleteProduct(index) {
            savedProducts.splice(index, 1);
            localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
            renderTable();
        }

        // Function to render the table
        function renderTable() {
            // Clear the existing rows
            tableBody.innerHTML = '';
            // Update the product count
            productCount.textContent = savedProducts.length;
            // Calculate the total price
            let totalPrice = savedProducts.reduce((sum, product) => sum + product.price, 0);
            totalPriceElement.textContent = totalPrice.toFixed(2);
            // Populate the table with saved products
            savedProducts.forEach((product, index) => {
                const tableRow = createTableRow(product, index);
                tableBody.appendChild(tableRow);
            });
        }

        // Function to handle checkout
        function handleCheckout() {
            if (savedProducts.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Confirm checkout action
            const confirmCheckout = confirm('Are you sure you want to confirm your order?');
            if (confirmCheckout) {
                // Clear all products from localStorage
                localStorage.removeItem('savedProducts');
                savedProducts = [];
                renderTable();
                alert('Order confirmed successfully!');
            }
        }

        // Add event listener to checkout button
        checkoutButton.addEventListener('click', handleCheckout);

        // Initial rendering of the table
        renderTable();