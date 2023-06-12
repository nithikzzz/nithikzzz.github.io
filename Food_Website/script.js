import { foodItem } from './fooditem.js'

//console.log(foodItem)

function displayFoodItems(){
    const biryani=document.querySelector("#biryani")
    const chicken=document.querySelector('#chicken')
    const paneer=document.querySelector('#paneer')
    const vegetable=document.querySelector('#vegetable')
    const chinese=document.querySelector('#chinese')
    const southIndian=document.querySelector('#south-indian')
    //console.log(chicken)

    const biryaniData = foodItem.filter((item)=>item.category==="biryani")
    const chickenData = foodItem.filter((item)=>item.category==="chicken")
    const paneerData = foodItem.filter((item)=>item.category==="paneer")
    const vegetableData = foodItem.filter((item)=>item.category==="vegetable")
    const chineseData = foodItem.filter((item)=>item.category==="chinese")
    const southIndianData = foodItem.filter((item)=>item.category==="south indian")
    //console.log(paneerData)
    //console.log(chickenData)
    //console.log(biryaniData)
    //console.log(vegetableData)
    //console.log(southIndianData)
    //console.log(chineseData)

    for(let item of biryaniData){
        biryani.innerHTML+=`
        <div id="item-card">
                        <div id="card-top">
                            <i class="fa fa-star" id="rating"> ${item.rating}</i>
                            <div class="fa fa-heart-o add-to-cart" id="${item.id}" ></div>
                        </div>
                        <img src="${item.img}" alt="">
                        <p id="item-name">${item.name}</p>
                        <p id="item-price">Price : ${item.price}</p>
        `
    }
        for(let item of chickenData){
        chicken.innerHTML+=`
        <div id="item-card">
                        <div id="card-top">
                            <i class="fa fa-star" id="rating"> ${item.rating}</i>
                            <div class="fa fa-heart-o add-to-cart" id="${item.id}" ></div>
                        </div>
                        <img src="${item.img}" alt="">
                        <p id="item-name">${item.name}</p>
                        <p id="item-price">Price : ${item.price}</p>
        `
    }
        for(let item of paneerData){
        paneer.innerHTML+=`
        <div id="item-card">
                        <div id="card-top">
                            <i class="fa fa-star" id="rating"> ${item.rating}</i>
                            <div class="fa fa-heart-o add-to-cart" id="${item.id}" ></div>
                        </div>
                        <img src="${item.img}" alt="">
                        <p id="item-name">${item.name}</p>
                        <p id="item-price">Price : ${item.price}</p>
        `
    }
        for(let item of vegetableData){
        vegetable.innerHTML+=`
        <div id="item-card">
                        <div id="card-top">
                            <i class="fa fa-star" id="rating"> ${item.rating}</i>
                            <div class="fa fa-heart-o add-to-cart" id="${item.id}" ></div>
                        </div>
                        <img src="${item.img}" alt="">
                        <p id="item-name">${item.name}</p>
                        <p id="item-price">Price : ${item.price}</p>
        `
    }
        for(let item of chineseData){
        chinese.innerHTML+=`
        <div id="item-card">
                        <div id="card-top">
                            <i class="fa fa-star" id="rating"> ${item.rating}</i>
                            <div class="fa fa-heart-o add-to-cart" id="${item.id}" ></div>
                        </div>
                        <img src="${item.img}" alt="">
                        <p id="item-name">${item.name}</p>
                        <p id="item-price">Price : ${item.price}</p>
        `
    }
        for(let item of southIndianData){
        southIndian.innerHTML+=`
        <div id="item-card">
                        <div id="card-top">
                            <i class="fa fa-star" id="rating"> ${item.rating}</i>
                            <div class="fa fa-heart-o add-to-cart" id="${item.id}" ></div>
                        </div>
                        <img src="${item.img}" alt="">
                        <p id="item-name">${item.name}</p>
                        <p id="item-price">Price : ${item.price}</p>
        `
    }
}
displayFoodItems()


function selectTaste(){
const listItem= [...new Map(foodItem.map(item=> [item['category'],item])).values()];
//console.log(listItem);
let categoryList=document.querySelector("#category-list")
for(let obj of listItem){
    categoryList.innerHTML+=`
    <div class="list-card">
                   <img src="${obj.img}" alt="list">
                   <a href="#${obj.category}" class="list-name"><b>${obj.category}</b></a>
                </div>

    `
}

}
selectTaste()
//itemSelect()
var cartData=[]
let total=0

const cart=document.querySelectorAll(".add-to-cart")
const table=document.querySelector("#table-body")

cart.forEach(item=>item.addEventListener("click",addToCart))

console.log(cartData.length)



function addToCart(){
    const itemId=this.getAttribute("id")
    const itemObject=foodItem.find((item)=>item.id==itemId)

    if(cartData.indexOf(itemObject)==-1){
        table.innerHTML+=`
        <tr>
            <td><img src="${itemObject.img}" alt="img"></td>
                 <td>${itemObject.name}</td>
                <td>
                <button class="decrease-item">-</button> <template></template>
                <span>1</span>
                <button class="increase-item">+</button>
                </td>
                <td>${itemObject.price}</td>
        </tr>
        `
        document.querySelectorAll(".increase-item").forEach((item)=>{
            item.addEventListener("click",incrementItem)
        })
        document.querySelectorAll(".decrease-item").forEach((item)=>{
            item.addEventListener("click",decrementItem)
        })
        cartData=[...cartData,itemObject]
        console.log(cartData.length)

        let id=this.getAttribute("id")
        
        document.getElementById(id).classList.add("toggle-heart")
        totalPrice()
    }
    else{
        alert("already added to the cart")
    }

    let itemCount=document.getElementById("cart-plus")
    itemCount.innerHTML=` Item : ${cartData.length}`

}

console.log(cartData.length)

function incrementItem(){
    
    let itemToInc=this.parentNode.previousSibling.previousSibling.innerHTML
    let itemObject=foodItem.find((item)=>item.name==itemToInc)
    //console.log(itemObject)
    itemObject.quantity++
    itemObject.currentPrice=itemObject.quantity*itemObject.price
    //console.log(itemObject)
    renderingCart()
}

console.log(cartData.length)

function decrementItem(){
    let itemToDecre=this.parentNode.previousSibling.previousSibling.innerHTML
    //console.log(itemToDecre)
    let itemObject=foodItem.find((item)=>item.name==itemToDecre)
    //console.log(cartData) 
    let ind=cartData.indexOf(itemObject)
    if(itemObject.quantity==1){
    const delItem=cartData.splice(ind,1)
    document.getElementById(`${itemObject.id}`).classList.remove("toggle-heart") }
    else{
    itemObject.quantity--
    itemObject.currentPrice=itemObject.quantity*itemObject.price
    }  
    renderingCart()
    
}
console.log(cartData.length)

function renderingCart(){
    

    table.innerHTML=""
    cartData.forEach((itemObject)=>
    table.innerHTML+=`
    <tr>
        <td><img src="${itemObject.img}" alt="img"></td>
             <td>${itemObject.name}</td>
            <td>
            <button class="decrease-item">-</button> <template></template>
            <span>${itemObject.quantity}</span>
            <button class="increase-item">+</button>
            </td>
            <td>${itemObject.quantity==1?itemObject.price:itemObject.currentPrice}</td>
    </tr>
    `
    
    )

    document.querySelectorAll(".increase-item").forEach((item)=>{
        item.addEventListener("click",incrementItem)
    })
    document.querySelectorAll(".decrease-item").forEach((item)=>{
        item.addEventListener("click",decrementItem)
    })

    totalPrice()
}

console.log(cartData.length)

function totalPrice(){
    const price=document.getElementById("total-price")
    const item=document.getElementById("total-item")
    item.innerHTML=""
    item.innerHTML=`Total Item : ${cartData.length}`
    total=0
    for(let x of cartData){
        total+=x.quantity==1?x.price:x.currentPrice
    }
    
    price.innerHTML=`Total Amount : ${total}`
}


document.getElementById("cart-plus").addEventListener("click",cartList)
let disable=true
function cartList(){
    if(cartData.length==0){
        alert("No Item Selected! Please Select Fooditems")
    }
    else if(disable){
        document.getElementById("category-list").style.display="none"
        document.getElementById("food-items").style.display="none"
        document.getElementById("cart-page").style.display="grid"
        document.getElementById("checkout").style.display="grid"
        disable=!disable
    }else {
        document.getElementById("category-list").style.display="grid"
        document.getElementById("food-items").style.display="grid"
        document.getElementById("cart-page").style.display="none"
        document.getElementById("checkout").style.display="none"
        disable=!disable
    }

}
document.getElementById('add-address').addEventListener('click',addAddress);

document.getElementById('m-add-address').addEventListener('click',addAddress);

function addAddress(){
    var address= prompt("Enter Your Address...........","");
    if(address){
        document.getElementById("add-address").innerText= ' ' + address;
    }
    else{
        alert("Address Is Let Not Entered")
    }
}