const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema(
  {
    name: {
      type: String,
    },
    datebirth: {
      type: String,
    },
    fathername: {
      type: String,
    },
    mothername: {
      type: String,
    },
    grade: {
      type: String,
    },
    section: {
      type: String,
    },
    dateadmission: {
      type: String,
    },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("Student", Student);
