const orders = require('../../../models/order');

function orderController() {
    return {
        async index(req, res) {
            try {
                const ordersList = await orders.find({ status: { $ne: 'completed' } })
                    .sort({ createdAt: -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.xhr) {
                    return res.json(ordersList);
                } else {
                    res.render('admin/orders', { ordersList });
                }
            } catch (error) {
                // Handle the error here
                console.error(error);
            }
        }
    };
}

module.exports = orderController;
