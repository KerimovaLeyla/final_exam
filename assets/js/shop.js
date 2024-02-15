// shop.js
const prolist = document.getElementById('prolist');
const cartTotal = document.querySelector('.cartTotal');
const cartCount = document.querySelector('.cartCount');
const proDetail = document.getElementById('proDetail');

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
                box.className = 'boxDiv col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12';
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



function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        total += (item.price * (item.count || 1));
    });

    cartTotal.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + (item.count || 1), 0);
    cartCount.innerHTML = `<p>Products in Cart: ${count}</p>`;
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
updateCartTotal();
updateCartCount();


// Filter
let max = document.getElementById("max")
let min = document.getElementById("min")
let abc = document.getElementById("abc")
let cba = document.getElementById("cba")
let dflt = document.getElementById("dflt")

max.addEventListener("click", maxFunc)
min.addEventListener("click", minFunc)
abc.addEventListener("click", abcFunc)
cba.addEventListener("click", cbaFunc)
dflt.addEventListener("click", addPage)


async function maxFunc() {
    await axios.get("https://65680f6b9927836bd9740785.mockapi.io/swp102/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (b.price - a.price))
            display(data)
        })
        .catch((err) => console.log(err))
}
async function minFunc() {
    await axios.get("https://65680f6b9927836bd9740785.mockapi.io/swp102/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (a.price - b.price))
            display(data)
        })
        .catch((err) => console.log(err))
}

async function abcFunc() {
    await axios.get("https://65680f6b9927836bd9740785.mockapi.io/swp102/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (a.title.localeCompare(b.title)))
            display(data)
        })
        .catch((err) => console.log(err))
}
async function cbaFunc() {
    await axios.get("https://65680f6b9927836bd9740785.mockapi.io/swp102/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (b.title.localeCompare(a.title)))
            display(data)
        })
        .catch((err) => console.log(err))
}

async function rmvFunc(id) {
    try {
        await axios.delete(`https://65680f6b9927836bd9740785.mockapi.io/swp102/product/${id}`)
            .then(() => {
                addPage()
                tableGet()
            })
    }
    catch (error) {
        console.log(error);
    }
}

async function addPage() {
    prolist.innerHTML = ""
    await axios.get("https://65680f6b9927836bd9740785.mockapi.io/swp102/product")
        .then((res) => {
            data = res.data
            display(data)
        })
        .catch((err) => console.log(err))
}
addPage()

function display(data) {
    prolist.innerHTML = ""
    data.forEach((item) => {
        const box = document.createElement('div')
        box.className = 'boxDiv col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'
        box.innerHTML = `
        <div class="proDiv">
        <img src="${item.image}" alt="">
        <div class="textDiv">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        </div>
        <div class="btnDiv">      
        <button class="twobutton" onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></i></button>    
        <button class="onebutton" onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i><button>
        <a href="/details.html"><button class="threebutton" onclick="addtodetail(${item.id})"><i class="fa-solid fa-arrow-right"></i></button>  </a>     
         </div>
        </div>
`
        prolist.appendChild(box)
    })
}

// Search func
let srcItem = document.getElementById("srcItem");
let inp = document.getElementById("inp");

srcItem.addEventListener("submit", srcFunc);

async function srcFunc(e) {
    e.preventDefault();

    await axios.get("https://65680f6b9927836bd9740785.mockapi.io/swp102/product")
        .then((res) => {
            let db = res.data;
            let searchTerm = inp.value.toLowerCase();
            let data = db.filter((item) => item.name.toLowerCase().includes(searchTerm));
            display(data);
            inp.value = "";
        })
        .catch((err) => console.log(err));
}

