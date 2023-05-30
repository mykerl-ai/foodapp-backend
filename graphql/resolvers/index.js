const usersResolvers = require("./user");
const recipeResolvers = require("./recipe");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...recipeResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...recipeResolvers.Mutation,
  },
};
