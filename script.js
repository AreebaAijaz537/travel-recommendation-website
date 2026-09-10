const recommendations = [
  {
    keywords: ["beach", "beaches", "bora", "maldives"],
    category: "beachCategory",
    title: "Beach recommendation",
    text: "Try Bora Bora or the Maldives for a relaxing beach trip."
  },
  {
    keywords: ["temple", "temples", "kyoto", "bali", "japan", "indonesia"],
    category: "templeCategory",
    title: "Temple recommendation",
    text: "Explore Kyoto in Japan or Bali in Indonesia for temples and cultural experiences."
  },
  {
    keywords: ["country", "countries", "switzerland", "swiss", "france", "paris"],
    category: "countryCategory",
    title: "Country recommendation",
    text: "Explore Switzerland or France for different travel experiences, from scenic mountains to historic cities."
  }
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const searchResults = document.getElementById("searchResults");
const categories = Array.from(document.querySelectorAll(".category"));

function showAllCategories() {
  categories.forEach(category => {
    category.style.display = "block";
  });
}

function hideAllCategories() {
  categories.forEach(category => {
    category.style.display = "none";
  });
}

function findRecommendation(query) {
  return recommendations.find(item =>
    item.keywords.some(keyword =>
      keyword === query || keyword.includes(query) || query.includes(keyword)
    )
  );
}

function performSearch() {
  if (!searchInput || !searchResults) return;

  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!query) {
    showAllCategories();
    return;
  }

  const match = findRecommendation(query);

  if (!match) {
    showAllCategories();
    searchResults.innerHTML = `
      <div class="result">
        <strong>No recommendation found.</strong><br>
        Try "beach", "temple", or "country".
      </div>
    `;
    return;
  }

  // Hide every category first, then show only the matching category.
  hideAllCategories();

  const selectedCategory = document.getElementById(match.category);

  if (!selectedCategory) return;

  selectedCategory.style.display = "block";

  searchResults.innerHTML = `
    <div class="result">
      <strong>${match.title}</strong><br>
      ${match.text}
    </div>
  `;

  // Scroll to the matching two-card recommendation section.
  setTimeout(() => {
    selectedCategory.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}

if (searchButton) {
  searchButton.addEventListener("click", performSearch);
}

if (searchInput) {
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}

if (clearButton) {
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchResults.innerHTML = "";
    showAllCategories();
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    if (formMessage) {
      formMessage.textContent =
        "Thanks for your message! Your message has been received.";
    }

    contactForm.reset();
  });
}
