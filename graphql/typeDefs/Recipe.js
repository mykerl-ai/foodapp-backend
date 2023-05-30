const Recipe = `
    type Recipe {
        results: [JSON]
        offset: Int
        number: Int
        totalResults: Int
    }

    type SavedRecipe {
        _id: ID
        user: ID
        recipe: JSON
        saved: Boolean
        success: Boolean
        createdAt: DateTime
        updatedAt: DateTime
    
    }

    type UserRecipe {
        _id: ID
        user: ID
        recipe: JSON
        saved: Boolean
        createdAt: DateTime
        updatedAt: DateTime
    }

    enum DietEnum {
        select
        Gluten_Free
        Ketogenic
        Vegetarian
        Lacto_Vegetarian
        Ovo_Vegetarian
        Pescetarian
        Paleo
        Primal
        Low_FODMAP
        Whole30
    }

    input DietInput {
        query: String!
        instructionsRequired: Boolean!
        addRecipeInformation: Boolean!
        diet: DietEnum
    }

    input RecipeInput {
        userId: ID!
        recipeId: Int

    }

    type Query {
        ListRecipes(DietInput: DietInput!): Recipe!
        GetUserRecipes(userId: ID): [UserRecipe!]!
    }

    type Mutation {
        SaveRecipe(RecipeInput: RecipeInput!): SavedRecipe

    }
`;
module.exports = Recipe;
