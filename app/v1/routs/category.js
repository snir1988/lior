const express = require("express");
const {
  GetAll,
  GetByID,
  AddNew,
  UpdateByID,
  DeletByID,
} = require("../controllers/category");
const router = express.Router();

router.get("/", GetAll);
router.get("/:id", GetByID);
router.post("/", AddNew);
router.put("/:id", UpdateByID);
router.delete("/:id", DeletByID);

module.exports = router;
