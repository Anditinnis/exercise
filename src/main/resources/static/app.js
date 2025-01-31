document.addEventListener('DOMContentLoaded', () => {
    const productsTableBody = document.querySelector('#products-table tbody');
    const addProductForm = document.querySelector('#add-product-form');

    // Функция для получения списка продуктов
    function fetchProducts() {
        fetch('/products')
            .then(response => response.json())
            .then(products => {
                productsTableBody.innerHTML = '';
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>${product.article}</td>
                        <td>${product.description}</td>
                        <td>${product.category}</td>
                        <td>${product.price} руб.</td>
                        <td>${product.quantity} шт.</td>
                        <td>
                            <button onclick="deleteProduct('${product.id}')">Удалить</button> 
                        </td>
                    `;
                    productsTableBody.appendChild(row);
                });
            });
    }

    // Функция для добавления продукта
    addProductForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(addProductForm);
        const product = {};
        formData.forEach((value, key) => {
            product[key] = value;
        });

        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(() => {
            fetchProducts();
            addProductForm.reset();
        });
    });

    // Функция для удаления продукта
    window.deleteProduct = function(id) {
        fetch(`/products/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchProducts());
    };

    // Получение списка продуктов при загрузке страницы
    fetchProducts();
});