const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/UsersController");

router.get('/', function(req, res, next) {
  UsersController.list(req, res, next);
});

router.get("/:id", function(req, res, next){
  UsersController.show(req, res, next);
});

router.post("/", function(req, res, next){
  UsersController.create(req, res, next);
});

router.put("/:id", function(req, res, next){
  UsersController.update(req, res, next);
});

router.delete("/:id", function(req, res, next){
  UsersController.delete(req, res, next);
});

module.exports = router;
