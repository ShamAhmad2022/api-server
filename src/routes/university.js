'use strict';

const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const { universityCollection, departmentCollection } = require('../models/index');

router.get('/university', getUniversity);
router.get('/university/:id', getOneUniversity);
router.post('/university', createUniversity);
router.put('/university/:id', updateUniversity);
router.delete('/university/:id', deleteUniversity);
router.get('/universitydepartments/:id', universityDepartments);

async function getUniversity(req, res) {
  const university = await universityCollection.read();
  res.status(200).json(university);
}

async function getOneUniversity(req, res) {
  const id = req.params.id;
  
  const university = await universityCollection.read(id);
  res.status(200).json(university);
}

async function createUniversity(req, res) {
    const obj = req.body;
    const generatedId = uuidv4();
    obj.generatedId = generatedId;
    const university = await universityCollection.create(obj);
    res.status(201).json(university);
}

async function updateUniversity(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const university = await universityCollection.update(id, obj);
  res.status(202).json(university);

}

async function deleteUniversity(req, res) {
  const id = req.params.id;
  const university = await universityCollection.delete(id);
  res.status(204).json(university);
}

async function universityDepartments(req, res) {
    const id = req.params.id;
    const university = await universityCollection.readUniversityDepartments(id, departmentCollection.model);
    res.status(200).json(university)
}

module.exports = router;