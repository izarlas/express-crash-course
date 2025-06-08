const output = document.querySelector("#output");
const button = document.querySelector("#get-cards-button");
const form = document.querySelector("#card-form");

async function fetchCards() {
  try {
    const res = await fetch("http://localhost:8000/api/cards");

    if (!res.ok) {
      throw new Error("Failed to fetch cards");
    }

    const cards = await res.json();
    if (output) {
      output.innerHTML = "";
    }

    cards.forEach((card) => {
      const cardElement = document.createElement("div");

      cardElement.textContent = card.title;
      output?.appendChild(cardElement);
    });
  } catch (error) {
    console.error("Error fetching cards: ", error);
  }
}

async function addCard(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8000/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to create card");
    }

    const newCard = await res.json();

    const cardElement = document.createElement("div");
    cardElement.textContent = newCard.title;
    output.appendChild(cardElement);
    fetchCards();
  } catch (error) {
    console.error("Error creating card: ", error);
  }
}

button?.addEventListener("click", fetchCards);
form?.addEventListener("submit", addCard);
