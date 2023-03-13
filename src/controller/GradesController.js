const dataSource = require("../utils").dataSource;
const GradesEntity = require("../entity/GradesEntity");
const WildersEntity = require("../entity/WildersEntity");
const SkillsEntity = require("../entity/SkillsEntity");

class GradesController {
  static async create(req, res) {
    const { rate } = req.body
    const { wilderId, skillId } = req.params

    const wilder = await dataSource.getRepository(WildersEntity).findOneBy({
      id: wilderId
    });

    if(!wilder) {
      return res.status(404).send("Wilder not found")
    };

    const skill = ()=> {
      for (const wilderSkill of wilder.skills) {
        if(wilderSkill.id == skillId) {
          return wilderSkill
        }
      }
    }

    if(!skill()) {
      return res.status(404).send("Wilder's skill not found")
    }
    
    try {
      await dataSource.getRepository(GradesEntity).save({
        rate,
        wilder,
        skill: skill()
      });
      res.send("Rate created")
    } catch (error) {
      res.status(400).send("Bad request")
    };
  };

  static async read(req, res) {
    const { wilderId, skillId } = req.params

    const wilder = await dataSource.getRepository(WildersEntity).findOneBy({
      id: wilderId
    });

    if(!wilder) {
      return res.status(404).send("Wilder not found")
    };

    const skill = await dataSource.getRepository(SkillsEntity).findOneBy({
      id: skillId
    });

    if(!skill) {
      return res.status(404).send("Wilder not found")
    };
    try {
      const rates = await dataSource.getRepository(GradesEntity).average(
        "rate", 
        { wilder, skill}
      );
      
      res.send(Math.round(rates).toString())
    } catch (error) {
      res.status(404).send(error)
    }
  }

  static async update(req, res) {
    try {
      const rate = await dataSource.getRepository(GradesEntity).findOneBy({
        id: req.params.id
      })

      if(!rate) {
        return res.status(404).send("Rate not found")
      }
      
      await dataSource.getRepository(GradesEntity).update(req.params.id, req.body);
      res.send("rate updated")
    } catch (error) {
      res.status(400).send("Bad request")
    }
  };

  static async delete(req, res) {
    try {
      const rate = await dataSource.getRepository(GradesEntity).findOneBy({
        id: req.params.id
      })

      if(!rate) {
        return res.status(404).send("Rate not found")
      }
      
      await dataSource.getRepository(GradesEntity).delete(req.params.id);
      res.send("rate deleted")
    } catch (error) {
      res.status(400).send("Bad request")
    }
  };
};

module.exports = GradesController;