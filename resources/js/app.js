
const axios = require('axios');
const Noty = require('noty');
const initAdmin = require('./admin');
const moment = require('moment');

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

// Order Status Updation

var status =  document.querySelectorAll('.status_line')
var hiddenInput = document.querySelector('#hiddenInput')
var order =  hiddenInput ?  hiddenInput.value : null;
order = JSON.parse(order)
var time = document.createElement('small');

 function updateStatus(order){
    var stepCompleted = true;
    status.forEach( (statuses) => {
        var dataGet = statuses.dataset.status
        if(stepCompleted) {
            statuses.classList.add('step-completed');
        }
        if(dataGet === order.status) {
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            statuses.appendChild(time);
            stepCompleted = false;
            if(statuses.nextElementSibling){
            statuses.nextElementSibling.classList.add('current')
        }
    }
    });
 }

 updateStatus(order);

