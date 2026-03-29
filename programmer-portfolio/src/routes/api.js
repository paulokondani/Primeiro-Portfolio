const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new project
router.post('/projects', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a project
router.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.technologies = req.body.technologies || project.technologies;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a project
router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.remove();
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;