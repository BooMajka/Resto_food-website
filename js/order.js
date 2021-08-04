function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems)
    
    })
}

function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item)=>{
        totalCost += (item.price * item.quantity);
       
    })
    document.querySelector(".total-cost-number").innerText = "$" + totalCost.toFixed(2);
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 0) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item">
            <div class="cart-item-image">
                <img class="cart-img" src="${item.image}">
            </div>
            <div class="cart-item-details">
                        <div class="cart-item-title">
                            ${item.name} 
                        </div>
            </div>
                <div class="cart-item-counter">
                    <div data-id="${item.id}" class="cart-item-decrease">
                        <i class="fas fa-chevron-left fa-xs"></i>
                    </div>
                    <h4 class="text-cart-quantity">x ${item.quantity}</h4>
                    <div data-id="${item.id}" class="cart-item-increase">                        
                        <i class="fas fa-chevron-right fa-xs"></i>
                    </div>
                </div>
                <div class="cart-item-total-cost">
                    $${item.price * item.quantity}
                </div>
                <div data-id="${item.id}"  class="cart-item-delete">
                    <i class="fas fa-times"></i>
                </div>
        </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}


function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");

    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function() {
            increaseCount(button.dataset.id)
        })
    })

    deleteButtons.forEach((button)=>{
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id)
        })
    })

}





getCartItems();