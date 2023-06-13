import mongoose from "mongoose";

const publisherRecordSchema = new mongoose.Schema({
  serviceYear: Number,
  month: {
    type: String,
    enum: ["enero", "febrero", "marzo"],
  },
  placements: Number,
  videoShowings: Number,
  hours: {
    type: Number,
    required: true,
  },
  returnVisits: Number,
  bibleStudies: Number,
  remarks: String,
});

const PublisherRecord = mongoose.model(
  "PublisherRecord",
  publisherRecordSchema
);

export default PublisherRecord;
