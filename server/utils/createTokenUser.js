/* eslint-disable no-undef */

const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user.id,
    role: user.role,
    phone: user.phone,
  }
}

module.exports = { createTokenUser }
