import mongoose from "mongoose";
import { getCurrentYear } from "../helpers/getCurrentYear.js";

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["active", "irregular", "inactive"],
    default: "active",
    required: true,
  },
  group: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
  dateOfBirth: {
    type: Date,
    default: new Date("01/01/1914"),
  },
  dateInmersed: {
    type: Date,
    default: new Date("01/01/1914"),
  },
  gender: {
    type: String,
    enum: ["Masculino", "Femenino"],
    required: true,
  },
  hope: {
    type: String,
    enum: ["Otras ovejas", "Ungido"],
    required: true,
  },
  elder: { type: Boolean, default: false },
  ministerialServant: { type: Boolean, default: false },
  regularPionner: { type: Boolean, default: false },
  activityMonth: [
    {
      serviceYear: {
        type: String,
        required: true,
        default: getCurrentYear,
      },
      month: {
        type: String,
        enum: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      },
      placements: {
        type: Number,
        default: 0,
      },
      videoShowings: {
        type: Number,
        default: 0,
      },
      hours: {
        type: Number,
        required: true,
        default: 0,
      },
      returnVisits: {
        type: Number,
        default: 0,
      },

      bibleStudies: {
        type: Number,
        default: 0,
      },
      remarks: {
        type: String,
        default: "",
      },
    },
  ],
});

const Publisher = mongoose.model("Publisher", publisherSchema);

export default Publisher;
