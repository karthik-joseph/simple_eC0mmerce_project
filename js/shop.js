
document.addEventListener("DOMContentLoaded", () => {

    /* PRODUCT DATA */

    const products = [
        {
            id: 1,
            name: "Neem Leaf Powder",
            category: "botanical-powders",
            price: 249,
            description: "Finely milled neem leaves.",
            fullDescription:
                "Carefully processed neem leaves transformed into a fine botanical powder. A versatile ingredient for natural formulations and creative botanical projects.",
            image: "../assets/images/products/neem-powder.jpeg",
            type: "Botanical Powder",
            origin: "India",
            featured: true
        },
        {
            id: 2,
            name: "Rose Petal Powder",
            category: "botanical-powders",
            price: 299,
            description: "Delicately prepared rose petals.",
            fullDescription:
                "Finely prepared rose petal powder, suitable for a variety of botanical formulations.",
            image: "../assets/images/products/rose-petal.jpeg",
            type: "Botanical Powder",
            origin: "India",
            featured: true
        },
        {
            id: 3,
            name: "Golden Jojoba Oil",
            category: "plant-oils",
            price: 549,
            description: "A versatile botanical oil.",
            fullDescription:
                "Golden jojoba oil, a versatile plant-derived ingredient for natural formulations.",
            image: "../assets/images/products/golden-jojoba-oil.jpeg",
            type: "Plant Oil",
            origin: "India",
            featured: true
        },
        {
            id: 4,
            name: "Virgin Coconut Oil",
            category: "plant-oils",
            price: 349,
            description: "A plant-derived everyday essential.",
            fullDescription:
                "Virgin coconut oil, a versatile botanical ingredient for everyday natural formulations.",
            image: "../assets/images/products/virgin-coconut-oil.jpeg",
            type: "Plant Oil",
            origin: "India",
            featured: true
        },
        {
            id: 5,
            name: "Dried Lavender",
            category: "dried-botanicals",
            price: 199,
            description: "Fragrant dried lavender flowers.",
            fullDescription:
                "Carefully dried lavender flowers, ideal for botanical projects and aromatic creations.",
            image: "../assets/images/products/dried-lavender.jpeg",
            type: "Dried Botanical",
            origin: "India",
            featured: false
        },
        {
            id: 6,
            name: "Bentonite Clay",
            category: "clays-minerals",
            price: 279,
            description: "A versatile earth-derived clay.",
            fullDescription:
                "A naturally occurring mineral clay suitable for a variety of formulation applications.",
            image: "../assets/images/products/bentonite-clay.jpeg",
            type: "Natural Clay",
            origin: "India",
            featured: false
        },
        {
            id: 7,
            name: "Aloe Vera Extract",
            category: "natural-extracts",
            price: 399,
            description: "A botanical extract for formulations.",
            fullDescription:
                "A botanical aloe vera extract for natural ingredient formulations.",
            image: "../assets/images/products/aloe-vera-extract.jpeg",
            type: "Natural Extract",
            origin: "India",
            featured: false
        },
        {
            id: 8,
            name: "Dried Rosemary",
            category: "herbal-ingredients",
            price: 179,
            description: "A classic aromatic herb.",
            fullDescription:
                "Dried rosemary, a versatile aromatic herb for botanical projects.",
            image: "../assets/images/products/dried-rosemary.jpeg",
            type: "Herbal Ingredient",
            origin: "India",
            featured: false
        }
    ];


    /* 2. CATEGORY DATA  */

    const categoryNames = {
        all: "All ingredients",
        "plant-oils": "Plant Oils",
        "botanical-powders": "Botanical Powders",
        "dried-botanicals": "Dried Botanicals",
        "clays-minerals": "Clays & Minerals",
        "natural-extracts": "Natural Extracts",
        "herbal-ingredients": "Herbal Ingredients"
    };

    const validCategories = Object.keys(categoryNames);


    /* DOM ELEMENTS  */

    const productGrid = document.querySelector("#product-grid");
    const productSearch = document.querySelector("#product-search");
    const productSort = document.querySelector("#product-sort");
    const minPriceInput = document.querySelector("#min-price");
    const maxPriceInput = document.querySelector("#max-price");
    const productCount = document.querySelector("#product-count");
    const resultsTitle = document.querySelector("#results-title");
    const emptyState = document.querySelector("#shop-empty");
    const resetButton = document.querySelector("#reset-filters");
    const emptyResetButton = document.querySelector("#empty-reset");
    const filterSidebar = document.querySelector("#shop-filters");
    const mobileFilterToggle = document.querySelector("#mobile-filter-toggle");

    /* CURRENCY FORMATTER */
    const currencyFormatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });

    /* SAFE LOCAL STORAGE */
    function loadCart() {
        try {
            const savedCart = JSON.parse(
                localStorage.getItem("earthkind-cart") || "[]"
            );
            if (!Array.isArray(savedCart)) {
                return [];
            }

            return savedCart
                .filter(item => products.some(product => product.id === item.id))
                .map(item => {
                    const product = products.find(
                        product => product.id === item.id
                    );

                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: Math.min(
                            99,
                            Math.max(1, Math.floor(Number(item.quantity) || 1))
                        )
                    };
                });
        } catch (error) {
            console.error("Unable to load saved cart:", error);
            return [];
        }
    }

    let cart = loadCart();

    let activeProduct = null;
    let lastFocusedElement = null;

    /* PRODUCT FILTERING */
    function getCategoryFromURL() {
        const params = new URLSearchParams(
            window.location.search
        );
        const category = params.get("category");
        return validCategories.includes(category)
            ? category
            : "all";
    }

    function setCategory(category, updateURL = true) {
        const validCategory = validCategories.includes(category)
            ? category
            : "all";

        const radio = document.querySelector(
            `input[name="category"][value="${validCategory}"]`
        );

        if (radio) {
            radio.checked = true;
        }

        resultsTitle.textContent = categoryNames[validCategory];

        if (updateURL) {
            const url = new URL(window.location.href);

            if (validCategory === "all") {
                url.searchParams.delete("category");
            } else {
                url.searchParams.set("category", validCategory);
            }
            window.history.replaceState({}, "", url);
        }
        renderProducts();
    }


    function getFilteredProducts() {
        const selectedCategory = document.querySelector(
            'input[name="category"]:checked'
        )?.value || "all";

        const searchTerm = productSearch.value
            .trim()
            .toLowerCase();

        const minPrice = minPriceInput.value === ""
            ? 0
            : Number(minPriceInput.value);

        const maxPrice = maxPriceInput.value === ""
            ? Infinity
            : Number(maxPriceInput.value);

        let filtered = products.filter(product => {
            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const matchesSearch = [
                product.name,
                product.description,
                categoryNames[product.category]
            ].some(value =>
                value.toLowerCase().includes(searchTerm)
            );

            const matchesMin = product.price >= minPrice;
            const matchesMax = product.price <= maxPrice;

            return (
                matchesCategory &&
                matchesSearch &&
                matchesMin &&
                matchesMax
            );
        });

        switch (productSort.value) {
            case "name-asc":
                filtered.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            case "price-asc":
                filtered.sort((a, b) =>
                    a.price - b.price
                );
                break;

            case "price-desc":
                filtered.sort((a, b) =>
                    b.price - a.price
                );
                break;

            default:
                filtered.sort((a, b) =>
                    Number(b.featured) - Number(a.featured)
                );
        }
        return filtered;
    }

    /* RENDER PRODUCTS */
    function renderProducts() {
        const filtered = getFilteredProducts();
        productGrid.innerHTML = filtered.map(product => `
            <article class="product-card">
                <button
                    type="button"
                    class="product-image-link"
                    data-product-id="${product.id}"
                    aria-label="View ${product.name} details"
                >
                    <div class="product-image-wrap">
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                            decoding="async"
                            width="500"
                            height="560"
                        >

                        <span class="product-quick-view">
                            Quick view ↗
                        </span>
                    </div>
                </button>

                <div class="product-card-info">
                    <p class="product-category">
                        ${categoryNames[product.category]}
                    </p>
                    <h3>
                        <button
                            type="button"
                            class="product-name-button"
                            data-product-id="${product.id}"
                        >
                            ${product.name}
                        </button>
                    </h3>
                    <p class="product-description">
                        ${product.description}
                    </p>
                    <div class="product-card-bottom">
                        <span class="product-price">
                            ${currencyFormatter.format(product.price)}
                        </span>
                        <button
                            type="button"
                            class="product-view-link"
                            data-product-id="${product.id}"
                            aria-label="Quick view ${product.name}"
                        >
                            ↗
                        </button>
                    </div>
                    <button
                        type="button"
                        class="button button-primary product-add-cart"
                        data-cart-product-id="${product.id}"
                    >
                        Add to cart
                    </button>
                </div>
            </article>
        `).join("");

        productCount.textContent =
            `${filtered.length} ${
                filtered.length === 1
                    ? "ingredient"
                    : "ingredients"
            }`;

        emptyState.hidden = filtered.length !== 0;
        productGrid.hidden = filtered.length === 0;
    }

    /* CLEAR FILTERS */
    function clearFilters() {
        productSearch.value = "";
        minPriceInput.value = "";
        maxPriceInput.value = "";
        productSort.value = "featured";
        setCategory("all");
    }


    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener("change", () => {
            setCategory(radio.value);
        });
    });


    productSearch.addEventListener("input", renderProducts);
    productSort.addEventListener("change", renderProducts);
    minPriceInput.addEventListener("input", renderProducts);
    maxPriceInput.addEventListener("input", renderProducts);
    resetButton.addEventListener("click", clearFilters);
    emptyResetButton.addEventListener("click", clearFilters);

    /* MOBILE FILTERS */
    mobileFilterToggle.addEventListener("click", () => {
        const isOpen =
            mobileFilterToggle.getAttribute("aria-expanded") === "true";

        mobileFilterToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        filterSidebar.classList.toggle("filters-open", !isOpen);
    });


    document.addEventListener("click", event => {
        if (
            !filterSidebar.contains(event.target) &&
            !mobileFilterToggle.contains(event.target)
        ) {
            filterSidebar.classList.remove("filters-open");
            mobileFilterToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });

    /*  PRODUCT QUICK VIEW MODAL */
    const productModal = document.querySelector("#product-modal");
    const modalClose = document.querySelector("#modal-close");
    const modalImage = document.querySelector("#modal-product-image");
    const modalName = document.querySelector("#modal-product-name");
    const modalCategory = document.querySelector("#modal-product-category");
    const modalPrice = document.querySelector("#modal-product-price");
    const modalDescription = document.querySelector("#modal-product-description");
    const modalDetailCategory = document.querySelector("#modal-detail-category");
    const modalDetailType = document.querySelector("#modal-detail-type");
    const modalDetailOrigin = document.querySelector("#modal-detail-origin");
    const quantityInput = document.querySelector("#modal-quantity");
    const quantityDecrease = document.querySelector("#quantity-decrease");
    const quantityIncrease = document.querySelector("#quantity-increase");
    const addCartButton = document.querySelector("#modal-add-cart");
    const addCartPrice = document.querySelector("#modal-add-price");
    const cartFeedback = document.querySelector("#cart-feedback");

    function getModalQuantity() {
        const quantity = Math.floor(
            Number(quantityInput.value) || 1
        );

        return Math.min(99, Math.max(1, quantity));
    }


    function updateModalPrice() {
        if (!activeProduct) return;

        const quantity = getModalQuantity();
        quantityInput.value = quantity;
        addCartPrice.textContent = currencyFormatter.format(
            activeProduct.price * quantity
        );
    }

    function openProductModal(productId) {
        const product = products.find(
            item => item.id === Number(productId)
        );

        if (!product) return;

        activeProduct = product;

        lastFocusedElement = document.activeElement;
        quantityInput.value = 1;
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalName.textContent = product.name;

        modalCategory.textContent =
            categoryNames[product.category].toUpperCase();

        modalPrice.textContent =
            currencyFormatter.format(product.price);

        modalDescription.textContent =
            product.fullDescription || product.description;

        modalDetailCategory.textContent =
            categoryNames[product.category];

        modalDetailType.textContent =
            product.type || "Natural Ingredient";

        modalDetailOrigin.textContent =
            product.origin || "Not specified";

        cartFeedback.textContent = "";

        addCartButton.querySelector(
            "span:first-child"
        ).textContent = "Add to cart";

        updateModalPrice();
        if (!productModal.open) {
            productModal.showModal();
        }
        document.body.classList.add("modal-open");
        modalClose.focus();
    }


    function closeProductModal() {
        if (productModal.open) {
            productModal.close();
        }
    }

    productGrid.addEventListener("click", event => {
        const addButton = event.target.closest(
            "[data-cart-product-id]"
        );

        if (addButton) {
            const product = products.find(
                item => item.id === Number(
                    addButton.dataset.cartProductId
                )
            );
            if (product) {
                addToCart(product, 1);
            }
            return;
        }
        // Product quick view buttons
        const productButton = event.target.closest(
            "[data-product-id]"
        );

        if (!productButton) return;
        openProductModal(productButton.dataset.productId);
    });


    modalClose.addEventListener("click", closeProductModal);

    // Clicking outside modal content
    productModal.addEventListener("click", event => {
        if (event.target === productModal) {
            closeProductModal();
        }
    });


    // Restore focus and remove scroll lock
    productModal.addEventListener("close", () => {
        document.body.classList.remove("modal-open");
        if (lastFocusedElement?.isConnected) {
            lastFocusedElement.focus();
        }
    });


    /* MODAL QUANTITY CONTROLS */
    quantityDecrease.addEventListener("click", () => {
        quantityInput.value = Math.max(
            1,
            getModalQuantity() - 1
        );
        updateModalPrice();
    });


    quantityIncrease.addEventListener("click", () => {
        quantityInput.value = Math.min(
            99,
            getModalQuantity() + 1
        );
        updateModalPrice();
    });

    quantityInput.addEventListener("input", () => {
        updateModalPrice();
    });

    quantityInput.addEventListener("blur", () => {
        quantityInput.value = getModalQuantity();
        updateModalPrice();
    });

    /* SHOPPING CART ELEMENTS */
    const cartToggle = document.querySelector("#cart-toggle");
    const cartDrawer = document.querySelector("#cart-drawer");
    const cartOverlay = document.querySelector("#cart-overlay");
    const cartClose = document.querySelector("#cart-close");
    const cartItems = document.querySelector("#cart-items");
    const cartEmpty = document.querySelector("#cart-empty");
    const cartFooter = document.querySelector("#cart-footer");
    const cartCount = document.querySelector("#cart-count");
    const drawerCartCount = document.querySelector("#drawer-cart-count");
    const cartSubtotal = document.querySelector("#cart-subtotal");
    const continueShopping = document.querySelector("#continue-shopping");
    const cartContinue = document.querySelector("#cart-continue");
    const checkoutButton = document.querySelector(".cart-checkout");

    /* CART CALCULATIONS */
    function getCartCount() {
        return cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    function getCartSubtotal() {
        return cart.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );
    }

    /* SAVE CART */
    function saveCart() {
        try {
            localStorage.setItem(
                "earthkind-cart",
                JSON.stringify(cart)
            );
        } catch (error) {
            console.error("Unable to save cart:", error);
        }
        renderCart();
    }

    /* ADD PRODUCT TO CART */
    function addToCart(product, quantity = 1) {
        if (!product) return;
        const existingProduct = cart.find(
            item => item.id === product.id
        );
        const safeQuantity = Math.min(
            99,
            Math.max(1, Math.floor(Number(quantity) || 1))
        );
        if (existingProduct) {
            existingProduct.quantity = Math.min(
                99,
                existingProduct.quantity + safeQuantity
            );
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: safeQuantity
            });
        }
        saveCart();
        // Popup feedback
        if (productModal.open && activeProduct?.id === product.id) {
            cartFeedback.textContent =
                `${product.name} added to your cart.`;

            addCartButton.querySelector(
                "span:first-child"
            ).textContent = "Added to cart ✓";
        }
        // Open cart drawer
        setTimeout(() => {
            closeProductModal();
            openCart();
            if (productModal.isConnected) {
                addCartButton.querySelector(
                    "span:first-child"
                ).textContent = "Add to cart";
            }
        }, 350);
    }


    // Connect popup add-to-cart button
    addCartButton.addEventListener("click", () => {
        if (!activeProduct) return;

        addToCart(
            activeProduct,
            getModalQuantity()
        );
    });


    /* RENDER CART */
    function renderCart() {
        const totalQuantity = getCartCount();
        const subtotal = getCartSubtotal();
        // Cart counters
        cartCount.textContent = totalQuantity;
        cartCount.hidden = totalQuantity === 0;
        drawerCartCount.textContent =
            `(${totalQuantity})`;

        // Subtotal
        cartSubtotal.textContent =
            currencyFormatter.format(subtotal);

        // Empty cart and footer
        cartEmpty.hidden = totalQuantity !== 0;
        cartFooter.hidden = totalQuantity === 0;
        cartItems.hidden = totalQuantity === 0;
        // Render cart products
        cartItems.innerHTML = cart.map(item => `
            <article class="cart-item">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>
                        ${currencyFormatter.format(item.price)}
                    </p>
                    <div class="cart-item-controls">
                        <button
                            type="button"
                            data-cart-action="decrease"
                            data-id="${item.id}"
                            aria-label="Decrease ${item.name} quantity"
                        >
                            −
                        </button>
                        <span>${item.quantity}</span>
                        <button
                            type="button"
                            data-cart-action="increase"
                            data-id="${item.id}"
                            aria-label="Increase ${item.name} quantity"
                        >
                            +
                        </button>
                        <button
                            type="button"
                            class="cart-remove"
                            data-cart-action="remove"
                            data-id="${item.id}"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <strong>
                    ${currencyFormatter.format(
                        item.price * item.quantity
                    )}
                </strong>
            </article>
        `).join("");
    }

    /* CART QUANTITY AND REMOVE ACTIONS */
    cartItems.addEventListener("click", event => {
        const button = event.target.closest(
            "[data-cart-action]"
        );
        if (!button) return;
        const id = Number(button.dataset.id);
        const action = button.dataset.cartAction;
        const item = cart.find(
            product => product.id === id
        );
        if (!item) return;
        if (action === "increase") {
            item.quantity = Math.min(
                99,
                item.quantity + 1
            );
        }
        if (action === "decrease") {
            item.quantity--;
            if (item.quantity <= 0) {
                cart = cart.filter(
                    product => product.id !== id
                );
            }
        }

        if (action === "remove") {
            cart = cart.filter(
                product => product.id !== id
            );
        }

        saveCart();
    }); 

    /* OPEN CART DRAWER */
    function openCart() {
        cartDrawer.classList.add("cart-open");
        cartOverlay.classList.add(
            "cart-overlay-active"
        );
        cartDrawer.setAttribute(
            "aria-hidden",
            "false"
        );
        document.body.classList.add(
            "cart-drawer-open"
        );
        cartClose.focus();
    }


    /* CLOSE CART DRAWER */
    function closeCart() {
        cartDrawer.classList.remove("cart-open");
        cartOverlay.classList.remove(
            "cart-overlay-active"
        );
        cartDrawer.setAttribute(
            "aria-hidden",
            "true"
        );
        document.body.classList.remove(
            "cart-drawer-open"
        );
        cartToggle.focus();
    }


    cartToggle.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    continueShopping.addEventListener("click", closeCart);
    cartContinue.addEventListener("click", closeCart);

    /* KEYBOARD SUPPORT */
    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            cartDrawer.classList.contains("cart-open")
        ) {
            closeCart();
        }
    });


    /* CHECKOUT PLACEHOLDER */
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) return;
        alert(
            "Your cart is ready! Checkout functionality will be connected soon."
        );
    });

    /* INITIALIZE SHOP */
    renderCart();
    setCategory(getCategoryFromURL(), false);
});
