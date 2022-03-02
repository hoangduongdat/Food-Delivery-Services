var ordersProduct =[]
let allProducts 
var totalOrderProducts =0
var subTotalElements = document.querySelector('.order-Subtotal')
var totalElements = document.querySelector('.total')
var listProductBlock = document.querySelector('#list-product')


const app = function () {

    getProduct(function (products) {
        allProducts = products
        renderProductChicken(products)
    })

    const tabs= document.querySelectorAll('.dashboard-menu-item')
    tabs.forEach ((tab,index) => {
        tab.onclick= function (e) {
            e.preventDefault()
            document.querySelector('.dashboard-menu-item.active').classList.remove('active')
            this.classList.add('active')  
            listProductBlock.innerHTML=''
            renderProductChicken(allProducts)
        }
    
})
    
}

app();

function getProduct(callback) {
    fetch('http://localhost:3000/product')
    .then(response => response.json())
    .then(callback);
}

function renderProductChicken(products){
    products= products.reverse()
    var htmls =products.map(product =>{
        return`
            <div class="dashboard-card">
                <img src="${product.img}" alt="" />
                <div class="card-detail">
                <h4>${product.name}</h4> <span>$${product.price}</span>
                <p>${product.description}</p>
                <p class="card-time">
                    <span class="fas fa-clock"></span>15-30 mins
                </p>
                </div>
                <button onclick="handleOrderProduct(${product.id})" data-id="${product.id}" class="order-product-btn">Đặt Ngay</button>
            </div>
        `
    })
    listProductBlock.innerHTML=htmls.join('')
}




function handleOrderProduct(idProduct){
    const product=allProducts.find(product => product.id===idProduct)
    const checkProduct= ordersProduct.some(product => product.id===idProduct)
    if(!checkProduct)
    {
        product.count=1
        ordersProduct.push(product) 
    }
    else {
        ordersProduct.forEach(product => {
            if(product.id===idProduct){
                product.count++
                console.log(product.count)
            }    
        });
    
    }
    totalOrderProducts=totalOrder(ordersProduct)
    subTotalElements.innerText='$'+totalOrderProducts
    totalElements.innerText='$'+totalOrderProducts

    console.log(totalOrderProducts)
    renderOrderProduct() 
    
}


function renderOrderProduct () {
    var listOrderProductBlock = document.querySelector('#list-order-product')
    listOrderProductBlock,innerHTML=''
    var htmlss =ordersProduct.map(product =>{
        return`
            <div class="order-card">
                <img src="${product.img}" alt="" class="order-img" />
                <div class="order-detail">
                <p>${product.name}</p>
                <i class="fas fa-times"></i> <input type="number" value="${product.count}" />
                </div>
                <div>
                    <h4 class="order-price">$${product.price}</h4>
                    <button onclick="handleDeleteOrderPrduct(${product.id})" class="delete-product-order-btn">Hủy món</button>
                </div>
               
            </div>
        `
    })
    listOrderProductBlock.innerHTML=htmlss.join('')
}


function handleDeleteOrderPrduct (idProduct) {
    var products =ordersProduct.filter(product => product.id!==idProduct)
    ordersProduct=products
    
    renderOrderProduct ()
}

function totalOrder(products) {
    const total= products.reduce(((total,product) => {
        console.log(product.price)
        return (total + Number(product.price * product.count))
    }),0)
    return total
}





