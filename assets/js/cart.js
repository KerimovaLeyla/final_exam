const listProduct = document.getElementById('proWishlist');

function tableGet() {
    listProduct.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.map((item, index) => {
        const tr = document.createElement("tr");
        tr.className = 'carthAAd ';
        tr.innerHTML = `
            <td>
                <div class="images">
                    <img src="${item.image}" alt="">
                    ${item.name}
                </div>
            </td>
            <td class="pricee">$${item.price} </td>
            <td class="quality">
            <input style="width: 60px; text-align: center; border-radius: 30px; border: 1px solid #D75732;" type="number" value="${item.count}" oninput="updateQuantity(${index}, this.value)">
        </td>
            <td class="subtotal">$${(item.price * item.count).toFixed(2)}</td>
            <td>
                <div class="closebut">
                    <button class="closebutton" onclick="rmvFuncCart(${index})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </td>
        `;
        listProduct.appendChild(tr);
    });
}

function rmvFuncCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    tableGet();
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].count = parseInt(newQuantity, 10) || 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    tableGet();
    updateSubtotal(index);
}

function updateSubtotal(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalElement = document.querySelector(`#proWishlist tr:nth-child(${index + 1}) .subtotal`);
    const newSubtotal = cart[index].price * cart[index].count;
    subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;
}

tableGet();
