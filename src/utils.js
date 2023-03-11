const typeorm = require("typeorm");
const WildersEntity = require("./entity/WildersEntity");
const SkillsEntity = require("./entity/SkillsEntity");

module.exports = {
  dataSource:new typeorm.DataSource({
    type: "sqlite",
    database: "wildersdb.sqlite",
    synchronize: true,
    entities: [WildersEntity, SkillsEntity]
  })
};