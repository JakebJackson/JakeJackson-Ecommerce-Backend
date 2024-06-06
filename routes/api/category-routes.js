const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories and return products in each.
  Category.findAll({
    include: [Product],
  })
    // return categories
    .then((categories) => res.json(categories))
    // in case of error return status500 and the error
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // get method for finding a single category, returns products in specified category.
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  // create method for a new category
  Category.create(req.body)
    // return status ok and the newly created category.
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update method for changing existing category.
  Category.update(req.body, {
    // find specified category
    where: {
      id: req.params.id,
    },
  })
    // return status ok and updated category.
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete method for category by id.
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
