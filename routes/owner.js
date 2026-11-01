const express = require('express');
const router = express.Router();
const { owners, pets } = require('../data');

// Router anidado: expone :ownerId del router padre gracias a mergeParams
const petsRouter = express.Router({ mergeParams: true });

// GET /owner/:ownerId/pets: mascotas de un dueño concreto
petsRouter.get('/', (req, res, next) => {
  const ownerId = Number(req.params.ownerId); // llega por mergeParams
  const owner = owners.find(o => o.id === ownerId);
  if (!owner) return next(); // sin dueño -> 404
  const ownerPets = pets.filter(p => p.ownerId === ownerId);
  res.render('pet', { owner, ownerPets });
});

// GET /owner/:id: un dueño con sus mascotas
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const owner = owners.find(o => o.id === id);
  if (!owner) return next(); // sin dueño -> 404
  const ownerPets = pets.filter(p => p.ownerId === id);
  res.render('owner', { owner, ownerPets });
});

router.use('/:ownerId/pets', petsRouter);

module.exports = router;
