const Menu = require('../../models/menu')
function homeController(){
    return{
       async index(req, res){
            const pizza = await Menu.find();
            
          return res.render('home', {pizza: pizza})
        }
    }
}

module.exports = homeController;

