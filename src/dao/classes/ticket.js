const ticketModel = require("../models/ticket.model.js");

class Ticket {
  constructor() {
  } 

  createTicket = async (data) => {
    try {
      const newTicket = await ticketModel.create(data);
      return newTicket;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = Ticket;