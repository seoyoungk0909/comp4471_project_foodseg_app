import React, { useState } from "react";
import "../styles/ResultsPage.css"; // Ensure this CSS file handles responsive styling

function ResultsPage({ result }) {
  const backendUrl = "http://localhost:5000"; // Replace with your backend URL
  const originalImageUrl = result?.original_image_url
    ? `${backendUrl}${result.original_image_url}`
    : null;
  const labeledImageUrl = result?.labeled_image_url
    ? `${backendUrl}${result.labeled_image_url}`
    : null;
  const nutrition = result?.nutrition || [];

  // Define all available nutritional columns
  const allColumns = [
    "caloric value",
    "fat",
    "saturated fats",
    "monounsaturated fats",
    "polyunsaturated fats",
    "carbohydrates",
    "sugars",
    "protein",
    "dietary fiber",
    "cholesterol",
    "sodium",
    "water",
    "vitamin a",
    "vitamin b1",
    "vitamin b11",
    "vitamin b12",
    "vitamin b2",
    "vitamin b3",
    "vitamin b5",
    "vitamin b6",
    "vitamin c",
    "vitamin d",
    "vitamin e",
    "vitamin k",
    "calcium",
    "copper",
    "iron",
    "magnesium",
    "manganese",
    "phosphorus",
    "potassium",
    "selenium",
    "zinc",
    "nutrition density",
  ];

  // Column header mapping with units
  const columnMapping = {
    "caloric value": "Caloric Value (kcal)",
    fat: "Fat (g)",
    "saturated fats": "Saturated Fats (g)",
    "monounsaturated fats": "Monounsaturated Fats (g)",
    "polyunsaturated fats": "Polyunsaturated Fats (g)",
    carbohydrates: "Carbohydrates (g)",
    sugars: "Sugars (g)",
    protein: "Protein (g)",
    "dietary fiber": "Dietary Fiber (g)",
    cholesterol: "Cholesterol (mg)",
    sodium: "Sodium (g)",
    water: "Water (g)",
    "vitamin a": "Vitamin A (mg)",
    "vitamin b1": "Vitamin B1 (mg)",
    "vitamin b11": "Vitamin B11 (mg)",
    "vitamin b12": "Vitamin B12 (mg)",
    "vitamin b2": "Vitamin B2 (mg)",
    "vitamin b3": "Vitamin B3 (mg)",
    "vitamin b5": "Vitamin B5 (mg)",
    "vitamin b6": "Vitamin B6 (mg)",
    "vitamin c": "Vitamin C (mg)",
    "vitamin d": "Vitamin D (mg)",
    "vitamin e": "Vitamin E (mg)",
    "vitamin k": "Vitamin K (mg)",
    calcium: "Calcium (mg)",
    copper: "Copper (mg)",
    iron: "Iron (mg)",
    magnesium: "Magnesium (mg)",
    manganese: "Manganese (mg)",
    phosphorus: "Phosphorus (mg)",
    potassium: "Potassium (mg)",
    selenium: "Selenium (mg)",
    zinc: "Zinc (mg)",
    "nutrition density": "Nutrition Density",
  };

  // State to manage the visibility of the attribute selection panel
  const [showAttributeSelector, setShowAttributeSelector] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Define default visible columns
  const defaultVisible = [
    "caloric value",
    "fat",
    "saturated fats",
    "carbohydrates",
    "sugars",
    "protein",
    "cholesterol",
    "dietary fiber",
  ];

  // Initialize state for visible columns
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.reduce(
      (acc, col) => ({
        ...acc,
        [col]: defaultVisible.includes(col),
      }),
      {}
    )
  );

  // Handle checkbox toggle
  const handleCheckboxChange = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Toggle the visibility of the attribute selection panel
  const toggleAttributeSelector = () => {
    setShowAttributeSelector((prev) => !prev);
  };

  // Handle Select All button click
  const handleSelectAll = () => {
    setVisibleColumns((prev) =>
      allColumns.reduce(
        (acc, col) => ({
          ...acc,
          [col]: true,
        }),
        {}
      )
    );
  };

  // Handle Remove All button click
  const handleRemoveAll = () => {
    setVisibleColumns((prev) =>
      allColumns.reduce(
        (acc, col) => ({
          ...acc,
          [col]: false,
        }),
        {}
      )
    );
  };

  // Helper function to chunk an array into smaller arrays
  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  // Filter visible columns
  const selectedColumns = allColumns.filter((col) => visibleColumns[col]);

  // Determine the maximum number of columns per table
  const maxColsPerTable = 10; // Adjust this value as needed

  // Chunk the selected columns
  const columnChunks = chunkArray(selectedColumns, maxColsPerTable);

  const handleModalOpen = (column) => {
    const descriptions = {
      "caloric value": "Total energy provided by the food in kilocalories.",
      fat: "Total amount of fats in grams.",
      "saturated fats":
        "Amount of saturated fats (fats that typically raise the level of cholesterol in the blood) in grams.",
      "monounsaturated fats":
        "Amount of monounsaturated fats (considered heart-healthy fats) in grams.",
      "polyunsaturated fats":
        "Amount of polyunsaturated fats (include essential fats your body needs but can't produce itself) in grams.",
      carbohydrates: "Total carbohydrates in grams, including sugars.",
      sugars: "Total sugars in grams, a subset of carbohydrates.",
      protein: "Total proteins in grams, essential for body repair and growth.",
      "dietary fiber":
        "Fiber content in grams, important for digestive health.",
      cholesterol:
        "Cholesterol content in milligrams, pertinent for cardiovascular health.",
      sodium:
        "Sodium content in milligrams, crucial for fluid balance and nerve function.",
      water: "Water content in grams, which affects the food's energy density.",
      "vitamin a":
        "Amount of Vitamin A, important for vision and immune functioning.",
      "vitamin b1": "Essential for glucose metabolism.",
      "vitamin b11":
        "Crucial for cell function and tissue growth, particularly important in pregnancy.",
      "vitamin b12": "Important for brain function and blood formation.",
      "vitamin b2":
        "Necessary for energy production, cell function, and fat metabolism.",
      "vitamin b3": "Supports digestive system, skin, and nerves health.",
      "vitamin b5":
        "Necessary for making blood cells, and helps convert food into energy.",
      "vitamin b6":
        "Important for normal brain development and keeping the nervous and immune systems healthy.",
      "vitamin c": "Important for the repair of all body tissues.",
      "vitamin d":
        "Crucial for the absorption of calcium, promoting bone growth and health.",
      "vitamin e":
        "Acts as an antioxidant, helping to protect cells from the damage caused by free radicals.",
      "vitamin k": "Necessary for blood clotting and bone health.",
      calcium: "Vital for building and maintaining strong bones and teeth.",
      copper:
        "Helps with the formation of collagen, increases the absorption of iron and plays a role in energy production.",
      iron: "Essential for the creation of red blood cells.",
      magnesium:
        "Important for many processes in the body including regulation of muscle and nerve function, blood sugar levels, and blood pressure and making protein, bone, and DNA.",
      manganese:
        "Involved in the formation of bones, blood clotting factors, and enzymes that play a role in fat and carbohydrate metabolism, calcium absorption, and blood sugar regulation.",
      phosphorus:
        "Helps with the formation of bones and teeth and is necessary for the body to make protein for the growth, maintenance, and repair of cells and tissues.",
      potassium:
        "Helps regulate fluid balance, muscle contractions, and nerve signals.",
      selenium:
        "Important for reproduction, thyroid gland function, DNA production, and protecting the body from damage caused by free radicals and from infection.",
      zinc: "Necessary for the immune system to properly function and plays a role in cell division, cell growth, wound healing, and the breakdown of carbohydrates.",
      "nutrition density":
        "A metric indicating the nutrient richness of the food per calorie.",
    };

    setModalContent(descriptions[column]);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

  return (
    <div className="results-page" onClick={handleOutsideClick}>
      {result && <h2>Analysis Results</h2>}
      <div className="image-container">
        {originalImageUrl && (
          <div>
            <img src={originalImageUrl} alt="Original" />
            <div className="image-caption">Original Image</div>
          </div>
        )}
        {labeledImageUrl && (
          <div>
            <img src={labeledImageUrl} alt="Analyzed" />
            <div className="image-caption">Labeled Image</div>
          </div>
        )}
      </div>
      <div className="nutrition-section">
        <div className="nutrition-header">
          <h2>Nutritional Information Breakdown</h2>
          <div className="triangle-toggle" onClick={toggleAttributeSelector}>
            <div>Select Nutritional Attributes</div>
            <div
              className={`triangle ${showAttributeSelector ? "up" : "down"}`}
            ></div>
          </div>
        </div>

        <div className="nutritional-info-note">
          Nutritional information (per 100g) for each identified ingredient
        </div>

        {showAttributeSelector && (
          <div className="attribute-selector">
            <div className="selector-header">
              <strong>Select Nutritional Attributes to Display</strong>
              <div className="select-buttons">
                <button
                  className="attribute-reset-button"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <button
                  className="attribute-reset-button"
                  onClick={handleRemoveAll}
                >
                  Remove All
                </button>
              </div>
            </div>
            <div className="checkbox-group">
              {allColumns.map((col) => (
                <label key={col}>
                  <input
                    type="checkbox"
                    checked={visibleColumns[col]}
                    onChange={() => handleCheckboxChange(col)}
                  />
                  {col}
                </label>
              ))}
            </div>
          </div>
        )}

        {columnChunks.map((chunk, index) => (
          <table className="nutrition-table" key={index}>
            <thead>
              <tr>
                <th>Ingredient</th>
                {chunk.map((col) => (
                  <th key={col}>
                    {columnMapping[col] || col}{" "}
                    <button
                      className="info-btn"
                      onClick={() => handleModalOpen(col)}
                    >
                      ?
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nutrition.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.ingredient}</td>
                  {chunk.map((col) => (
                    <td key={col}>{item[col] || "N/A"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={handleModalClose}>
              X
            </button>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
