const Artifact = require('./models/artifacts');

// Creating a new Artifact instance
let newArtifact = new Artifact({
    name: "Ancient Vase",
    origin: "Greece",
    age: 2500
});

// Save the instance to the database
newArtifact.save()
    .then(result => console.log("Artifact saved:", result))
    .catch(error => console.error("Error saving artifact:", error));
