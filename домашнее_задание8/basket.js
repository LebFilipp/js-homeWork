"use strict"

const bascetCountEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart (id, name, price) {
    if(!(id in basket)) {
        basket[id] = { id, name, price, count: 0};
    }
    basket[id].count++;
    bascetCountEl.textContent = getTotalBascetCount();
    basketTotalValueEl.textContent = getTotalBascetPrice().toFixed(2);
    saveProductInBascrt(id);
};

function getTotalBascetCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
};

function getTotalBascetPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
};

function saveProductInBascrt(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
    saveNewProductInBasket(id);
    return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRpw').textContent = basket[id].price * basket[id].count;
};

function saveNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count} шт.</span>
            </div>
            <div>$${basket[productId].price}</div>
            <div>
            <span class="productTotalRpw">${(basket[productId].count * basket[productId].price)}.</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
};