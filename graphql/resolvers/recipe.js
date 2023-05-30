const { fetchRecipes, fetchRecipeById } = require("../../utils/fetch");
const { ApolloError } = require("apollo-server-errors");

// const fetchRecipeById = require("../../utils/fetch");
const { User } = require("../../models/User");
const { Recipe } = require("../../models/Recipe");

module.exports = {
  Query: {
    async ListRecipes(
      _,
      { DietInput: { query, instructionsRequired, addRecipeInformation, diet } }
    ) {
      const data = await fetchRecipes({
        query,
        instructionsRequired,
        addRecipeInformation,
        diet,
      });
      console.log(data);

      return { ...data };
    },

    async GetUserRecipes(_, { userId }) {
      try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
          throw new ApolloError("User not found", "USER_NOT_FOUND");
        }
        const foundRecipe = await Recipe.find({ user: user._id });

        return foundRecipe;
      } catch (e) {
        console.log(e);
      }
    },
  },

  Mutation: {
    async SaveRecipe(_, { RecipeInput: { userId, recipeId } }) {
      try {
        console.log("HERE");

        const user = await User.findOne({ _id: userId });
        // console.log(user, "USER");
        if (user) {
          const data = await fetchRecipeById(recipeId);
          // console.log(data, "DATS");

          const newRecipe = new Recipe({
            recipe: data,
            user: user._id,
            saved: true,
          });

          const res = await newRecipe.save();
          // console.log(res._id, "NEW RECIPE");

          return { ...newRecipe._doc, success: true };
        } else {
          throw new ApolloError("User not found", "USER_NOT_FOUND");
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
