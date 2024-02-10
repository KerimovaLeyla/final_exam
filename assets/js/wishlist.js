const listProduct = document.getElementById('proWishlist')
function tableGet() {
    listProduct.innerHTML = ''
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.map((item, index) => {
        let tr = document.createElement("tr")
        tr.className = 'wishAAd'
        tr.innerHTML = `
       
       <td> <div class="closebut"> <button class="closebutton" onclick="rmvFunc(${item.id})"><i class="fa-solid fa-xmark"></i></button><div class="img">${item.image}<div/></div></td>
<td>${item.name}</td>
<td class="pricee">$${item.price} </td>
<td><button class="adbutton" onclick="addtobasket(${item.id})">Add to Basket</button></td>
`
        listProduct.appendChild(tr)
    })
}
tableGet()

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