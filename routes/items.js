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
    try {
        let foundItem = items.find(item => item.item === req.params.name);
        if (!foundItem){
            throw new ExpressError("item not found", 400)
        }
        return res.json({foundItem})
    } catch(err) {
        return next(err);
    }
})

router.patch("/:name", function(req, res, next){

    try {
        let itemIdx = items.findIndex(item => item.item === req.params.name);

        if (itemIdx === -1){
            throw new ExpressError("item not found", 400)
        }

        let newName = req.body.item || items[itemIdx].item;
        let newPrice = req.body.price || items[itemIdx].price;

        if (!req.body.item && !req.body.price){
            throw new ExpressError("please send JSON to update an item", 400)
        }
        
        items[itemIdx] = {newName, newPrice};
        let updatedItem = items[itemIdx]
        
        return res.json({updatedItem})
    } catch(err){
        return next(err);
    }
})

router.delete("/:name", function(req, res, next){

    try {
        let itemIdx = items.findIndex(item => item.item === req.params.name);

        if (itemIdx === -1){
            throw new ExpressError("item not found", 400)
        }
        items.splice(itemIdx, 1);

        return res.json({items})
    } catch(err) {
        return next(err);
    }
})


module.exports = router;
