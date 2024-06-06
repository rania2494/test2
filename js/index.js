// select all inputs
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productList = [];
var mainBtn = document.getElementById("mainBtn");
var updateBtn = document.getElementById("updateBtn");


if (localStorage.getItem("productList") == null) {
    productList = []
} else {
    productList = JSON.parse(localStorage.getItem("productList"))
    displayProducts(productList)
}
function addProduct() {
    // if (mainBtn.innerText == "Update") {
    //     //   TODO:add update logic here
    // } else {
    
    if (validateProductName() == true) {
      var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value,
      };
      clearForm();
      productList.push(product);
      localStorage.setItem("productList", JSON.stringify(productList));
      displayProducts(productList);
    } 

    //   }

  }

function clearForm(flag) {
    productName.value =flag ? flag.name : '';
    productPrice.value = flag ? flag.price : "";
    productCat.value = flag?flag.category :  '';
    productDesc.value= flag ? flag.desc : ''
}


function retriveProductData(index) {
    clearForm(productList[index]);
//   productName.value = productList[index].name;
//   productPrice.value = productList[index].price;
//   productCat.value = productList[index].category;
//   productDesc.value = productList[index].desc;
  // mainBtn.innerText = 'Update'
  mainBtn.classList.add("d-none");
  updateBtn.classList.replace("d-none", "d-block");
}


function displayProducts(list) {
    var cartona = ``;

    for (var i = 0; i < list.length; i++) {
      cartona += ` <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].desc}</td>
                    <td>
                        <button class="btn btn-warning" onclick="retriveProductData(${i})">Update</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    </td>

                </tr>`;
    }
    document.getElementById("productData").innerHTML = cartona;
}


function deleteProduct(index) {
    productList.splice(index, 1)
    displayProducts(productList)
    localStorage.setItem("productList", JSON.stringify(productList))
}



function update() {
   mainBtn.classList.replace("d-none", "d-block");
   updateBtn.classList.replace("d-block", "d-none");
}

function search() {
    var searchKey = document.getElementById("inputSearch").value
    var searchList = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
            searchList.push(productList[i]);
        }
    }
    displayProducts(searchList);
}



function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(productName.value) == true) {
                document.getElementById("name-validation").classList.replace("d-block", "d-none");

    return true
    } else {
        document.getElementById("name-validation").classList.replace("d-none","d-block")
     return false
    }
}


// price ..... validation ..1000 to 10000
// catgory ... Mobile | TV | Laptop

// desc : 100char ... 500 char