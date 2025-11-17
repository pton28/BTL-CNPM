const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// For initial setup, we define a simple Course schema.
const sessionSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    required: true
  },
  date: {
    type: String, // yyyy-mm-dd
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  room: {
    type: String
  },
  type: {
    type: String,
    enum: ["online", "offline"],
    default: "offline"
  }
});

// Week: 1 tuần của khóa học
const weekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true
  },
  sessions: {
    type: [sessionSchema],
    default: []
  }
});

// Course: khóa học chứa nhiều tuần
const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  tutorId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  weeks: {
    type: [weekSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
export default mongoose.model('Course', Course);