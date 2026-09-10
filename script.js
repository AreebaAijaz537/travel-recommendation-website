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

function showAllCategories() {
  document.querySelectorAll(".category").forEach(category => {
    category.style.display = "";
  });
}

function performSearch() {
  if (!searchInput || !searchResults) return;

  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!query) {
    showAllCategories();
    return;
  }

  // Find the category that best matches the search term.
  const match = recommendations.find(item =>
    item.keywords.some(keyword =>
      keyword === query || keyword.includes(query) || query.includes(keyword)
    )
  );

  // Hide every recommendation category first.
  document.querySelectorAll(".category").forEach(category => {
    category.style.display = "none";
  });

  if (!match) {
    showAllCategories();
    searchResults.innerHTML =
      '<div class="result"><strong>No recommendation found.</strong><br>Try "beach", "temple", or "country".</div>';
    return;
  }

  // Show the matching category, including its two recommendation cards/images.
  const category = document.getElementById(match.category);
  if (category) category.style.display = "";

  const result = document.createElement("div");
  result.className = "result";
  result.innerHTML = `<strong>${match.title}</strong><br>${match.text}`;
  searchResults.appendChild(result);

  if (category) {
    category.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (searchButton) searchButton.addEventListener("click", performSearch);

if (searchInput) {
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") performSearch();
  });
}

if (clearButton) {
  clearButton.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (searchResults) searchResults.innerHTML = "";
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
        "Thanks for your message! This demo form is ready for GitHub Pages.";
    }
    contactForm.reset();
  });
}
