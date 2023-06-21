'use strict';

const express = require('express');
const router = express.Router();

// const { v4: uuidv4 } = require("uuid");

const { departmentCollection } = require('../models/index');

router.get('/department', getDepartment);
router.get('/department/:id', getOneDepartment);
router.post('/department', createDepartment);
router.put('/department/:id', updateDepartment);
router.delete('/department/:id', deleteDepartment);

async function getDepartment(req, res) {
  const department = await departmentCollection.read();
  res.status(200).json(department);
}

async function getOneDepartment(req, res) {
  const id = req.params.id;
  
  const department = await departmentCollection.read(id);
  res.status(200).json(department);
}

async function createDepartment(req, res) {
    const obj = req.body;
    // const generatedId = uuidv4();
    // obj.generatedId = generatedId;
    const department = await departmentCollection.create(obj);
    res.status(201).json(department);
}

async function updateDepartment(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const department = await departmentCollection.update(id, obj);
  res.status(202).json(department);

}

async function deleteDepartment(req, res) {
  const id = req.params.id;
  const department = await departmentCollection.delete(id);
  res.status(204).json(department);
}

module.exports = router;