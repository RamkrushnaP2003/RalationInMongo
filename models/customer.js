const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then((res) => console.log("connection successFul"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationdemo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerShema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerShema);

// const addCustomer = async () => {
//   let customer1 = new Customer({
//     name: "Rahul kumar",
//   });
//   let order1 = await Order.findOne({ item: "Potato Chips" });
//   let order2 = await Order.findOne({ item: "Chocolate" });

//   customer1.orders.push(order1);
//   customer1.orders.push(order2);

//   await customer1
//     .save()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };
// addCustomer();

const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};
findCustomer();
// const addOrders = async () => {
//   await Order.insertMany([
//     { item: "Samosa", price: 12 },
//     { item: "Potato Chips", price: 10 },
//     { item: "Chocolate", price: 40 },
//   ])
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };

// addOrders();
