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

function hideAllCategories() {
  document.querySelectorAll(".category").forEach(category => {
    category.style.display = "none";
  });
}

function showAllCategories() {
  document.querySelectorAll(".category").forEach(category => {
    category.style.display = "block";
  });
}

function performSearch() {
  if (!searchInput || !searchResults) {
    return;
  }

  const query = searchInput.value.trim().toLowerCase();

  searchResults.innerHTML = "";

  if (query === "") {
    showAllCategories();
    return;
  }

  hideAllCategories();

  let matchedRecommendation = null;

  // Check every recommendation category
  for (const recommendation of recommendations) {
    for (const keyword of recommendation.keywords) {
      if (
        query === keyword ||
        query.includes(keyword) ||
        keyword.includes(query)
      ) {
        matchedRecommendation = recommendation;
        break;
      }
    }

    if (matchedRecommendation) {
      break;
    }
  }

  if (!matchedRecommendation) {
    showAllCategories();

    searchResults.innerHTML = `
      <div class="result">
        <strong>No recommendation found.</strong><br>
        Try "beach", "temple", or "country".
      </div>
    `;

    return;
  }

  // Show ONLY the correct category
  const selectedCategory = document.getElementById(
    matchedRecommendation.category
  );

  if (selectedCategory) {
    selectedCategory.style.display = "block";

    searchResults.innerHTML = `
      <div class="result">
        <strong>${matchedRecommendation.title}</strong><br>
        ${matchedRecommendation.text}
      </div>
    `;

    // Move to the matching recommendations
    setTimeout(() => {
      selectedCategory.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }
}


// SEARCH BUTTON
if (searchButton) {
  searchButton.addEventListener("click", performSearch);
}


// ENTER KEY
if (searchInput) {
  searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}


// CLEAR BUTTON
if (clearButton) {
  clearButton.addEventListener("click", function() {
    searchInput.value = "";
    searchResults.innerHTML = "";
    showAllCategories();
  });
}


// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    if (formMessage) {
      formMessage.textContent =
        "Thanks for your message! Your message has been received.";
    }

    contactForm.reset();
  });
}