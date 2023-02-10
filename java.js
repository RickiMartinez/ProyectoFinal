const mobile = document.querySelector(".menu-toggle");
const mobileLink = document.querySelector(".menu-list");

mobile.addEventListener("click", function() {
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
})

// close menu list 
mobileLink.addEventListener("click", function(){
    const menuBars = document.querySelector(".is-active");
    if(window.innerWidth<=768 && menuBars) {
        mobile.classList.toggle("is-active");
        mobileLink.classList.remove("active");
    }
})


const swiper = new Swiper(".mySwiper",{
    spaceBetween : 30,
    centeredSlides: true,
    autoplay: {
        delay:3500,
        disableOnInteraction: false,
    },
    pagination: {
        el:".swiper-pagination",
        clickable: true,
    },
});


const elem = document.querySelector(".product-wrapper");
const iso = new Isotope (elem, {
    itemSelector: ".product-card",
    layoutMode: "fitRows",
});

const filtersElem = document.querySelector("#filter");
filtersElem.addEventListener("click", function(event){
    if (!matchesSelector(event.target ,"button")){
        return;
    }
    var filterValue = event.target.getAttribute("data-filter");
    iso.arrange ({filter: filterValue});
});



//===================================================//

const cartInfo = document.querySelector(".cart")
const cartContent = document.querySelector(".cart-content")

//Lista de todos los contenedores de productos//

const productsList = document.querySelector(".product-wrapper")


// Variable de arreglos de Productos

let allProducts = []

productsList.addEventListener("click", e => {

    if(e.target.classList.contains("product-button")){
        const product = e.target.parentElement
        const infoProduct = {
            quantity: 1,
            title: product.querySelector("h4").textContent,
            price: product.querySelector("span").textContent,
        }

        const exits = allProducts.some(product => product.title === infoProduct.title)

        if(exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...product];
        } else {
        allProducts = [...allProducts, infoProduct];
    }

        showHTML();
    }

    
})

// Funcion para mostrar HTML
const showHTML = () => {

    //Limpiar HTML//
    cartContent.innerHTML = ""

    allProducts.forEach(product => {
        const containerProduct = document.createElement("div")
        containerProduct.classList.add ("cart-content")

        containerProduct.innerHTML = `
                            <div class="cart-detail">
                            <img class="cart-image" src="images/collection-1.webp">
                            <div class="cart-text">
                            <<h4 class="titulo">${product.title}</h4>
                            <p class="cantidad">${product.quantity}</p>
                            </div>
                            <h4 class="precio">${product.price}</h4>
                            </div>
        `

        cartContent.append(containerProduct)

    })
}