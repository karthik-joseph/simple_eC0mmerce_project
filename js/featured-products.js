
document.addEventListener("DOMContentLoaded", () => {
    const featuredGrid = document.querySelector("#featured-product-grid");

    // Stop if this section does not exist on the current page.
    if (!featuredGrid) return;

    // Product data
    const products = [
        {
            id: 1,
            name: "Neem Leaf Powder",
            category: "botanical-powders",
            price: 249,
            description: "Finely milled neem leaves.",
            image: "assets/images/products/neem-powder.jpeg",
            type: "Botanical Powder",
            featured: true
        },
        {
            id: 2,
            name: "Rose Petal Powder",
            category: "botanical-powders",
            price: 299,
            description: "Delicately prepared rose petals.",
            image: "assets/images/products/rose-petal.jpeg",
            type: "Botanical Powder",
            featured: true
        },
        {
            id: 3,
            name: "Golden Jojoba Oil",
            category: "plant-oils",
            price: 549,
            description: "A versatile botanical oil.",
            image: "assets/images/products/golden-jojoba-oil.jpeg",
            type: "Plant Oil",
            featured: true
        },
        {
            id: 4,
            name: "Virgin Coconut Oil",
            category: "plant-oils",
            price: 349,
            description: "A plant-derived everyday essential.",
            image: "assets/images/products/virgin-coconut-oil.jpeg",
            type: "Plant Oil",
            featured: true
        },
        {
            id: 5,
            name: "Dried Lavender",
            category: "dried-botanicals",
            price: 199,
            description: "Fragrant dried lavender flowers.",
            image: "assets/images/products/dried-lavender.jpeg",
            type: "Dried Botanical",
            featured: false
        },
        {
            id: 6,
            name: "Bentonite Clay",
            category: "clays-minerals",
            price: 279,
            description: "A versatile earth-derived clay.",
            image: "assets/images/products/bentonite-clay.jpeg",
            type: "Natural Clay",
            featured: false
        },
        {
            id: 7,
            name: "Aloe Vera Extract",
            category: "natural-extracts",
            price: 399,
            description: "A botanical extract for formulations.",
            image: "assets/images/products/aloe-vera-extract.jpeg",
            type: "Natural Extract",
            featured: false
        },
        {
            id: 8,
            name: "Dried Rosemary",
            category: "herbal-ingredients",
            price: 179,
            description: "A classic aromatic herb.",
            image: "assets/images/products/dried-rosemary.jpeg",
            type: "Herbal Ingredient",
            featured: false
        }
    ];

    // Currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });

    // Category names
    const categoryNames = {
        "botanical-powders": "Botanical Powders",
        "plant-oils": "Plant Oils",
        "dried-botanicals": "Dried Botanicals",
        "clays-minerals": "Clays & Minerals",
        "natural-extracts": "Natural Extracts",
        "herbal-ingredients": "Herbal Ingredients"
    };

    // Get featured products only
    const featuredProducts = products.filter(product => product.featured);

    // Render product cards
    function renderFeaturedProducts() {
        if (featuredProducts.length === 0) {
            featuredGrid.innerHTML = `
                <p class="featured-empty">
                    No featured ingredients are available right now.
                </p>
            `;
            return;
        }

        featuredGrid.innerHTML = featuredProducts.map(product => `
            <article class="featured-product-card">
                <a
                    href="templates/shop.html?category=${encodeURIComponent(product.category)}"
                    class="featured-product-image"
                    aria-label="Explore ${product.name}"
                >
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >
                    <span class="featured-product-tag">
                        ${categoryNames[product.category] || product.type}
                    </span>
                </a>
                <div class="featured-product-info">
                    <p class="featured-product-category">
                        ${product.type}
                    </p>
                    <h3>
                        <a href="templates/shop.html?category=${encodeURIComponent(product.category)}">
                            ${product.name}
                        </a>
                    </h3>
                    <p class="featured-product-description">
                        ${product.description}
                    </p>
                    <div class="featured-product-bottom">
                        <span class="featured-product-price">
                            ${currencyFormatter.format(product.price)}
                        </span>
                        <a
                            href="templates/shop.html?category=${encodeURIComponent(product.category)}"
                            class="featured-product-link"
                            aria-label="Explore ${product.name}"
                        >
                            Explore
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </article>
        `).join("");
    }

    // Initialize
    renderFeaturedProducts();
});
