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
  addresses: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
  let user1 = new User({
    username: " sherlock homes",
    addresses: [
      {
        location: "221B baker street",
        city: "Londaon",
      },
    ],
  });
  user1.addresses.push({ location: "P32 wallstreet", city: "london" });
  await user1
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

addUser();
