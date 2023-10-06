const express = require('express');
const router = express.Router();
const data = require('../data');
const projects = data.projects

// sets the home page route
router.get('/', (req, res) => {
  res.render('index', { projects: projects });
});

// sets the route for the about page
router.get('/about', (req, res) => {
  res.render('about');
});

// sets the route for the project which is referenced by its ID set in the data JSON
router.get('/project/:id', (req, res, next) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(project => project.id === projectId);
  if (project) {
    res.render('project', { project });
  } else {
    const error = new Error('That project is not found');
    error.status = 404;
    res.render('page-not-found');
  }
});

module.exports = router;