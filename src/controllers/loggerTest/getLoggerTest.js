const getLoggerTest = (req, res) => {
  req.logger.error(`soy un log error`);
  req.logger.warn(`soy un log warn`);
  req.logger.info(`soy un log info`);
  req.logger.http(`soy un log http`);
  req.logger.debug(`soy un log debug`);
  req.logger.verbose(`soy un log verbose`);

  res.status(200).send({ status: "success", payload: "Logger Test" });
}

module.exports = getLoggerTest
