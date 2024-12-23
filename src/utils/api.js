const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
}

function deleteItem(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, addItem, deleteItem, checkResponse };
