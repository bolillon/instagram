// --- Selectores principales ---
const popupEdit = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile_edit_button");
const popupEditClose = popupEdit.querySelector(".popup_close");

const cardContainer = document.querySelector(".card_container");
const cardTemplate = document.querySelector("#card-template");

const profileUsername = document.querySelector(".profile_username");
const profileBio = document.querySelector(".profile_bio");
const profileStatsPosts = document.querySelector(".profile_stats_posts");

const editForm = document.querySelector("#edit-profile-form");
const editUsernameInput = document.querySelector("#edit-username");
const editBioInput = document.querySelector("#edit-bio");

const popupSettings = document.querySelector("#popup-settings");
const settingsOpenButton = document.querySelector(".profile_settings_button");
const popupSettingsClose = popupSettings.querySelector(".popup-agenda_close");
const settingsForm = document.querySelector("#settings-form");
const settingsInputs = document.querySelectorAll(".settings_input");
const themeToggleInput = document.querySelector("#settings-theme");

themeToggleInput.addEventListener("change", () => {
  document.body.classList.toggle("theme-light", themeToggleInput.checked);
});

const popupConfirm = document.querySelector("#popup-confirm");
const popupConfirmClose = popupConfirm.querySelector(".popup_close");
const popupConfirmMessage = popupConfirm.querySelector(".popup-confirm_message");
const popupConfirmAccept = popupConfirm.querySelector(".popup-confirm_accept");

// --- Datos de las publicaciones ---
const data = [
  { title: "Consulta con el veterinario", link: "./images/consultageneral.jpg", likes: 128, comments: 12 },
  { title: "Vacuna del día", link: "./images/vacunacion.png", likes: 94, comments: 8 },
  { title: "Día de baño", link: "./images/bañomascota.jpg", likes: 156, comments: 21 },
  { title: "Chequeo con rayos X", link: "./images/tomo.png", likes: 73, comments: 5 },
  { title: "Mirada curiosa", link: "./images/pp_cat.jpg", likes: 310, comments: 34 },
  { title: "Foto favorita", link: "./images/pp_cat.jpg", likes: 287, comments: 29 },
];

data.forEach((item) => {
  const card = cardTemplate.content.cloneNode(true);
  const cardImage = card.querySelector(".card_image");
  const cardHeart = card.querySelector(".card_heart");
  const cardLikeButton = card.querySelector(".card_like_button");
  const cardOverlayLikes = card.querySelector(".card_overlay_likes");
  const cardOverlayComments = card.querySelector(".card_overlay_comments");

  cardOverlayLikes.textContent = `❤️ ${item.likes}`;
  cardOverlayComments.textContent = `💬 ${item.comments}`;

  cardImage.src = item.link;
  cardImage.alt = item.title;

  cardImage.addEventListener("dblclick", () => {
    const cardEl = cardImage.closest(".card");
    cardEl.classList.add("card_liked");
    cardLikeButton.textContent = "❤️";

    cardHeart.classList.add("card_heart--visible");
    setTimeout(() => {
      cardHeart.classList.remove("card_heart--visible");
    }, 700);
  });

  cardLikeButton.addEventListener("click", () => {
    const cardEl = cardLikeButton.closest(".card");
    cardEl.classList.toggle("card_liked");
    cardLikeButton.textContent = cardEl.classList.contains("card_liked") ? "❤️" : "🤍";
  });

  cardContainer.append(card);
});

profileStatsPosts.textContent = data.length;

// --- Popup 1: editar perfil ---
profileEditButton.addEventListener("click", () => {
  popupEdit.classList.toggle("popup_open");
});

popupEditClose.addEventListener("click", () => {
  popupEdit.classList.toggle("popup_open");
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editUsernameInput.value) {
    profileUsername.textContent = editUsernameInput.value;
  }
  if (editBioInput.value) {
    profileBio.textContent = editBioInput.value;
  }

  popupEdit.classList.toggle("popup_open");
});

// --- Popup 2: configuración (aquí se conecta el bloque que estaba roto) ---
settingsOpenButton.addEventListener("click", () => {
  popupSettings.classList.toggle("popup-agenda_open");
});

popupSettingsClose.addEventListener("click", () => {
  popupSettings.classList.toggle("popup-agenda_open");
});

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const preferenciasActivas = [];

  settingsInputs.forEach((settingsInput) => {
    if (settingsInput.checked) {
      preferenciasActivas.push(settingsInput.value);
    }
  });

  popupSettings.classList.toggle("popup-agenda_open");

  popupConfirmMessage.textContent = preferenciasActivas.length
    ? `Preferencias guardadas: ${preferenciasActivas.join(", ")}.`
    : "Preferencias guardadas: ninguna opción activada.";
  popupConfirm.classList.toggle("popup_open");
});

// --- Popup 3: confirmación ---
popupConfirmClose.addEventListener("click", () => {
  popupConfirm.classList.toggle("popup_open");
});

popupConfirmAccept.addEventListener("click", () => {
  popupConfirm.classList.toggle("popup_open");
});