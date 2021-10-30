const express = require('express');
const { getAllOrchids, addOrchid, getOrchid, updateOrchid, deleteOrchid} = require('../controllers/orchidController')

const { getAllOrchids, getOrchid} = require('../controllers/orchidController')
const router = express.Router();

router.post('/orchids', addOrchid)
router.get('/orchids', getAllOrchids);
router.get('/orchids/:id', getOrchid);
router.put('/orchids/:id', updateOrchid);
router.delete('/orchids/:id', deleteOrchid);

module.exports = {
    routes: router
}
