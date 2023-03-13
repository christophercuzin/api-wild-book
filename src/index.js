const express = require("express");
const cors = require("cors")
const { dataSource } = require("./utils")

const WildersController = require("./controller/WildersController")
const SkillsController = require("./controller/SkillsController")
const GradesController = require("./controller/GradesController")



const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/api/wilder", WildersController.create);
app.post("/api/wilder/:wilderId/skill/:skillId/add", WildersController.addSkill);
app.get("/api/wilder", WildersController.read);
app.put("/api/wilder/:id/update", WildersController.update);
app.delete("/api/wilder/:id/delete", WildersController.delete);
app.delete(
  "/api/wilder/:wilderId/skill/:skillId/delete",
  WildersController.deleteSkill
);

app.post("/api/skill", SkillsController.create);
app.get("/api/skill", SkillsController.read);
app.put("/api/skill/:id/update", SkillsController.update);
app.delete("/api/skill/:id/delete", SkillsController.delete);

app.post("/api/wilder/:wilderId/skill/:skillId/grade", GradesController.create);
app.get("/api/wilder/:wilderId/skill/:skillId/grade", GradesController.read);
app.put("/api/grade/:id/update", GradesController.update);
app.delete("/api/grade/:id/delete", GradesController.delete);

const start = async () => {
  await dataSource.initialize()
  app.listen(5000, () => console.log("Server started on 5000"))
}

start()