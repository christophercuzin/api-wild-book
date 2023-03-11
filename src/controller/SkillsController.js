const dataSource = require("../utils").dataSource;
const SkillsEntity = require("../entity/SkillsEntity");

class SkillsController {
  static async create(req, res) {
    try {
      await dataSource.getRepository(SkillsEntity).save(req.body);
      res.send("Skill created")
    } catch (error) {
      if(error.errno == 19) {
        res.status(409).send("This skill already exists")
      } else {
        res.status(400).send("Bad request")
      }
    }
  }

  static async read(req, res) {
    try {
      const Skills = await dataSource.getRepository(SkillsEntity).find();
      res.send(Skills)
    } catch (error) {
      res.status(404).send("Skills not found")
    }
  }

  static async update(req, res) {
    try {
      const skill = await dataSource.getRepository(SkillsEntity).findOneBy({
        id: req.params.id
      })

      if(!skill) {
        return res.status(404).send("Skill not found")
      }
      
      await dataSource.getRepository(SkillsEntity).update(req.params.id, req.body);
      res.send("Skill updated")
    } catch (error) {
      if(error.errno == 19) {
        res.status(409).send("This skill already exists")
      } else {
        res.status(400).send("Bad request")
      }
    }
  }

  static async delete(req, res) {
    try {
      const skill = await dataSource.getRepository(SkillsEntity).findOneBy({
        id: req.params.id
      })

      if(!skill) {
        return res.status(404).send("Skill not found")
      }
      
      await dataSource.getRepository(SkillsEntity).delete(req.params.id);
      res.send("Skill deleted")
    } catch (error) {
      res.status(400).send("Bad request")
    }
  }
};

module.exports = SkillsController;