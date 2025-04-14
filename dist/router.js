"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var product_1 = require("./handlers/product");
var update_1 = require("./handlers/update");
var router = (0, express_1.Router)();
router.get('/product', product_1.getProducts);
router.get('/product/:id', product_1.getOneProduct);
router.put('/product/:id', (0, express_validator_1.body)('name').isString(), middleware_1.handleInputErrors);
router.post('/product', [(0, express_validator_1.body)('name').isString()], middleware_1.handleInputErrors, product_1.createProduct);
router["delete"]('/product/:id', product_1.deleteProduct);
router.get('/update', update_1.getUpdates);
router.get('/update/:id', product_1.getOneProduct);
router.put('/update/:id', (0, express_validator_1.body)('title').optional(), (0, express_validator_1.body)('body').optional(), (0, express_validator_1.body)('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(), (0, express_validator_1.body)('version').optional(), (0, express_validator_1.body)('asset').optional().isString(), update_1.updatedUpdate);
router.post('/update', (0, express_validator_1.body)('title').exists().isString(), (0, express_validator_1.body)('body').exists().isString(), (0, express_validator_1.body)('productId').exists().isString(), (0, express_validator_1.body)('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(), (0, express_validator_1.body)('version').optional().isNumeric(), update_1.createUpdate);
router["delete"]('/update/:id', update_1.deleteUpdates);
router.get('/updatepoint', function () { });
router.get('/updatepoint/:id', function () { });
router.put('/updatepoint/:id', (0, express_validator_1.body)('name').optional().isString(), (0, express_validator_1.body)('description').optional().isString(), function () { });
router.post('/updatepoint', (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('description').isString(), (0, express_validator_1.body)('updateId').exists().isString(), function () { });
router["delete"]('/updatepoint/:id', function () { });
router.use(function (err, req, res, next) {
    console.log(err);
    res.json({ message: "In route error" });
});
exports["default"] = router;
//# sourceMappingURL=router.js.map