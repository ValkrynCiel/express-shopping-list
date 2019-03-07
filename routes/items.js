const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb")

router.get("", function(req, res, next){
    try {
        return res.json({items});
    } catch(err) {
        return next(err);
    }
})

router.post("", function(req, res, next){
    try {
        let {item, price} = req.body;
        if (typeof item !== "string" || !Number.isFinite(price) || item.length === 0){
            throw new ExpressError("must provide valid item name AND price!", 400)
        }
        items.push({item, price});
        return res.json({item, price});
    } catch(err) {
        return next(err);
    }
    
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

router.delete("/:name", function(req, res, next){

    let itemIdx = items.findIndex(item => item.item === req.params.name);
    items.splice(itemIdx, 1);

    return res.json({items})
})






module.exports = router;
