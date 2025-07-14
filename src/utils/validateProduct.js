// utils/validateProduct.js
import validator from "validator";

export function validateProduct({ name, description, price, imageUrl }) {
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Name is required.");
  }
  if (!description || description.trim() === "") {
    errors.push("Description is required.");
  }
  if (!price || isNaN(price) || Number(price) <= 0) {
    errors.push("Price must be a positive number.");
  }
  if (!imageUrl || !validator.isURL(imageUrl)) {
    errors.push("Image URL is not valid.");
  }

  return errors;
}
