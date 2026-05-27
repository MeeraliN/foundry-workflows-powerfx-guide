const searchInput = document.getElementById("search-input");
const cards = Array.from(document.querySelectorAll(".answer-card"));
const searchStatus = document.getElementById("search-status");

function normalize(value) {
  return value.toLowerCase().trim();
}

function updateSearch() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const haystack = normalize(card.innerText + " " + (card.dataset.keywords || ""));
    const matches = !query || haystack.includes(query);
    card.classList.toggle("hidden", !matches);
    if (matches) {
      visibleCount += 1;
    }
  });

  if (!query) {
    searchStatus.textContent = `Showing ${visibleCount} answer cards.`;
    return;
  }

  if (visibleCount === 0) {
    searchStatus.textContent = `No exact answer found for "${searchInput.value}". Use the Ask a question button below.`;
    return;
  }

  searchStatus.textContent = `Found ${visibleCount} answer ${visibleCount === 1 ? "card" : "cards"} for "${searchInput.value}".`;
}

if (searchInput) {
  searchInput.addEventListener("input", updateSearch);
  updateSearch();
}
