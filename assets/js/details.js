const proDetail = document.getElementById('proDetail');

function getdetail() {
    proDetail.innerHTML = '';
    let detail = JSON.parse(localStorage.getItem('detail')) || []
    detail.map((item, index) => {
        const boxs = document.createElement('div');
        boxs.className = 'bosxDiv row';
        boxs.innerHTML = `
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="images">
                    <img class="imagedetail" src="${item.image}" alt="">
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
               
                    <h4> ${item.name}</h4>
                      <span ;
                    ">$${item.price} </span>
                    <p >${item.description}</p>
                    <p >Aquia sit amet, elitr, sed diam nonum eirmod tempor invidunt labore et dolore magna aliquyam.erat, sed diam voluptua. At vero accusam et justo duo dolores et ea rebum. Stet clitain vidunt ut labore eirmod tempor invidunt magna aliquyam. Stet clitain vidunt ut labore.</p>                
                    <div class="btnDiv">
                    <a href="./cart.html"><button class="btnbuy" class="btns" onclick="addtobasket(${item.id})">Buy Now Coffe</button></a>  
                        <button class="twobutton" onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>    
                    </div>
               
            </div>
        `;
        proDetail.appendChild(boxs);
    });
}

getdetail();


// shop.js
const prolist = document.getElementById('prolist');
const cartTotal = document.querySelector('.cartTotal');
const cartCount = document.querySelector('.cartCount');

let limit = 8;
let page = 1;
let products = [];

function getproduct() {
    prolist.innerHTML = '';
    axios.get(`https://65680f6b9927836bd9740785.mockapi.io/swp102/product?page=${page}&limit=${limit}`)
        .then(res => {
            products = res.data;
            products.map(item => {
                const box = document.createElement('div');
                box.className = 'boxDiv col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12';
                box.innerHTML = `
                    <div class="proDiv">
                        <img src="${item.image}" alt="">
                        <div class="textDiv">
                            <h4>${item.name}</h4>
                            <p>$${item.price}</p>
                        </div>
                        <div class="btnDiv">      
                            <button class="twobutton" onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>    
                            <button class="onebutton" onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                            <a href="/details.html"><button class="threebutton" onclick="addtodetail(${item.id})"><i class="fa-solid fa-arrow-right"></i></button></a>
                        </div>
                    </div>
                `;
                prolist.appendChild(box);
            });
        })
        .catch(error => {
            console.error('Sorğu zamanı xəta:', error);
        });
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

    const selectedProduct = products.find(item => item.id == id);
    displayInCart(selectedProduct);
}

function displayInCart(product) {
    const cartDiv = document.querySelector('.cartTotal');
    const cartItemDiv = document.createElement('div');
    cartItemDiv.innerHTML = `
        <div class="cart-item">
            <img src="${product.image}" alt="">
            <div class="cart-itemnext">   
                <h6>${product.name}</h6>
                <p>$${product.price}</p>
            </div>
        </div>
    `;
    cartDiv.appendChild(cartItemDiv);
}

function addtowishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let productItem = wishlist.find(item => item.id == id);

    if (productItem) {
        alert('This product has already become a favorite');
    } else {
        wishlist.push(products.find(item => item.id == id));
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

function addtodetail(id) {
  
    let selectedProduct = products.find(item => item.id == id);

    let detail = JSON.parse(localStorage.getItem('detail')) || [];

    if (!detail.some(item => item.id === selectedProduct.id)) {
   
        detail = [{ ...selectedProduct, count: undefined }];
    
        localStorage.setItem('detail', JSON.stringify(detail));

        console.log('Selected product added to detail:', selectedProduct);
    } else {
        console.log('Selected product is already in detail:', selectedProduct);
    }
}

getproduct();
