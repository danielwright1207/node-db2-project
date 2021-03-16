const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

exports.checkCarId = async (req, res, next) => {
  try {
    const cars = await Cars.getById(req.params.id);
    if (!cars) {
      res.status(404).json({ message: "car with id <car id> is not found" });
    } else {
      req.cars = cars;
      next();
    }
  } catch (err) {
    next(err);
  }  // DO YOUR MAGIC
}

exports.checkCarPayload = async (req, res, next) => {
  try{
    if(!req.body.vin){
      res.status(400).json({ message: "vin is missing" })
    } else if(!req.body.make){
      res.status(400).json({ message: "make is missing" })
    } else if(!req.body.model){
      res.status(400).json({ message: "model is missing" })
    } else if(!req.body.mileage){
      res.status(400).json({ message: "mileage is missing" })
    } else {
      next()
    }
  } catch(err){
    next(err)
  } // DO YOUR MAGIC
}

exports.checkVinNumberValid = async (req, res, next) => {
  try{
    const isVinValid = vinValidator.validate(req.body.vin)

    if(!isVinValid){
      res.status(400).json({message:`vin ${req.body.vin} is invalid`})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  try{
    const existingVin = await Cars.getAll()
    const result = existingVin.filter(car => {
      if(car.vin === req.body.vin){
        return car
      }
    })
    if(result.length > 0){
      res.status(400).json({ message:`vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  } catch(err){
    next(err)
  }
}
