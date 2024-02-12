
const listProduct = document.getElementById('proWishlist')
function tableGet() {
    listProduct.innerHTML = ''
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.map((item, index) => {
        const tr = document.createElement("tr")
        tr.className = 'wishAAd';
        tr.innerHTML = `
    <td><div class="images"><img src="${item.image}" alt=""></td>     
    <td>${item.name}</td>  
    <td class="pricee">$${item.price} </td>    
    <td><button class="adbutton" onclick="addtobasket(${item.id})">Add Cart</button></td>    
    <td> <div class="closebut"> <button class="closebutton" onclick="rmvFunc(${index})"><i class="fa-solid fa-xmark"></i></button></td> 
 
   
`
        listProduct.appendChild(tr)
    })
}
tableGet()

function rmvFunc(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.splice(index, 1)
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    tableGet()
}
function addtobasket(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productItem = cart.find(item => item.id == id);

    if (productItem) {
        productItem.count = (productItem.count || 1) + 1;
    } else {
        cart.push({ ...products.find(item => item.id == id), count: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
    updateCartCount();

    // Add the selected product to the cart display
    const selectedProduct = products.find(item => item.id == id);
    displayInCart(selectedProduct);
}

