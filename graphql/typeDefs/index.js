// import _ from "lodash";
const _ = require("lodash");

const Auth = require("./Auth");
const Recipe = require("./Recipe");
const Scalars = require("./Scalars");

const Root = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

module.exports = typeDefs = [Root, Scalars.typeDefs, Auth, Recipe];
