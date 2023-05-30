const GraphQLDate = require("graphql-date");
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

const typeDefs = `
    scalar DateTime
    scalar JSON
    scalar JSONObject
`;

const resolvers = {
  DateTime: GraphQLDate,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

module.exports = { typeDefs, resolvers };
