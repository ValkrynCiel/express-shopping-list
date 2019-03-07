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

    let found_item = items.find(item => item.item === req.params.name);
    debugger;
    return res.json({found_item})
})





module.exports = router;
