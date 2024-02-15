const Myform = document.getElementById('Myform');
const exampleName = document.getElementById('exampleName');
const exampleTitle = document.getElementById('exampleTitle');
const exampleImage = document.getElementById('exampleImage');
const exampleInputPrice = document.getElementById('examplePrice');
const tableDiv = document.getElementById('tableDiv');
const inp = document.getElementById('inp');
const srcItem = document.getElementById('srcItem');
const inputEl = document.querySelector('.input');
const bodyEl = document.body;

Myform.addEventListener('submit', postForm);
srcItem.addEventListener('submit', srcFunc);
inputEl.addEventListener('input', updateBody);

function postForm(e) {
    e.preventDefault();

    const newProduct = {
        name: exampleName.value,
        title: exampleTitle.value,
        price: exampleInputPrice.value,
        image: exampleImage.value
    };

    axios.post('https://65680f6b9927836bd9740785.mockapi.io/swp102/product', newProduct)
        .then(() => {
            Myform.reset();
            setTimeout(getForm, 1000);
        })
        .catch((err) => console.log(err));
}

function getForm() {
    tableDiv.innerHTML = '';

    axios.get('https://65680f6b9927836bd9740785.mockapi.io/swp102/product')
        .then((res) => {
            const data = res.data;
            data.forEach((item) => {
                const box = document.createElement('tr');
                box.className = 'myBox col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12';
                box.innerHTML = `
                    <td><img src="${item.image}" alt=""></td>
                    <td><p>${item.name}</p></td>
                    <td><p>$${item.price}</p></td>
                    <td><div class="closebut"><button class="closebutton" onclick="deleteFromForm(${item.id})"><i class="fa-solid fa-xmark"></i></button></div></td>`;
                tableDiv.appendChild(box);
            });
        })
        .catch((err) => console.log(err));
}

function deleteFromForm(id) {
    tableDiv.innerHTML = '';
    axios.delete(`https://65680f6b9927836bd9740785.mockapi.io/swp102/product/${id}`)
        .then(() => setTimeout(getForm, 1000))
        .catch((err) => console.log(err));
}

function srcFunc(e) {
    e.preventDefault();

    axios.get('https://65680f6b9927836bd9740785.mockapi.io/swp102/product')
        .then((res) => {
            const db = res.data;
            const searchTerm = inp.value.toLowerCase();
            const data = db.filter((item) => item.name.toLowerCase().includes(searchTerm));
            data.sort((a, b) => a.name.localeCompare(b.name));
            display(data);
            inp.value = '';
        })
        .catch((err) => console.log(err));
}

function display(data) {
    tableDiv.innerHTML = '';
    data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.className = 'carthAAd ';
        tr.innerHTML = `
            <td>
                <div class="images">
                    <img src="${item.image}" alt=""> 
                </div>
            </td>
            <td>${item.name}</td>   
            <td class="pricee">$${item.price} </td>
            <td>
                <div class="closebut">
                    <button class="closebutton" onclick="rmvFuncCart(${item.id})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </td>
        `;
        tableDiv.appendChild(tr);
    });
}



function updateBody() {
    bodyEl.style.background = inputEl.checked ? 'black' : 'white';
}

function rmvFuncCart(id) {
    axios.delete(`https://65680f6b9927836bd9740785.mockapi.io/swp102/product/${id}`)
        .then(() => {
            addPage();
        })
        .catch((error) => console.log(error));
}



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

function addPage() {
    tableDiv.innerHTML = '';
    axios.get('https://65680f6b9927836bd9740785.mockapi.io/swp102/product')
        .then((res) => {
            const data = res.data;
            display(data);
        })
        .catch((err) => console.log(err));
}

addPage();