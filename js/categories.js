
const categories = [
  {
    id: "plant-oils",
    name: "Plant Oils",
    description: "Nourishing oils from nature",
    image: "assets/images/categories/plant-oils.jpeg",
    imageAlt: "Plant oils and botanical leaves",
    featured: true
  },
  {
    id: "botanical-powders",
    name: "Botanical Powders",
    description: "Nature, finely ground",
    image: "assets/images/categories/botanical_powder.jpeg",
    imageAlt: "Natural botanical powders in ceramic bowls",
    featured: true
  },
  {
    id: "dried-botanicals",
    name: "Dried Botanicals",
    description: "Leaves, flowers and herbs",
    image: "assets/images/categories/dried_botanicals.jpeg",
    imageAlt: "Dried herbs and botanical flowers",
    featured: true
  },
  {
    id: "clays-minerals",
    name: "Clays & Minerals",
    description: "Earth-derived essentials",
    image: "assets/images/categories/clays-minerals.jpeg",
    imageAlt: "Natural mineral and clay powders",
    featured: true
  },
  {
    id: "natural-extracts",
    name: "Natural Extracts",
    description: "Concentrated botanical ingredients",
    image: "assets/images/categories/natural-exracts.avif",
    imageAlt: "Botanical extracts in glass containers",
    featured: false
  },
  {
    id: "herbal-ingredients",
    name: "Herbal Ingredients",
    description: "Traditional botanicals, thoughtfully selected",
    image: "assets/images/categories/herbal-ingredients.png",
    imageAlt: "A selection of dried herbal ingredients",
    featured: false
  }
];

const categoryGrid = document.querySelector("#category-grid");

function renderCategories() {
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories.map((category, index) => `
    <a
      class="category-card"
      href="templates/shop.html?category=${encodeURIComponent(category.id)}"
      style="--card-index: ${index}"
      aria-label="Explore ${category.name}"
    >
      <div class="category-card-image">
        <img
          src="${category.image}"
          alt="${category.imageAlt}"
          loading="lazy"
          decoding="async"
          width="640"
          height="480"
        />

        <span class="category-card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      <div class="category-card-content">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
      </div>
    </a>
  `).join("");
}

renderCategories();
