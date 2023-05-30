if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("apollo-server");
const { User } = require("./models/User");
const { GraphQLError } = require("graphql");

// const { parse } = require("graphql");
// const { gql } = require("graphql-tag");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB = "mongodb+srv://anoruemichael:193619@chow.keuzfbd.mongodb.net/";

const exemptedOperations = ["RegisterUser", "LoginUser", "IntrospectionQuery"];

// Define your middleware function to handle authentication
const context = async ({ req }) => {
  // Get the user token from the headers
  try {
    const bearerHeader = req.headers.authorization || "";
    let token;

    const parts = bearerHeader.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
        //verify token
        jwt.verify(credentials, process.env.TOKEN_KEY, (err, decoded) => {
          if (err) {
            // Token verification failed
            // console.error(err);
            throw new GraphQLError("A token is required for authentication", {
              extensions: {
                code: "INVALID TOKEN",
                http: { status: 403 },
              },
            });
          } else {
            // Token is valid
            // console.log(decoded);
            console.log("Token Valid");
          }
        });
      }
    } else if (
      parts.length !== 2 &&
      !exemptedOperations.includes(req.body.operationName)
    ) {
      throw new GraphQLError("A token is required for authentication", {
        extensions: {
          code: "INVALID TOKEN",
          http: { status: 403 },
        },
      });
    }

    if (parts.length && !exemptedOperations.includes(req.body.operationName)) {
      // Retrieve the user from the database based on the token
      const user = await User.findOne({ token });

      if (!user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      // console.log(user);
      // Return the user in the context
      return { user };
    }
  } catch (e) {
    return e;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  });
