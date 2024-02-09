const prolist=document.getElementById('prolist')
limit=8
page=1
function getproduct(){
    prolist.innerHTML=''
    axios.get(`https://65680f6b9927836bd9740785.mockapi.io/swp102/product?page=${page}&limit=${limit}`)
    .then(res=>{
    products=res.data
    products.map(item=>{
        const box= document.createElement('div')
        box.className='boxDiv col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'
        box.innerHTML=`
        <div class="proDiv">
        <img src="${item.image}" alt="">
        <div class="textDiv">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        </div>
        <div class="btnDiv">      
        <button class="twobutton" onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></i></button>    
        <button class="onebutton" onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i><button>
        <a href="./detailpage.html"><button class="threebutton" onclick="detail(${item.id})"><i class="fa-solid fa-arrow-right"></i></button></a>
        </div>
        </div>
        `
        prolist.appendChild(box)
    })
    })
}
getproduct()
function detail(id) {
    // Yeni ürünü sepete eklemek için önceki verileri temizle
    localStorage.removeItem('cart');

    // Yeni ürünü sepete ekle
    const cart = [products.find(item => item.id == id)];
    
    // Güncellenmiş sepet verilerini localStorage'a kaydet
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addtobasket(id) {
    let cart=JSON.parse(localStorage.getItem('cart')) || []
    let productItem = cart.find(item => item.id == id)

    if(productItem){
        productItem.count = (productItem.count || 1) + 1
    }else {
        cart.push(products.find(item => item.id == id))
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    
}
function addtowishlist(id){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    let productItem = wishlist.find(item => item.id == id)
    
    if(productItem){
        alert('This product has already become a favorite')
    } else {
        wishlist.push(products.find(item => item.id == id)) 
        localStorage.setItem('wishlist',JSON.stringify(wishlist))
    }

}