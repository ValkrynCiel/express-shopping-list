const express = require("express");
const router = new express.Router();
const ExpressError = ("../expressError");
const items = require("../fakeDb")

router.get("", function(req, res, next){
    return res.json({items})
})

router.post("", function(req, res, next){
    let {item, price} = req.body;

    items.push({item, price});
    return res.json({item, price})
})

router.get("/:name", function(req, res, next){

    let foundItem = items.find(item => item.item === req.params.name);

    return res.json({foundItem})
})

router.patch("/:name", function(req, res, next){

    let itemIdx = items.findIndex(item => item.item === req.params.name);
    let newName = req.body.item || items[itemIdx].item;
    let newPrice = req.body.price || items[itemIdx].price;
    
    items[itemIdx] = {newName, newPrice};
    let updatedItem = items[itemIdx]
    
    return res.json({updatedItem})
})





module.exports = router;
