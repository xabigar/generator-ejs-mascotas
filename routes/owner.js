const express = require('express');
const router = express.Router();
const { owners, pets } = require('../data');

// GET /owner/:id: un dueño con sus mascotas
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const owner = owners.find(o => o.id === id);
  if (!owner) return next(); // sin dueño -> 404
  const ownerPets = pets.filter(p => p.ownerId === id);
  res.render('owner', { owner, ownerPets });
});

module.exports = router;
