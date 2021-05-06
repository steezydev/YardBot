module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.FLOAT
    },
    telegramLink: {
      type: Sequelize.STRING
    },
    telegramId: {
      type: Sequelize.INTEGER
    },
    invitedId: {
      type: Sequelize.INTEGER
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    userRank: {
      type: Sequelize.INTEGER
    },
    dateRegister: {
      type: Sequelize.DATE
    },
    accepted: {
      type: Sequelize.INTEGER
    },
    blocked: {
      type: Sequelize.INTEGER
    }
  })

  return User
}
