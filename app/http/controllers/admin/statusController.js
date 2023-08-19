const orders = require('../../../models/order');

function statusController() {
    return {
        update(req, res) {
            const orderId = req.body.orderId;
            const newStatus = req.body.status;

            orders.updateOne({ _id: orderId }, { status: newStatus })
                .then(() => {
                    // Successful update, redirect to orders page
                    return res.redirect('/admin/orders');
                })
                .catch(err => {
                    console.error(err);
                   
                    return res.redirect('/admin/orders');
                });
        }
    };
}

module.exports = statusController;
