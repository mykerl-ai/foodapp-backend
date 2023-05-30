const { ApolloError } = require("apollo-server-errors");
const { User } = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  // registerInput: {
  //   username: "",
  //   email: "",
  //   password: "",
  // },
  Query: {},
  Mutation: {
    async RegisterUser(_, { RegisterInput: { username, email, password } }) {
      try {
        const existing = await User.findOne({ email });
        if (existing) {
          throw new ApolloError(
            "A user is already registrated with this email",
            "USER_ALREADY_EXIST"
          );
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: hashPassword,
        });

        //create our jwt(attached to our User model)
        // console.log(process.env.TOKEN_KEY);

        const token = jwt.sign(
          { user_id: newUser._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        newUser.token = token;

        const res = await newUser.save();
        console.log(res);

        return {
          ...res._doc,
        };
      } catch (e) {
        console.log(e);
        return e;
      }
      //check for existing user with email
    },

    async LoginUser(_, { LoginInput: { username, email, password } }) {
      try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        console.log(user);

        if (!user) {
          throw new ApolloError("User not found", "USER_NOT_FOUND");
        }
        const bool = await bcrypt.compare(password, user.password);
        if (!bool) {
          throw new ApolloError(
            "Incorrect email or password",
            "INVALID_CREDENTIALS"
          );
        }
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        user.token = token;

        const res = await user.save();
        return {
          ...res._doc,
        };
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
