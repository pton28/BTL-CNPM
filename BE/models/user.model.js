const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  userId: { type: ObjectId },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', User);