const axios = require("axios");

const diets = {
  Gluten_Free: "Gluten Free",
  Ketogenic: "Ketogenic",
  Vegetarian: "Vegetarian",
  Lacto_Vegetarian: "Lacto-Vegetarian",
  Ovo_Vegetarian: "Ovo-Vegetarian",
  Pescetarian: "Pescetarian",
  Paleo: "Paleo",
  Primal: "Primal",
  Low_FODMAP: "Low FODMAP",
  Whole30: "Whole30",
};

const fetchRecipes = async ({
  query,
  instructionsRequired,
  addRecipeInformation,
  diet,
}) => {
  const params = {
    query,
    instructionsRequired,
    addRecipeInformation,
    diet: diet && diet.length && diet != "select" ? diets[diet] : null,
    apiKey: process.env.API_KEY,
  };
  if (!params.diet) {
    delete params["diet"];
  }
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/complexSearch",
    params,
    headers: {
      "Content-Type": "application/json",
      // "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      // "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchRecipeById = async (id) => {
  const params = { includeNutrition: true, apiKey: process.env.API_KEY };

  const options = {
    method: "GET",
    url: `https://api.spoonacular.com/recipes/${id}/information`,
    params,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response, "RECI");

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchRecipes, fetchRecipeById };
