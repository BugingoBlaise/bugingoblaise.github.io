function copyCode(button) {
  const pre = button.nextElementSibling;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
  });
}

function filterPosts(category) {
  // Get all posts and category buttons
  const posts = document.querySelectorAll("article");
  const buttons = document.querySelectorAll(".category-btn");

  // Update active button state
  buttons.forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.classList.add("active", "bg-gray-100");
    } else {
      btn.classList.remove("active", "bg-gray-100");
    }
  });

  // Show/hide posts based on category
  posts.forEach((post) => {
    if (category === "all" || post.dataset.category === category) {
      post.style.display = "block";
      post.classList.add("animate-fade-in");
    } else {
      post.style.display = "none";
    }
  });
}

// Add this to your existing Tailwind config or create a new one
tailwind.config = {
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
};

// Add search functionality
function initSearch() {
  const searchInput = document.querySelector('input[type="search"]');
  const posts = document.querySelectorAll(".post-card");

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      posts.forEach((post) => {
        const title = post.querySelector("h2").textContent.toLowerCase();
        const content = post.querySelector("p").textContent.toLowerCase();
        const category = post
          .querySelector(".category-tag")
          .textContent.toLowerCase();

        const isMatch =
          title.includes(searchTerm) ||
          content.includes(searchTerm) ||
          category.includes(searchTerm);

        // Add/remove opacity class for smooth transition
        if (isMatch) {
          post.style.display = "block";
          post.classList.add("animate-fade-in");
        } else {
          post.style.display = "none";
          post.classList.remove("animate-fade-in");
        }
      });

      // Show "no results" message if needed
      updateNoResultsMessage(searchTerm);
    }, 300)
  );
}

// Debounce helper function to improve performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Update UI when no results are found
function updateNoResultsMessage(searchTerm) {
  let noResultsDiv = document.getElementById("no-results");
  const posts = document.querySelectorAll('.post-card[style="display: block"]');
  const gridContainer = document.querySelector(".grid-cols-1.grid"); // Updated selector

  if (posts.length === 0 && searchTerm) {
    if (!noResultsDiv) {
      noResultsDiv = document.createElement("div");
      noResultsDiv.id = "no-results";
      noResultsDiv.className = "text-center py-8 text-gray-500 animate-fade-in";
      gridContainer.parentNode.insertBefore(
        noResultsDiv,
        gridContainer.nextSibling
      );
    }
    noResultsDiv.innerHTML = `
            <p class="text-lg">No results found for "${searchTerm}"</p>
            <p class="text-sm mt-2">Try adjusting your search terms or browse all categories</p>
        `;
    noResultsDiv.style.display = "block";
  } else if (noResultsDiv) {
    noResultsDiv.style.display = "none";
  }
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", initSearch);

// Add this to your existing script.js file
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          document.querySelectorAll(".toc-nav a").forEach((link) => {
            link.classList.remove("text-blue-600", "font-medium");
            link.classList.add("text-gray-600");
          });

          // Add active class to current section's link
          const id = entry.target.id;
          const correspondingLink = document.querySelector(
            `.toc-nav a[href="#${id}"]`
          );
          if (correspondingLink) {
            correspondingLink.classList.remove("text-gray-600");
            correspondingLink.classList.add("text-blue-600", "font-medium");
          }
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  // Observe all sections
  document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
  });
});
