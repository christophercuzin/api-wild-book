const dataSource = require("../utils").dataSource;
const WildersEntity = require("../entity/WildersEntity");
const SkillsEntity = require("../entity/SkillsEntity");

class WildersController {
  static async create(req, res) {
    try {
      await dataSource.getRepository(WildersEntity).save(req.body);
      res.send("wilder created")
    } catch (error) {
      if(error.errno == 19) {
        res.status(409).send("email: this value is already used")
      } else {
        res.status(400).send("Bad request")
      }
    }
  }

  static async read(req, res) {
    try {
      const wilders = await dataSource.getRepository(WildersEntity).find();
      res.send(wilders)
    } catch (error) {
      res.status(404).send("Wilders not found")
    }
  }

  static async update(req, res) {
    try {
      const wilder = await dataSource.getRepository(WildersEntity).findOneBy({
        id: req.params.id
      })

      if(!wilder) {
        return res.status(404).send("Wilder not found")
      }
      
      await dataSource.getRepository(WildersEntity).update(req.params.id, req.body);
      res.send("Wilder updated")
    } catch (error) {
      res.status(400).send("Bad request")
    }
  }

  static async delete(req, res) {
    try {
      const wilder = await dataSource.getRepository(WildersEntity).findOneBy({
        id: req.params.id
      })

      if(!wilder) {
        return res.status(404).send("Wilder not found")
      }
      
      await dataSource.getRepository(WildersEntity).delete(req.params.id);
      res.send("Wilder deleted")
    } catch (error) {
      res.status(400).send("Bad request")
    }
  }

  static async addSkill(req, res) {
    try {
      const wilder = await dataSource.getRepository(WildersEntity).findOneBy({
        id: req.params.wilderId
      })

      if(!wilder) {
        return res.status(404).send("Wilder not found")
      }
      const skillToAdd = await dataSource.getRepository(SkillsEntity).findOneBy({
        id: req.params.skillId
      })

      if(!skillToAdd) {
        return res.status(404).send("Skill not found")
      }
      wilder.skills.map((skill) => {
        if(skill.id === skillToAdd.id) {
          return res.status(409).send("This skill has already been added to this wilder")
        }
      })
      
      wilder.skills = [...wilder.skills, skillToAdd]
      await dataSource.getRepository(WildersEntity).save(wilder);
      res.send(wilder.skills)
    } catch (error) {
      res.status(400).send(error)
    }
  }
};

module.exports = WildersController;