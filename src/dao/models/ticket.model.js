const mongoose = require("mongoose");

const ticketColleccion = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true, index: true }
},
{
  timestamps: {purchase_datetime: "created_at" }
});

const ticketModel = mongoose.model(ticketColleccion, ticketSchema);

module.exports = ticketModel;