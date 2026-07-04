"use strict";

const cartCounter = document.querySelector(".cart-button__counter");
const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");
const favoriteButtons = document.querySelectorAll(
  ".product-card__favorite",
);

let cartItemsCount = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartItemsCount += 1;
    cartCounter.textContent = cartItemsCount;

    button.textContent = "✓";
    button.setAttribute("aria-label", "Товар добавлен в корзину");

    setTimeout(() => {
      button.textContent = "+";
    }, 900);
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isActive = button.classList.toggle("is-active");

    button.textContent = isActive ? "♥" : "♡";
    button.setAttribute(
      "aria-label",
      isActive ? "Удалить из избранного" : "Добавить в избранное",
    );
  });
});

const volumeButtons = document.querySelectorAll("[data-volume]");
const featuredPrice = document.querySelector("[data-featured-price]");
const featuredAddButton = document.querySelector("[data-featured-add]");

volumeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    volumeButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");

    featuredPrice.textContent = button.dataset.price;
  });
});

featuredAddButton.addEventListener("click", () => {
  cartItemsCount += 1;
  cartCounter.textContent = cartItemsCount;

  const originalText = featuredAddButton.textContent;

  featuredAddButton.textContent = "Товар добавлен";
  featuredAddButton.disabled = true;

  setTimeout(() => {
    featuredAddButton.textContent = originalText;
    featuredAddButton.disabled = false;
  }, 1000);
});

const reviewCards = [...document.querySelectorAll("[data-review]")];
const reviewDots = [...document.querySelectorAll("[data-review-dot]")];
const reviewPreviousButton = document.querySelector("[data-review-prev]");
const reviewNextButton = document.querySelector("[data-review-next]");

let activeReviewIndex = 0;

function showReview(index) {
  activeReviewIndex = (index + reviewCards.length) % reviewCards.length;

  reviewCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeReviewIndex;

    card.hidden = !isActive;
    card.classList.toggle("is-active", isActive);
  });

  reviewDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeReviewIndex;

    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

reviewPreviousButton?.addEventListener("click", () => {
  showReview(activeReviewIndex - 1);
});

reviewNextButton?.addEventListener("click", () => {
  showReview(activeReviewIndex + 1);
});

reviewDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showReview(Number(dot.dataset.reviewDot));
  });
});

const faqButtons = [...document.querySelectorAll("[data-faq-button]")];

function setFaqState(button, isOpen) {
  const item = button.closest(".faq__item");
  const answer = document.getElementById(
    button.getAttribute("aria-controls"),
  );

  item.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  answer.setAttribute("aria-hidden", String(!isOpen));
}

faqButtons.forEach((button) => {
  const item = button.closest(".faq__item");
  setFaqState(button, item.classList.contains("is-open"));

  button.addEventListener("click", () => {
    const currentItem = button.closest(".faq__item");
    const willOpen = !currentItem.classList.contains("is-open");

    faqButtons.forEach((otherButton) => {
      setFaqState(otherButton, false);
    });

    if (willOpen) {
      setFaqState(button, true);
    }
  });
});