const express = require("express");
const router = express.Router();
const Cars = require("./cars-model");
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require("./cars-middleware")
router.get("/", async (req, res, next)=> {
    try{
        const data = await Cars.getAll();
        res.json(data)
    } catch (err){
        next(err)
    }
})
router.get("/:id", checkCarId, async (req, res, next) => {
    try {
      const data = await Cars.getById(req.params.id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  });
  router.post(
    "/",
    checkCarPayload,
    checkVinNumberUnique,checkVinNumberValid,
    async (req, res, next) => {
      try {
        const data = await Cars.create(req.body);
        res.status(201).json(data);
      } catch (err) {
        next(err);
      }
      // DO YOUR MAGIC
    }
  );
module.exports = router;