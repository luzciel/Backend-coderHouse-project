const generateUniqueTicketNumber = () => {
  const currentDateTime = new Date();
  const unixTimestamp = Math.floor(currentDateTime.getTime() / 1000); 
  const unixTimestampString = unixTimestamp.toString();

  let randomNumbers = Math.floor(1000 + Math.random() * 9000);

  const ticketNumber = unixTimestampString + randomNumbers;
  return ticketNumber;
}

module.exports = {
  generateUniqueTicketNumber  
}