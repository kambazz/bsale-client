const sectionCenter = document.querySelector('.section-center');

const btnContainer = document.querySelector('.btn-container');

const searchContainer = document.querySelector('.input');

const url = "http://localhost:3000/api"

searchContainer.addEventListener('keyup',function(e){
  console.log(e.target.value );
  var filters = new XMLHttpRequest();
  filters.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let filter = JSON.parse(this.responseText);
      displayStoreItems(filter)   
    }
  };  
  let search = e.target.value;
  filters.open("GET",url+`/product/name/?name=`+search,true);

  console.log(search)
  filters.send();  
})


//load items
window.addEventListener('DOMContentLoaded',function() {
  var categories = new XMLHttpRequest();
  categories.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let category = JSON.parse(this.responseText);
      displayBtn(category)      
    }
  };
  categories.open("GET",url+"/category",true);
  categories.send();  
  var menus = new XMLHttpRequest();
  menus.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let menu = JSON.parse(this.responseText);
      displayStoreItems(menu)      
    }
  };
  menus.open("GET",url+"/product/prueba",true);
  menus.send(); 
  //displayBtn(categories);
  //displayStoreItems(menu);
});
//filter boton


function displayStoreItems(storeItem){
  let displayStore = storeItem.map(function(item){
    return `<article class="store-item">
              <div class="item-info">
                  <header>
                    <h4>${item.name}</h4>
                    <h4 class="price"> Valor: $${item.price}</h4>
                  </header>                  
                  <img src="${item.url_image}" class="photo"
                  alt="store-item"/>
              </div>
            </article>`;
  });
  displayStore = displayStore.join('');
  sectionCenter.innerHTML = displayStore;
  
}

function displayBtn(categoryItem) {  
  console.log(categoryItem)
  let displayCategories = categoryItem.map(function(item) {
    return `<button class="filter-btn" type="button" data-id="${item.id}">${item.name}</button>`;
  });
  displayCategories = displayCategories.join('');
  btnContainer.innerHTML = displayCategories;
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click',function(e) {
      const  category = e.currentTarget.dataset.id;
      let menu =  new XMLHttpRequest();
      menu.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {              
          let bla = JSON.parse(menu.responseText);
          console.log(bla)
          const menuCategory = bla.filter(function(menuItem){ 
            if(menuItem.category == category){   
              return menuItem;
            }
          });
          if(category ==='all'){
            displayStoreItems(bla);
          }
          else{
            displayStoreItems(menuCategory);
          }
        }
      };
      menu.open("GET",url+"/product/prueba",true);
      menu.send();
    });
  });
}
