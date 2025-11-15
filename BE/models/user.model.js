const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// For initial setup, we define a simple Course schema.
const Course = new Schema({
  courseId: { type: ObjectId },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // duration in hours
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Course', Course);