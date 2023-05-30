const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const recipeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    recipe: { type: JSON, required: true },
    saved: { type: Boolean },
    // diet: { type: String, required: true },
    // results: { type: Array, required: true },

    // offset: { type: Int },
    // number: { type: Int },
    // totalResults: { type: Int },
  },
  opts
);

const Recipe = model("Recipe", recipeSchema);

const exportVariables = {
  Recipe,
};

module.exports = exportVariables;
