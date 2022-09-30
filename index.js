'use strict'
const sliderContainer = document.querySelector(".main-food-box-container");
const sliderArray = Array.from(document.querySelector(".main-food-box-cnt").children)
const left = document.querySelector('.arrow-slider-left');
 const cartContainer = document.querySelector('.cart-item-cnt');
const right  = document.querySelector('.arrow-slider-right');
const cartModule = document.querySelector('.cart-module');
const total = document.getElementById('total-Price');


const globalFoodBoxData = {
  id:null,
  img:null,
  foodName:null,
  price:null,
  freq:null
};
let GlobalTotalCost = 0;
let cartArray = [];
//rendering cartArray

  function renderCart(foodItems){
   
    if(Array.isArray(foodItems)){
      let totalCost = 0;
      foodItems.forEach((foodData) => totalCost+= (+foodData.price)*(+foodData.freq));
      let htmlLayout  = `${foodItems.map((foodData)=>{
        
           return  `<div class="cart-item" id = '${foodData.id}'>
            <div class="cart-item-img">
                <img src = '${foodData.img}' alt="">
                <div class="cross"  id = '${foodData.id}'>
                    ❌
                </div>
            </div>
            <div class="cart-item-text">
                <p class = "cart-item-title">${foodData.foodName}</p>
                <div class="cart-item-price">
                    <span>$</span><span id="price"39>${foodData.price}</span><span id = "multiply">X</span><span class = "makeInput" id = '${foodData.id}'>${foodData.freq}</span>
                </div>
            </div>
            
        </div>`
        
      }).join('')}`
      // console.log(htmlLayout);
      GlobalTotalCost = totalCost;
      console.log(totalCost)
      total.innerHTML =  `$${totalCost.toFixed(2)}`;
      cartContainer.innerHTML = htmlLayout;
      return ;
    }
    GlobalTotalCost+= (+foodItems.price)*(+foodItems.freq);
    cartContainer.insertAdjacentHTML('afterbegin', `<div class="cart-item" id = '${foodItems.id}'>
    <div class="cart-item-img">
        <img src = '${foodItems.img}' alt="">
        <div class="cross"  id = '${foodItems.id}'>
            ❌
        </div>
    </div>
    <div class="cart-item-text">
        <p class = "cart-item-title">${foodItems.foodName}</p>
        <div class="cart-item-price">
            <span>$</span><span id="price"39>${foodItems.price}</span><span id = "multiply">X</span><span class = "makeInput" id = '${foodItems.id}'>${foodItems.freq}</span>
        </div>
    </div>
    
</div>`)
total.innerHTML =  `$${GlobalTotalCost.toFixed(2)}`;
   
  }
//in side cart container
(function(){
  
  cartContainer.addEventListener('click',(e)=>{
    
    if(e.target.closest('.cross')) {
     const id = +e.target.id;
     let plusicon = Array.from(document.querySelectorAll('.menu-button')).filter((x)=>x.dataset.id == id);
     let newCartArray =   cartArray.filter((x)=>x.id!= id);
     plusicon[0].classList.remove('menu-button-added');
     cartArray = [...newCartArray];

     renderCart(cartArray.reverse());
     return ;
    }
  if(e.target.classList.contains('makeInput')){
    const id = e.target.id;
    let changed = e.target.innerText;
    let parent =   e.target;
     e.target.innerHTML = `<input type="text" class = "input-freq" id = ${id} placeholder = ${changed}>`
     e.target.children[0].focus();
     e.target.children[0].addEventListener('change',(e)=>{
        changed = e.target.value;
       parent.innerHTML = `<span class = "makeInput" id = '${id}'>${changed}</span>`;
     })
   
  }
  })


})();

(function(){
  // logic of clicking + icon and updating cartArray
  function CartHandler(e){
   
    if(!e.target.closest('.menu-button') ) return ;
    const id = +e.target.dataset.id;
    if(e.target.closest('.menu-button').classList.contains('menu-button-added')){
      e.target.closest('.menu-button').classList.remove('menu-button-added');
      
    let newCartArray =   cartArray.filter((x)=>x.id!= id);
      cartArray = [...newCartArray];
      renderCart(cartArray);
      return ;

    }
   
    e.target.closest('.menu-button').classList.add('menu-button-added');
     const foodBox = sliderArray.filter((x)=> x.dataset.id == id);
     const img = foodBox[0].children[0].children[0].getAttribute("src");
     const foodName = foodBox[0].children[1].children[0].innerText;
     const price =  +foodBox[0].children[1].children[1].children[1].innerText.slice(1);
     globalFoodBoxData.id = id;
     globalFoodBoxData.img = img;
     globalFoodBoxData.foodName = foodName;
     globalFoodBoxData.price = price;
     globalFoodBoxData.freq = 1;
     
    cartArray.push({...globalFoodBoxData});
    renderCart({...globalFoodBoxData});
  }
  document.querySelector('.main-food-box-cnt').addEventListener('click',CartHandler);

})();
//code for click functionality
(function(){
  document.getElementById('cart-icon').addEventListener('click',(e)=>{
 
    if(cartModule.classList.contains('cart-module-disactive') && window.innerWidth < 1029){
        document.documentElement.style.setProperty('--overflow-body','hidden');
    }
    else document.documentElement.style.setProperty('--overflow-body','auto');
    
     cartModule.classList.toggle('cart-module-disactive');

  })
  document.getElementById('cart-icon1').addEventListener('click',(e)=>{
    if(!cartModule.classList.contains('cart-module-disactive')){
      document.documentElement.style.setProperty('--overflow-body','auto');
  }
    cartModule.classList.toggle('cart-module-disactive');
 })
})();



(function(){
const slideidx = 0;
function handler(e){
    const root = document.documentElement;
    let current = !root.style.getPropertyValue('--food-box-translate')?0:root.style.getPropertyValue('--food-box-translate').split("px")[0];
    if(e.target.parentNode.classList.contains('arrow-slider-left')){ 
        console.log(current,'left');
        root.style.setProperty('--food-box-translate',`${(+current)+300}px`);
    }
    if(e.target.parentNode.classList.contains('arrow-slider-right')){
        console.log(current,'right');
        root.style.setProperty('--food-box-translate',`${(+current)-300}px`);
    }
    timerId = null;
}
let timerId;
//throotling
sliderContainer.addEventListener('click',(e)=>{
   if(!timerId){
   timerId = setTimeout(handler.bind(this,e),500);
   }
    }
    );
   
let options = {
    root: document.querySelector('.main-food-box-container'),
    rootMargin: '0px',
    threshold: 0.5
  }
 
  let callback = (entries, observer) => {
    entries.forEach((entry) => {

      if(entry.isIntersecting)
        right.classList.add('disable');
     
      else
        right.classList.remove('disable');
       
    
    });
};
let callback2 = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry.isIntersecting);
      if(entry.isIntersecting) left.classList.add('disable');
      else left.classList.remove('disable');
  
    });
};
  let observer = new IntersectionObserver(callback);
  let observer2 = new  IntersectionObserver(callback2);
  let target = document.querySelector('#tt');
  let target2 = document.querySelector('#ff');
   observer.observe(target);
   observer2.observe(target2);

})();