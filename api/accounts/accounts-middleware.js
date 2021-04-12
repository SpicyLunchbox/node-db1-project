const Accounts = require('./accounts-model.js');

const checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  if(!name || !budget){
    res.status(400).json({message:"name and budget are required"})
  }else
  if(typeof name != 'string'){
    res.status(400).json({message:"name of account must be a string"})
  }else
  if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({message:"name of account must be between 3 and 100"})
  }else
  if(typeof budget != 'number'){
    res.status(400).json({message:"budget of account must be a number"})
  }else
  if(budget < 0 || budget > 1000000){
    res.status(400).json({message:"budget of account is too large or too small"})
  }else{next()} 
}

const checkAccountNameUnique = (req, res, next) => {
  const {name} = req.body
  const trimmedName = name.trim()
  Accounts.getByName(trimmedName)
          .then(account => {
            if(!account){
              next()
            }else{
              res.status(400).json({message:"that name is taken"})
            }
          })
}

const checkAccountId = (req, res, next) => {
 const id = req.params.id
 Accounts.getById(id)
        .then(account => {
          if(!account){
            res.status(404).json({message:"account not found"})
          }else{next()}
        })
        .catch(err => {
          res.status(500).json(err)
        })
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}





// Write the following middlewares inside api/accounts/accounts-middleware.js:

// checkAccountPayload returns a status 400 with if req.body is invalid:

// If either name or budget are undefined, return { message: "name and budget are required" }
// If name is not a string, return { message: "name of account must be a string" }
// If the trimmed name is shorter than 3 or longer than 100, return { message: "name of account must be between 3 and 100" }
// If budget is not a number, return { message: "budget of account must be a number" }
// If budget is a negative number or over one million, return { message: "budget of account is too large or too small" }
// checkAccountId returns a status 404 with a { message: "account not found" } if req.params.id does not exist in the database

// checkAccountNameUnique returns a status 400 with a { message: "that name is taken" } if the trimmed req.body.name already exists in the database