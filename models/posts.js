const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then((res) => console.log("connection successFul"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationdemo");
}

const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: "String",
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//   let user = await User.findOne({ username: "rahulkumar" });
//   let post2 = new Post({
//     content: "Bye Bye",
//     likes: 5,
//   });
//   post2.user = user;
//   await post2
//     .save()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };

// addData();

const getData = async () => {
  let res = await Post.find({}).populate("user", "username");
  console.log(res);
};
getData();
