class Project {
    constructor(title, description, technologies) {
        this.title = title;
        this.description = description;
        this.technologies = technologies;
    }

    create() {
        // Logic to create a new project entry in the database
    }

    read() {
        // Logic to read project details from the database
    }

    update(updatedData) {
        // Logic to update project details in the database
    }

    delete() {
        // Logic to delete the project entry from the database
    }
}

module.exports = Project;