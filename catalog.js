document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart_items");
    const totalPriceElement = document.getElementById("total-price");

    const cart = new Map();

    // Event delegation for "Add to Cart" buttons
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const productElement = event.target.closest(".product");
            const productId = productElement.dataset.id;
            const productName = productElement.querySelector(".product-name").textContent;
            const productPrice = parseFloat(productElement.querySelector(".product-price").textContent);

            if (cart.has(productId)) {
                cart.get(productId).quantity += 1;
            } else {
                cart.set(productId, { name: productName, price: productPrice, quantity: 1 });
            }

            updateCartDisplay();
        }
    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
            cartItemsContainer.appendChild(listItem);
        });
        totalPriceElement.textContent = total.toFixed(2);
    }
});
