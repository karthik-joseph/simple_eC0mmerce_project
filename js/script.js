document.addEventListener('DOMContentLoaded', function(e) {
    console.log('DOM fully loaded and parsed');
    import('./announcements.js')
    import('./categories.js')

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
    
    // Theme toggle functionality
    const themeToggle = document.querySelector("#theme-toggle");

        function applyTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
            const isDark = theme === "dark";

            themeToggle.setAttribute(
                "aria-label",
                 isDark ? "Switch to light theme" : "Switch to dark theme"
            );
            themeToggle.setAttribute(
                "title",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );
        }

        const savedTheme = localStorage.getItem("theme");
        applyTheme(savedTheme === "dark" ? "dark" : "light");

        themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });



    // Header menu toggle functionality
    const header = document.querySelector(".floating-header");
    const menuToggle = document.querySelector("#menu-toggle");
    const navigation = document.querySelector("#main-navigation");

    function setMenuOpen(isOpen) {
        header.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    }

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        setMenuOpen(!isOpen);
    });

    // Close when clicking outside the header.
    document.addEventListener("click", (event) => {
        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            !header.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    // Close with Escape.
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            menuToggle.getAttribute("aria-expanded") === "true"
        ) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    // Close after selecting a navigation link.
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuOpen(false);
        });
    });

    // Reset the mobile menu when returning to desktop layout.
    window.matchMedia("(min-width: 761px)").addEventListener(
        "change",
        (event) => {
            if (event.matches) {
            setMenuOpen(false);
            }
        }
    );



    // HERO SECTION 
    const hero = document.querySelector("#home");

    if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hero.classList.add("hero-scroll-ready");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    hero.classList.add("hero-in-view");
                } else {
                    hero.classList.remove("hero-in-view");
                }
            });
        },
        { threshold: 0.2 });
        observer.observe(hero);
    }


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

    const currencyFormatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });

    let cart = loadCart();

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


    function renderCart() {
        const totalQuantity = getCartCount();
        const subtotal = getCartSubtotal();
        // Cart counters
        cartCount.textContent = totalQuantity;
        cartCount.hidden = totalQuantity === 0;

        drawerCartCount.textContent =
            `(${totalQuantity})`;

        cartSubtotal.textContent =
            currencyFormatter.format(subtotal);

        cartEmpty.hidden = totalQuantity !== 0;
        cartFooter.hidden = totalQuantity === 0;
        cartItems.hidden = totalQuantity === 0;


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
    
    // JOURNAL SECTION
    const journalArticles = [
        {
            id: 1,
            category: "BOTANICAL BASICS",
            title: "Getting to know botanical powders",
            description: "Discover botanical powders and their many uses.",
            image: "assets/images/journal/botanical-powders.jpeg",
            readTime: "5 min read",
            content: `
                <p>
                    Botanical powders are made from dried plant materials
                    that have been finely ground into a convenient form.
                    They offer a simple way to explore the natural
                    characteristics of different plants.
                </p>

                <h3>What are botanical powders?</h3>

                <p>
                    These powders can come from leaves, flowers, roots,
                    seeds, and other parts of plants. Each ingredient
                    has its own texture, colour, aroma, and properties.
                </p>

                <h3>Exploring different ingredients</h3>

                <p>
                    From neem leaf powder to rose petal powder, botanical
                    ingredients offer a diverse range of possibilities
                    for different creative and personal-care applications.
                </p>

                <p>
                    Understanding an ingredient's source, specifications,
                    and intended use is an important part of making
                    informed choices.
                </p>
            `
        },
        {
            id: 2,
            category: "INGREDIENT SPOTLIGHT",
            title: "The beauty of plant-based oils",
            description: "Learn more about plant oils and their characteristics.",
            image: "assets/images/journal/plant-oils.jpeg",
            readTime: "4 min read",
            content: `
                <p>
                    Plant-based oils are obtained from various parts
                    of plants, including seeds, nuts, and fruits.
                    They are valued for their unique textures,
                    compositions, and versatility.
                </p>

                <h3>A world of different oils</h3>

                <p>
                    Jojoba oil and coconut oil are two examples of
                    plant-based oils. Although both come from plants,
                    their textures and characteristics are different.
                </p>

                <h3>Choosing an oil</h3>

                <p>
                    When exploring plant oils, consider the ingredient's
                    specifications, intended application, storage
                    requirements, and product information.
                </p>

                <p>
                    Learning about each oil helps you understand
                    what makes every ingredient distinct.
                </p>
            `
        },
        {
            id: 3,
            category: "NATURE & INSPIRATION",
            title: "A closer look at nature's ingredients",
            description: "Discover the variety and character of natural ingredients.",
            image: "assets/images/journal/natural-ingredients.jpeg",
            readTime: "6 min read",
            content: `
                <p>
                    Nature offers an incredible variety of ingredients.
                    From dried herbs and flowers to clays and botanical
                    extracts, every material has its own identity.
                </p>

                <h3>Understanding ingredient categories</h3>

                <p>
                    Botanical powders, dried botanicals, plant oils,
                    clays, and natural extracts each represent
                    different ingredient categories.
                </p>

                <h3>Making informed choices</h3>

                <p>
                    Before choosing an ingredient, take time to explore
                    its description, specifications, origin information
                    where available, and recommended handling.
                </p>

                <p>
                    A little ingredient knowledge can make exploring
                    natural materials a more thoughtful experience.
                </p>
            `
        }
    ];

    const journalGrid = document.getElementById("journal-grid");
    const articleModal = document.getElementById("article-modal");

    if (journalGrid && articleModal) {
        const modalImage = document.getElementById("article-modal-image");
        const modalCategory = document.getElementById("article-modal-category");
        const modalTitle = document.getElementById("article-modal-title");
        const modalMeta = document.getElementById("article-modal-meta");
        const modalText = document.getElementById("article-modal-text");

        let lastFocusedElement = null;

        // Render journal cards
        journalGrid.innerHTML = journalArticles.map(article => `
            <article class="journal-card">
                <button
                    class="journal-card-image"
                    type="button"
                    data-article-id="${article.id}"
                    aria-label="Read ${article.title}"
                >
                    <img
                        src="${article.image}"
                        alt="${article.title}"
                        loading="lazy"
                    >
                </button>

                <div class="journal-card-content">
                    <div class="journal-card-meta">
                        <span>${article.category}</span>
                        <span>${article.readTime}</span>
                    </div>

                    <h3>${article.title}</h3>

                    <p>${article.description}</p>

                    <button
                        class="journal-read-more"
                        type="button"
                        data-article-id="${article.id}"
                    >
                        Read article <span aria-hidden="true">↗</span>
                    </button>
                </div>
            </article>
        `).join("");

        // Open article popup
        function openArticle(articleId) {
            const article = journalArticles.find(
                item => item.id === Number(articleId)
            );

            if (!article) return;

            lastFocusedElement = document.activeElement;

            modalImage.src = article.image;
            modalImage.alt = article.title;
            modalCategory.textContent = article.category;
            modalTitle.textContent = article.title;
            modalMeta.textContent = article.readTime;
            modalText.innerHTML = article.content;

            articleModal.classList.add("active");
            articleModal.setAttribute("aria-hidden", "false");

            document.body.classList.add("modal-open");

            articleModal.querySelector(".article-modal-close").focus();
        }

        // Close article popup
        function closeArticle() {
            articleModal.classList.remove("active");
            articleModal.setAttribute("aria-hidden", "true");

            document.body.classList.remove("modal-open");

            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }

        // Handle article clicks
        journalGrid.addEventListener("click", event => {
            const button = event.target.closest("[data-article-id]");

            if (!button) return;

            openArticle(button.dataset.articleId);
        });

        // Close button and overlay
        articleModal.addEventListener("click", event => {
            if (event.target.closest("[data-close-article]")) {
                closeArticle();
            }
        });

        // Escape key
        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                articleModal.classList.contains("active")
            ) {
                closeArticle();
            }
        });
    }


    // Newsletter subscription form
    const newsletterForm = document.getElementById("newsletter-form");

    if (newsletterForm) {
        const emailInput = document.getElementById("newsletter-email");
        const newsletterMessage = document.getElementById("newsletter-message");

        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();

            newsletterMessage.textContent = "";
            newsletterMessage.className = "newsletter-message";

            if (!email) {
                newsletterMessage.textContent = "Please enter your email address.";
                newsletterMessage.classList.add("error");
                return;
            }

            if (!emailInput.checkValidity()) {
                newsletterMessage.textContent = "Please enter a valid email address.";
                newsletterMessage.classList.add("error");
                return;
            }

            newsletterMessage.textContent =
                "Thank you for your interest! Newsletter subscriptions are not connected yet.";
            newsletterMessage.classList.add("success");
            newsletterForm.reset();
        });
    }
        
    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});