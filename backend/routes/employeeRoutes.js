const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/employees', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

router.get('/employees/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
});

router.put('/employees/:id', async (req, res) => {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete('/employees/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
});

router.get('/search', async (req, res) => {
    const { department, position } = req.query;
    const employees = await Employee.find({ department, position });
    res.json(employees);
});

module.exports = router;
