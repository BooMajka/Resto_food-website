
function getItems(){
    db.collection("menu").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                price: doc.data().price
            })
        });
        console.log(items);
        generateItems(items);
    });
}


function addToCart(item){
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                name: item.name,
                price: item.price,
                quantity: 1
            })
        }
    })
}

function generateItems(items) {

    let itemsHTML = "";
    items.forEach((item) => {
 
        let doc = document.createElement('div');
        doc.classList.add("box");
        doc.innerHTML = `
    
        <div class="image">
                <img src="${item.image}" alt="">
                <a href="#" class="fas fa-heart"></a>
            </div>
            <div class="content">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <h3>${item.name}</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
                <span class="price">$${item.price}</span>
            </div>
        `
        console.log(doc);
       
        let addToCartEl = document.createElement("a");
        addToCartEl.classList.add("btn", "btn-cart");
        addToCartEl.innerText = "add to cart";
        addToCartEl.addEventListener('click', function(){
            addToCart(item);
        })

        doc.appendChild(addToCartEl);
        document.querySelector(".main-menu-container").appendChild(doc);
    });
}




getItems();

