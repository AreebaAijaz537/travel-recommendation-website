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
    text: "Explore Switzerland or France for different travel experiences."
  }
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const searchResults = document.getElementById("searchResults");

const categories = [
  document.getElementById("beachCategory"),
  document.getElementById("templeCategory"),
  document.getElementById("countryCategory")
];

function showAllCategories() {
  categories.forEach(category => {
    if (category) {
      category.hidden = false;
      category.style.display = "block";
    }
  });
}

function hideAllCategories() {
  categories.forEach(category => {
    if (category) {
      category.hidden = true;
      category.style.display = "none";
    }
  });
}

function performSearch() {
  if (!searchInput || !searchResults) return;

  const query = searchInput.value.trim().toLowerCase();

  searchResults.innerHTML = "";

  if (query === "") {
    showAllCategories();
    return;
  }

  const match = recommendations.find(item =>
    item.keywords.some(keyword =>
      query === keyword ||
      query.includes(keyword) ||
      keyword.includes(query)
    )
  );

  hideAllCategories();

  if (!match) {
    searchResults.innerHTML = `
      <div class="result">
        <strong>No recommendation found.</strong><br>
        Try "beach", "temple", or "country".
      </div>
    `;
    return;
  }

  const category = document.getElementById(match.category);

  if (category) {
    category.hidden = false;
    category.style.display = "block";
  }

  searchResults.innerHTML = `
    <div class="result">
      <strong>${match.title}</strong><br>
      ${match.text}
    </div>
  `;

  // Move the matching recommendations into view
  if (category) {
    setTimeout(() => {
      category.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }
}

if (searchButton) {
  searchButton.addEventListener("click", performSearch);
}

if (searchInput) {
  searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}

if (clearButton) {
  clearButton.addEventListener("click", function() {
    searchInput.value = "";
    searchResults.innerHTML = "";
    showAllCategories();
  });
}


// Contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    if (formMessage) {
      formMessage.textContent =
        "Thanks for your message! This demo form is ready for GitHub Pages.";
    }

    contactForm.reset();
  });
}