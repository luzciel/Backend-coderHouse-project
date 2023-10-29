class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = async (data) => {
    let result = await this.dao.createTicket(data);
    return result;
  }
}

module.exports = ticketRepository;