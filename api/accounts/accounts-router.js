const Accounts = require('./accounts-model.js');
const mw = require('./accounts-middleware.js');
const router = require('express').Router()

router.get('/', (req, res, next) => {
Accounts.getAll()
        .then(accounts => {
          res.status(200).json(accounts)
        })
        .catch(err => {
          next(err)
        })
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
          .then(account => {
            res.status(200).json(account)
          })
          .catch(err => {
            next(err)
          })
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
          .then(account => {
            res.status(201).json(account)
          })
          .catch(err => {
            next(err)
          })
})

router.put('/:id', mw.checkAccountId, mw.checkAccountNameUnique, mw.checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
          .then(account => {
            res.status(201).json(account)
          })
          .catch(err => {
            next(err)
          })
});

router.delete('/:id', mw.checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
          .then(account => {
            res.status(201).json(account)
          })
          .catch(err => {
            next(err)
          })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;

// [GET] /api/accounts returns an array of accounts (or an empty array if there aren't any).
// [GET] /api/accounts/:id returns an account by the given id.
// [POST] /api/accounts returns the created account. Leading or trailing whitespace on budget name should be trimmed before saving to db.
// [PUT] /api/accounts/:id returns the updated account. Leading or trailing whitespace on budget name should be trimmed before saving to db.
// [DELETE] /api/accounts/:id returns the deleted account.
