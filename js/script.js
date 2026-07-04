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