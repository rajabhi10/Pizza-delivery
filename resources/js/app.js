
const axios = require('axios');
const Noty = require('noty');
const initAdmin = require('./admin');

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('#cartCounter');
function updateCart(pizza){
    axios.post('/update-cart', pizza)
    .then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            progressBar: false,
            text: "Items add to the Cart"
          }).show();
    }) .catch(err =>{
        new Noty({
            type: 'error',
            timeout: 1000,
            progressBar: false,
            text: "Someting went wrong"
          }).show();
    });
}

addToCartButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        const pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    });
});
// Removing alert message after some seconds
const alertMsg = document.querySelector('#success-alert');
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    },2000);
}
initAdmin();