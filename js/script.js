const listeProduits = document.querySelector(".list-products");
const totalElement = document.querySelector(".total");

// 4. Calculer et afficher le prix total
function mettreAJourTotal() {
  const cartes = document.querySelectorAll(".list-products .card");
  let total = 0;

  cartes.forEach((carte) => {
    const prix = parseFloat(carte.querySelector(".unit-price").textContent);
    const quantite = Number(carte.querySelector(".quantity").textContent);
    total += prix * quantite;
  });

  totalElement.textContent = total + " $";
}

// Un seul écouteur pour toute la liste (délégation d'événements)
listeProduits.addEventListener("click", (event) => {
  const icone = event.target;
  const carte = icone.closest(".card");
  if (!carte) return;

  const quantiteElement = carte.querySelector(".quantity");
  const quantite = Number(quantiteElement.textContent);

  // 1. Bouton +
  if (icone.classList.contains("fa-plus-circle")) {
    quantiteElement.textContent = quantite + 1;
  }

  // 1. Bouton - (jamais en dessous de 0)
  if (icone.classList.contains("fa-minus-circle") && quantite > 0) {
    quantiteElement.textContent = quantite - 1;
  }

  // 2. Supprimer : on retire tout le bloc produit (le .card-body parent)
  if (icone.classList.contains("fa-trash-alt")) {
    carte.parentElement.remove();
  }

  // 3. Cœur : change de couleur à chaque clic (rouge <-> couleur d'origine)
  if (icone.classList.contains("fa-heart")) {
    icone.style.color = icone.style.color === "red" ? "" : "red";
  }

  mettreAJourTotal();
});

// Affichage initial
mettreAJourTotal();
