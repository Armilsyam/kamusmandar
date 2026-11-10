const searchInput = document.getElementById("searchInput");
const dictionaryList = document.getElementById("dictionaryList");
const resultCount = document.getElementById("resultCount");
const filterButtons = document.querySelectorAll(".filter-btn");

let words = [];
let activeFilter = "all";

async function loadData() {
  const response = await fetch("data/dictionary.json");
  words = await response.json();
  renderWords();
}

function renderWords() {
  const query = searchInput.value.toLowerCase();
  const filtered = words.filter((item) => {
    const matchesQuery =
      item.kata.toLowerCase().includes(query) ||
      item.mandar.toLowerCase().includes(query) ||
      item.arti.toLowerCase().includes(query);

    const matchesFilter =
      activeFilter === "all" || item.kategori === activeFilter;

    return matchesQuery && matchesFilter;
  });

  resultCount.textContent = `${filtered.length} hasil`;

  dictionaryList.innerHTML = filtered
    .map(
      (item) => `
        <li class="word-item">
          <strong>${item.kata}</strong>
          <div>Mandar: ${item.mandar}</div>
          <div>Arti: ${item.arti}</div>
          <small>Kategori: ${item.kategori}</small>
        </li>
      `
    )
    .join("");

  if (filtered.length === 0) {
    dictionaryList.innerHTML = "<li>Data tidak ditemukan.</li>";
  }
}

searchInput.addEventListener("input", renderWords);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderWords();
  });
});

loadData();
