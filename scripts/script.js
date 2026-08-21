// --- Selectores principales ---
const popupEdit = document.querySelector("#popup-edit");
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

// --- Selectores del visor de publicación ---
const popupPost = document.querySelector("#popup-post");
const popupPostClose = popupPost.querySelector(".popup-post_close");
const popupPostImage = popupPost.querySelector(".popup-post_image");
const popupPostUsername = popupPost.querySelector(".popup-post_username");
const popupPostCaption = popupPost.querySelector(".popup-post_caption");
const popupPostLikesCount = popupPost.querySelector(".popup-post_likes_count");
const popupPostLikeButton = popupPost.querySelector(".popup-post_like_button");
const popupPostNavPrev = popupPost.querySelector(".popup-post_nav--prev");
const popupPostNavNext = popupPost.querySelector(".popup-post_nav--next");
const popupPostMenuWrapper = popupPost.querySelector(".popup-post_menu_wrapper");
const popupPostMenuButton = popupPost.querySelector(".popup-post_menu_button");
const popupPostMenu = popupPost.querySelector(".popup-post_menu");
const popupPostMenuDelete = popupPost.querySelector(".popup-post_menu_delete");

// --- Datos de las publicaciones ---
const data = [
  { title: "Consulta con el veterinario", link: "./images/consultageneral.jpg", likes: 128, comments: 12 },
  { title: "Vacuna del día", link: "./images/vacunacion.png", likes: 94, comments: 8 },
  { title: "Día de baño", link: "./images/bañomascota.jpg", likes: 156, comments: 21 },
  { title: "Chequeo con rayos X", link: "./images/tomo.png", likes: 73, comments: 5 },
  { title: "Mirada curiosa", link: "./images/pp_cat.jpg", likes: 310, comments: 34 },
  { title: "Foto favorita", link: "./images/pp_cat.jpg", likes: 287, comments: 29 },
];

let posts = [...data];
let currentPostIndex = null;

const renderPost = () => {
  const post = posts[currentPostIndex];
  const cardEl = cardContainer.children[currentPostIndex];

  popupPostImage.src = post.link;
  popupPostImage.alt = post.title;
  popupPostUsername.textContent = profileUsername.textContent.trim();
  popupPostCaption.textContent = post.title;
  popupPostLikesCount.textContent = `${post.likes} Me gusta`;
  popupPostLikeButton.classList.toggle("popup-post_like_button--liked", cardEl.classList.contains("card_liked"));
  popupPostMenu.classList.remove("popup-post_menu--open");
  popupPostNavPrev.hidden = currentPostIndex === 0;
  popupPostNavNext.hidden = currentPostIndex === posts.length - 1;
};

const openPost = (index) => {
  currentPostIndex = index;
  renderPost();
  popupPost.classList.add("popup-post_open");
};

const buildCard = (item) => {
  const card = cardTemplate.content.cloneNode(true);
  const cardImage = card.querySelector(".card_image");
  const cardHeart = card.querySelector(".card_heart");
  const cardLikeButton = card.querySelector(".card_like_button");
  const cardOverlayLikes = card.querySelector(".card_overlay_likes");
  const cardOverlayComments = card.querySelector(".card_overlay_comments");

  cardOverlayLikes.textContent = item.likes;
  cardOverlayComments.textContent = item.comments;

  cardImage.src = item.link;
  cardImage.alt = item.title;

  let clickTimer = null;

  cardImage.addEventListener("click", () => {
    if (clickTimer) return;
    clickTimer = setTimeout(() => {
      const cardEl = cardImage.closest(".card");
      const index = Array.from(cardContainer.children).indexOf(cardEl);
      openPost(index);
      clickTimer = null;
    }, 200);
  });

  cardImage.addEventListener("dblclick", () => {
    clearTimeout(clickTimer);
    clickTimer = null;

    const cardEl = cardImage.closest(".card");
    cardEl.classList.add("card_liked");

    cardHeart.classList.add("card_heart--visible");
    setTimeout(() => {
      cardHeart.classList.remove("card_heart--visible");
    }, 700);
  });

  cardLikeButton.addEventListener("click", () => {
    const cardEl = cardLikeButton.closest(".card");
    cardEl.classList.toggle("card_liked");
  });

  return card;
};

data.forEach((item) => {
  cardContainer.append(buildCard(item));
});

profileStatsPosts.textContent = cardContainer.children.length;

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

// --- Popup 2: configuración ---
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

// --- Popup 4: visor de publicación ---
popupPostClose.addEventListener("click", () => {
  popupPost.classList.remove("popup-post_open");
});

popupPost.addEventListener("click", (e) => {
  if (e.target === popupPost) {
    popupPost.classList.remove("popup-post_open");
  }
});

popupPostNavPrev.addEventListener("click", () => {
  if (currentPostIndex > 0) {
    currentPostIndex--;
    renderPost();
  }
});

popupPostNavNext.addEventListener("click", () => {
  if (currentPostIndex < posts.length - 1) {
    currentPostIndex++;
    renderPost();
  }
});

popupPostLikeButton.addEventListener("click", () => {
  const post = posts[currentPostIndex];
  const cardEl = cardContainer.children[currentPostIndex];
  const liked = popupPostLikeButton.classList.toggle("popup-post_like_button--liked");

  cardEl.classList.toggle("card_liked", liked);
  post.likes += liked ? 1 : -1;
  popupPostLikesCount.textContent = `${post.likes} Me gusta`;
});

popupPostMenuButton.addEventListener("click", () => {
  popupPostMenu.classList.toggle("popup-post_menu--open");
});

document.addEventListener("click", (e) => {
  if (!popupPostMenuWrapper.contains(e.target)) {
    popupPostMenu.classList.remove("popup-post_menu--open");
  }
});

popupPostMenuDelete.addEventListener("click", () => {
  const cardToRemove = cardContainer.children[currentPostIndex];
  cardToRemove.remove();
  posts.splice(currentPostIndex, 1);

  profileStatsPosts.textContent = cardContainer.children.length;
  popupPost.classList.remove("popup-post_open");
});

// --- Popup 5: agregar publicación ---
const addPostButton = document.querySelector(".profile_tab_action--add");
const popupAdd = document.querySelector("#popup-add");
const popupAddClose = popupAdd.querySelector(".popup_close");
const addPostForm = document.querySelector("#add-post-form");
const addPostFileInput = document.querySelector("#add-post-file");
const addPostUrlInput = document.querySelector("#add-post-url");
const addPostCaptionInput = document.querySelector("#add-post-caption");
const addPostPreview = document.querySelector("#add-post-preview");

let pendingImageLink = "";

addPostButton.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_open");
});

popupAddClose.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_open");
});

addPostFileInput.addEventListener("change", () => {
  const file = addPostFileInput.files[0];
  if (!file) return;

  pendingImageLink = URL.createObjectURL(file);
  addPostUrlInput.value = "";
  addPostPreview.innerHTML = `<img class="add-post_preview_image" src="${pendingImageLink}" alt="Vista previa" />`;
});

addPostUrlInput.addEventListener("input", () => {
  if (!addPostUrlInput.value) return;

  pendingImageLink = addPostUrlInput.value;
  addPostFileInput.value = "";
  addPostPreview.innerHTML = `<img class="add-post_preview_image" src="${pendingImageLink}" alt="Vista previa" />`;
});

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!pendingImageLink) return;

  const newPost = {
    title: addPostCaptionInput.value || "Nueva publicación",
    link: pendingImageLink,
    likes: 0,
    comments: 0,
  };

  posts.push(newPost);
  cardContainer.append(buildCard(newPost));
  profileStatsPosts.textContent = cardContainer.children.length;

  addPostForm.reset();
  addPostPreview.innerHTML = `<span class="add-post_preview_placeholder">La vista previa aparecerá aquí</span>`;
  pendingImageLink = "";
  popupAdd.classList.remove("popup_open");
});

// --- Flechas de historias destacadas ---
const highlightsStrip = document.querySelector("#profile-highlights");
const highlightsPrev = document.querySelector(".highlights_nav--prev");
const highlightsNext = document.querySelector(".highlights_nav--next");

const updateHighlightsNav = () => {
  const maxScroll = highlightsStrip.scrollWidth - highlightsStrip.clientWidth;
  highlightsPrev.hidden = highlightsStrip.scrollLeft <= 4;
  highlightsNext.hidden = highlightsStrip.scrollLeft >= maxScroll - 4;
};

highlightsPrev.addEventListener("click", () => {
  highlightsStrip.scrollBy({ left: -200, behavior: "smooth" });
});

highlightsNext.addEventListener("click", () => {
  highlightsStrip.scrollBy({ left: 200, behavior: "smooth" });
});

highlightsStrip.addEventListener("scroll", updateHighlightsNav);
window.addEventListener("resize", updateHighlightsNav);
updateHighlightsNav();

// --- Historias: datos y visor ---
const STORY_DURATION = 4000;
const HIGHLIGHT_ORDER = ["siestas", "vet", "spa"];
let storyTimer = null;
let storyContext = null;

const popupStory = document.querySelector("#popup-story");
const popupStoryClose = popupStory.querySelector(".popup-story_close");
const popupStoryAvatar = popupStory.querySelector(".popup-story_avatar");
const popupStoryUsername = popupStory.querySelector(".popup-story_username");
const popupStoryImage = popupStory.querySelector(".popup-story_image");
const popupStoryProgress = popupStory.querySelector(".popup-story_progress");
const popupStoryPrevZone = popupStory.querySelector(".popup-story_zone--prev");
const popupStoryNextZone = popupStory.querySelector(".popup-story_zone--next");
const profileStoryTrigger = document.querySelector("#profile-story-trigger");

const stories = {
  profile: { username: "tilin.gato", avatar: "./images/pp_cat.jpg", items: [{ image: "./images/pp_cat.jpg" }] },
  siestas: { username: "tilin.gato", avatar: "./images/pp_cat.jpg", items: [{ image: "./images/pp_cat.jpg" }] },
  vet: { username: "tilin.gato", avatar: "./images/pp_cat.jpg", items: [{ image: "./images/consultageneral.jpg" }] },
  spa: { username: "tilin.gato", avatar: "./images/pp_cat.jpg", items: [{ image: "./images/bañomascota.jpg" }] },
};

const buildStoryProgress = (count) => {
  popupStoryProgress.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const bar = document.createElement("div");
    bar.className = "popup-story_progress_bar";
    const fill = document.createElement("div");
    fill.className = "popup-story_progress_fill";
    bar.append(fill);
    popupStoryProgress.append(bar);
  }
};

const loadStoryGroup = (key) => {
  const group = stories[key];
  storyContext.key = key;
  storyContext.items = group.items;
  storyContext.itemIndex = 0;
  popupStoryUsername.textContent = group.username;
  popupStoryAvatar.src = group.avatar;
  buildStoryProgress(group.items.length);
};

const renderStorySlide = () => {
  const { items, itemIndex } = storyContext;
  popupStoryImage.src = items[itemIndex].image;

  const bars = popupStoryProgress.querySelectorAll(".popup-story_progress_fill");
  bars.forEach((fill, i) => {
    fill.style.transition = "none";
    fill.style.width = i < itemIndex ? "100%" : "0%";
  });

  void popupStoryProgress.offsetWidth;

  const currentFill = bars[itemIndex];
  currentFill.style.transition = `width ${STORY_DURATION}ms linear`;
  requestAnimationFrame(() => {
    currentFill.style.width = "100%";
  });

  clearTimeout(storyTimer);
  storyTimer = setTimeout(goToNextSlide, STORY_DURATION);
};

const goToNextSlide = () => {
  if (storyContext.itemIndex < storyContext.items.length - 1) {
    storyContext.itemIndex++;
    renderStorySlide();
    return;
  }

  if (storyContext.mode === "highlight" && storyContext.queueIndex < storyContext.queue.length - 1) {
    storyContext.queueIndex++;
    loadStoryGroup(storyContext.queue[storyContext.queueIndex]);
    renderStorySlide();
    return;
  }

  closeStoryViewer();
};

const goToPrevSlide = () => {
  if (storyContext.itemIndex > 0) {
    storyContext.itemIndex--;
    renderStorySlide();
    return;
  }

  if (storyContext.mode === "highlight" && storyContext.queueIndex > 0) {
    storyContext.queueIndex--;
    loadStoryGroup(storyContext.queue[storyContext.queueIndex]);
    storyContext.itemIndex = storyContext.items.length - 1;
    renderStorySlide();
  }
};

const openStoryViewer = (key) => {
  if (key === "profile") {
    storyContext = { mode: "profile", queue: ["profile"], queueIndex: 0 };
  } else {
    const startIndex = HIGHLIGHT_ORDER.indexOf(key);
    storyContext = { mode: "highlight", queue: HIGHLIGHT_ORDER.slice(startIndex), queueIndex: 0 };
  }

  loadStoryGroup(storyContext.queue[0]);
  renderStorySlide();
  popupStory.classList.add("popup-story_open");
};

const closeStoryViewer = () => {
  clearTimeout(storyTimer);
  popupStory.classList.remove("popup-story_open");

  if (storyContext && storyContext.mode === "profile") {
    profileStoryTrigger.classList.add("story_ring--seen");
  }
  storyContext = null;
};

popupStoryClose.addEventListener("click", closeStoryViewer);
popupStoryPrevZone.addEventListener("click", goToPrevSlide);
popupStoryNextZone.addEventListener("click", goToNextSlide);

profileStoryTrigger.addEventListener("click", () => openStoryViewer("profile"));

document.querySelectorAll("[data-story]").forEach((el) => {
  el.addEventListener("click", () => openStoryViewer(el.dataset.story));
});