const express = require("express");
const { dataSource } = require("./utils")
const WildersController = require("./controller/WildersController")
const SkillsController = require("./controller/SkillsController")



const app = express()
app.use(express.json())

app.post("/api/wilder", WildersController.create);
app.post("/api/wilder/:wilderId/skill/:skillId", WildersController.addSkill);
app.get("/api/wilder", WildersController.read);
app.put("/api/wilder/:id/update", WildersController.update);
app.delete("/api/wilder/:id/delete", WildersController.delete);

app.post("/api/skill", SkillsController.create);
app.get("/api/skill", SkillsController.read);
app.put("/api/skill/:id/update", SkillsController.update);
app.delete("/api/skill/:id/delete", SkillsController.delete);

const start = async () => {
  await dataSource.initialize()
  app.listen(5000, () => console.log("Server started on 5000"))
}

start()