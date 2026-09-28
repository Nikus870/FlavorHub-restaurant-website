/* =========================================
   FLAVORHUB - ORDER & CART SYSTEM
========================================= */

let cart = JSON.parse(localStorage.getItem("flavorhubCart")) || [];

let currentCategory = "All";

let couponApplied = false;

const DELIVERY_CHARGE = 40;


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    renderOrderMenu();

    renderCart();

    setupCheckoutForm();

});


/* =========================================
   RENDER ORDER MENU
========================================= */

function renderOrderMenu() {

    const container = document.getElementById("order-menu-grid");

    if (!container) return;

    let filteredItems = menuItems;

    if (currentCategory !== "All") {

        filteredItems = menuItems.filter(function (item) {

            return item.category === currentCategory;

        });

    }


    container.innerHTML = filteredItems.map(function (item) {

        return `

            <div class="menu-card">

                <div class="menu-card-image">

                    <div class="food-placeholder">
                        ${item.emoji || "🍽️"}
                    </div>

                </div>


                <div class="menu-card-content">

                    <div class="menu-card-top">

                        <h3>${item.name}</h3>

                        <strong class="price">
                            ₹${item.price}
                        </strong>

                    </div>


                    <p>
                        ${item.description}
                    </p>


                    <div class="dietary-tags">

                        ${(item.tags || []).map(function (tag) {

                            return `
                                <span class="tag">
                                    ${tag}
                                </span>
                            `;

                        }).join("")}

                    </div>


                    <button
                        type="button"
                        class="btn btn-primary add-cart-btn"
                        onclick="addToCart(${item.id})">

                        + Add to Cart

                    </button>

                </div>

            </div>

        `;

    }).join("");

}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterOrderMenu(category, button) {

    currentCategory = category;


    document.querySelectorAll(".category-btn").forEach(function (btn) {

        btn.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    renderOrderMenu();

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product = menuItems.find(function (item) {

        return item.id === productId;

    });


    if (!product) {

        alert("Product not found.");

        return;

    }


    const existingItem = cart.find(function (item) {

        return item.id === productId;

    });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    saveCart();

    renderCart();


    showCartMessage(`${product.name} added to cart.`);

}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity(productId) {

    const item = cart.find(function (item) {

        return item.id === productId;

    });


    if (item) {

        item.quantity += 1;

    }


    saveCart();

    renderCart();

}


/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity(productId) {

    const item = cart.find(function (item) {

        return item.id === productId;

    });


    if (!item) return;


    if (item.quantity > 1) {

        item.quantity -= 1;

    } else {

        cart = cart.filter(function (cartItem) {

            return cartItem.id !== productId;

        });

    }


    saveCart();

    renderCart();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeFromCart(productId) {

    cart = cart.filter(function (item) {

        return item.id !== productId;

    });


    saveCart();

    renderCart();

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "flavorhubCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const cartContainer =
        document.getElementById("cart-items");

    const countElement =
        document.getElementById("cart-count");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const discountElement =
        document.getElementById("cart-discount");

    const totalElement =
        document.getElementById("cart-total");


    if (!cartContainer) return;


    /* EMPTY CART */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious dishes to continue.
                </p>

            </div>

        `;


        countElement.textContent = "0 items";

        subtotalElement.textContent = "₹0";

        discountElement.textContent = "-₹0";

        totalElement.textContent = "₹0";

        return;

    }


    /* CART ITEMS */

    cartContainer.innerHTML = cart.map(function (item) {

        return `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>


                <div class="cart-item-controls">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${item.id})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>


                <div class="cart-item-price">

                    ₹${item.price * item.quantity}

                </div>


                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `;

    }).join("");


    /* COUNT */

    const totalItems = cart.reduce(function (total, item) {

        return total + item.quantity;

    }, 0);


    countElement.textContent =
        totalItems + (totalItems === 1 ? " item" : " items");


    /* SUBTOTAL */

    const subtotal = cart.reduce(function (total, item) {

        return total + (item.price * item.quantity);

    }, 0);


    /* DISCOUNT */

    const discount = couponApplied ? 75 : 0;


    /* TOTAL */

    let total = subtotal + DELIVERY_CHARGE - discount;


    if (total < 0) {

        total = 0;

    }


    subtotalElement.textContent =
        "₹" + subtotal;


    discountElement.textContent =
        "-₹" + discount;


    totalElement.textContent =
        "₹" + total;

}


/* =========================================
   COUPON
========================================= */

function applyCoupon() {

    const couponInput =
        document.getElementById("coupon");

    const message =
        document.getElementById("coupon-message");


    const coupon =
        couponInput.value.trim().toUpperCase();


    if (coupon === "FLAVOR15") {

        if (cart.length === 0) {

            message.textContent =
                "Add items to cart first.";

            return;

        }


        couponApplied = true;


        message.textContent =
            "Coupon applied! ₹75 discount added.";


        message.style.color = "green";


        renderCart();


    } else {

        couponApplied = false;


        message.textContent =
            "Invalid coupon. Try FLAVOR15.";


        message.style.color = "red";


        renderCart();

    }

}


/* =========================================
   CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add at least one item."
        );

        return;

    }


    const modal =
        document.getElementById("checkout-modal");


    modal.classList.add("show");

}


function closeCheckout() {

    const modal =
        document.getElementById("checkout-modal");


    modal.classList.remove("show");

}


/* =========================================
   CHECKOUT FORM
========================================= */

function setupCheckoutForm() {

    const form =
        document.getElementById("checkout-form");


    if (!form) return;


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }


        const name =
            document.getElementById("customer-name").value.trim();


        const phone =
            document.getElementById("customer-phone").value.trim();


        const address =
            document.getElementById("customer-address").value.trim();


        const payment =
            document.getElementById("payment-method").value;


        if (!name || !phone || !address || !payment) {

            alert("Please fill all checkout details.");

            return;

        }


        /* Calculate totals */

        const subtotal = cart.reduce(function (total, item) {

            return total + (item.price * item.quantity);

        }, 0);


        const discount =
            couponApplied ? 75 : 0;


        const total =
            Math.max(
                0,
                subtotal + DELIVERY_CHARGE - discount
            );


        /* Generate Order ID */

        const orderId =
            "FH" +
            Date.now().toString().slice(-6);


        /* Order Object */

        const order = {

            orderId: orderId,

            customerName: name,

            phone: phone,

            address: address,

            paymentMethod: payment,

            items: cart,

            subtotal: subtotal,

            delivery: DELIVERY_CHARGE,

            discount: discount,

            total: total,

            status: "Order Confirmed",

            date: new Date().toLocaleString()

        };


        /* Save order */

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        /* Also save order history */

        const orders =
            JSON.parse(
                localStorage.getItem("flavorhubOrders")
            ) || [];


        orders.push(order);


        localStorage.setItem(
            "flavorhubOrders",
            JSON.stringify(orders)
        );


        /* Clear cart */

        cart = [];

        couponApplied = false;

        saveCart();


        /* Close checkout */

        closeCheckout();


        /* Reset form */

        form.reset();


        /* Update cart */

        renderCart();


        /* Show success */

        showOrderSuccess(order);


    });

}


/* =========================================
   ORDER SUCCESS
========================================= */

function showOrderSuccess(order) {

    const success =
        document.getElementById("order-success");


    const message =
        document.getElementById("order-success-message");


    message.innerHTML = `

        Thank you, <strong>${order.customerName}</strong>!<br><br>

        Your Order ID is:

        <strong>${order.orderId}</strong>

        <br><br>

        Total Amount:

        <strong>₹${order.total}</strong>

        <br><br>

        Payment:

        <strong>${order.paymentMethod}</strong>

    `;


    success.classList.add("show");

}


function closeSuccess() {

    const success =
        document.getElementById("order-success");


    success.classList.remove("show");

}


/* =========================================
   SMALL CART MESSAGE
========================================= */

function showCartMessage(message) {

    const existing =
        document.querySelector(".cart-toast");


    if (existing) {

        existing.remove();

    }


    const toast =
        document.createElement("div");


    toast.className = "cart-toast";


    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(function () {

        toast.remove();

    }, 2000);

}