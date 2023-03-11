const { EntitySchema } = require("typeorm")

module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text"
    },
    email: {
      type: "text",
      unique: true
    },
    city: {
      type: "text"
    }
  },
  relations: {
    skills: {
      target: "Skill",
      type: "many-to-many",
      joinTable: true,
      eager: true
    }
  }
})
