const express = require('express');
const router = express.Router();
const Incident = require('../models/incident');
const { validateIncident } = require('../utils/validation');



//see all incidents..

router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// add a new 
router.post('/', async (req, res) => {
  try {
    
    //validation.
    const validationResult = validateIncident(req.body);
    
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }
    
    const { title, description, severity } = req.body;
    
    const newIncident = new Incident({
      title,
      description,
      severity,
    });
    
    const savedIncident = await newIncident.save();
    res.status(201).json(savedIncident);
  } 
  catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// see specfic incident
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    res.status(200).json(incident);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// delete.

router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    await Incident.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Incident deleted successfully' });
  } 
  catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;