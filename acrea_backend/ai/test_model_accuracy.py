import os
import sys
from price_predictor import PricePredictor
import pandas as pd
import numpy as np
from sklearn.model_selection import cross_val_score, KFold
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

def main():
    print("Testing Price Prediction Model Accuracy")
    print("=======================================")
    
    # Initialize the predictor (this will train the model if it doesn't exist)
    predictor = PricePredictor()
    
    # Get the data used for training
    data = [
            {"property_type": "Apartment", "square_feet": 1200, "city": "Kochi", "state": "Kerala", "beds": 3, "baths": 2, "amenities_count": 5, "age_of_property": 10, "floor_level": 4, "commercial_zone": 1, "gated_community": 1, "price": 7500000},
            {"property_type": "House", "square_feet": 2000, "city": "Thiruvananthapuram", "state": "Kerala", "beds": 4, "baths": 3, "amenities_count": 7, "age_of_property": 15, "floor_level": 0, "commercial_zone": 0, "gated_community": 1, "price": 12000000},
            {"property_type": "Land", "square_feet": 3000, "city": "Kozhikode", "state": "Kerala", "beds": 0, "baths": 0, "amenities_count": 0, "age_of_property": 0, "floor_level": 0, "commercial_zone": 1, "gated_community": 0, "price": 4500000},
            {"property_type": "Room", "square_feet": 350, "city": "Kochi", "state": "Kerala", "beds": 1, "baths": 1, "amenities_count": 2, "age_of_property": 5, "floor_level": 2, "commercial_zone": 0, "gated_community": 1, "price": 1200000},
            {"property_type": "Apartment", "square_feet": 900, "city": "Kottayam", "state": "Kerala", "beds": 2, "baths": 2, "amenities_count": 4, "age_of_property": 8, "floor_level": 3, "commercial_zone": 1, "gated_community": 1, "price": 5000000},
            {"property_type": "House", "square_feet": 1500, "city": "Thrissur", "state": "Kerala", "beds": 3, "baths": 2, "amenities_count": 6, "age_of_property": 12, "floor_level": 0, "commercial_zone": 0, "gated_community": 1, "price": 9000000},
            {"property_type": "Land", "square_feet": 2500, "city": "Palakkad", "state": "Kerala", "beds": 0, "baths": 0, "amenities_count": 0, "age_of_property": 0, "floor_level": 0, "commercial_zone": 1, "gated_community": 0, "price": 3800000},
            {"property_type": "Apartment", "square_feet": 1100, "city": "Kannur", "state": "Kerala", "beds": 3, "baths": 2, "amenities_count": 5, "age_of_property": 6, "floor_level": 5, "commercial_zone": 1, "gated_community": 1, "price": 6800000},
            {"property_type": "House", "square_feet": 1800, "city": "Alappuzha", "state": "Kerala", "beds": 4, "baths": 3, "amenities_count": 8, "age_of_property": 20, "floor_level": 0, "commercial_zone": 0, "gated_community": 1, "price": 11000000},
            {"property_type": "Room", "square_feet": 400, "city": "Kochi", "state": "Kerala", "beds": 1, "baths": 1, "amenities_count": 3, "age_of_property": 3, "floor_level": 1, "commercial_zone": 0, "gated_community": 1, "price": 1500000},
            {"property_type": "Apartment", "square_feet": 1000, "city": "Ernakulam", "state": "Kerala", "beds": 2, "baths": 2, "amenities_count": 4, "age_of_property": 5, "floor_level": 6, "commercial_zone": 1, "gated_community": 1, "price": 6200000},
            {"property_type": "House", "square_feet": 2200, "city": "Malappuram", "state": "Kerala", "beds": 5, "baths": 4, "amenities_count": 9, "age_of_property": 25, "floor_level": 0, "commercial_zone": 0, "gated_community": 1, "price": 14000000},
            {"property_type": "Land", "square_feet": 4000, "city": "Kollam", "state": "Kerala", "beds": 0, "baths": 0, "amenities_count": 0, "age_of_property": 0, "floor_level": 0, "commercial_zone": 1, "gated_community": 0, "price": 6000000},
            {"property_type": "Room", "square_feet": 300, "city": "Kozhikode", "state": "Kerala", "beds": 1, "baths": 1, "amenities_count": 2, "age_of_property": 4, "floor_level": 1, "commercial_zone": 0, "gated_community": 1, "price": 1000000},
            {"property_type": "Apartment", "square_feet": 1300, "city": "Pathanamthitta", "state": "Kerala", "beds": 3, "baths": 3, "amenities_count": 6, "age_of_property": 7, "floor_level": 7, "commercial_zone": 1, "gated_community": 1, "price": 7200000},
            {"property_type": "Apartment", "square_feet": 800, "city": "Kollam", "state": "Kerala", "beds": 2, "baths": 1, "amenities_count": 3, "age_of_property": 5, "floor_level": 2, "commercial_zone": 1, "gated_community": 1, "price": 4000000},
            {"property_type": "House", "square_feet": 1200, "city": "Kannur", "state": "Kerala", "beds": 2, "baths": 2, "amenities_count": 4, "age_of_property": 10, "floor_level": 0, "commercial_zone": 0, "gated_community": 1, "price": 6500000},
            {"property_type": "Land", "square_feet": 2000, "city": "Thrissur", "state": "Kerala", "beds": 0, "baths": 0, "amenities_count": 0, "age_of_property": 0, "floor_level": 0, "commercial_zone": 1, "gated_community": 0, "price": 3200000},
            {"property_type": "Room", "square_feet": 250, "city": "Alappuzha", "state": "Kerala", "beds": 1, "baths": 1, "amenities_count": 1, "age_of_property": 3, "floor_level": 1, "commercial_zone": 0, "gated_community": 1, "price": 900000}
        ]
    
    # Convert to DataFrame
    df = pd.DataFrame(data)
    
    # Define features and target
    X = df.drop(columns=["price"])
    y = df["price"]
    
    # 1. Test with the existing model
    print("\n1. Testing with existing trained model:")
    test_existing_model(predictor, X, y)
    
    # 2. Perform cross-validation
    print("\n2. Performing 5-fold cross-validation:")
    perform_cross_validation(predictor.model, X, y)
    
    # 3. Test with some sample properties
    print("\n3. Testing with sample properties:")
    test_sample_properties(predictor)

def test_existing_model(predictor, X, y):
    """Test the accuracy of the existing model"""
    # Make predictions for all properties in the dataset
    predictions = []
    for _, row in X.iterrows():
        input_data = row.to_dict()
        predicted_price = predictor.predict_price(input_data)
        predictions.append(predicted_price)
    
    # Calculate metrics
    mse = mean_squared_error(y, predictions)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y, predictions)
    r2 = r2_score(y, predictions)
    
    print(f"Mean Squared Error: {mse:.2f}")
    print(f"Root Mean Squared Error: {rmse:.2f}")
    print(f"Mean Absolute Error: {mae:.2f}")
    print(f"R² Score: {r2:.2f}")
    
    # Calculate percentage error
    percentage_errors = [abs(pred - actual) / actual * 100 for pred, actual in zip(predictions, y)]
    mean_percentage_error = np.mean(percentage_errors)
    print(f"Mean Percentage Error: {mean_percentage_error:.2f}%")

def perform_cross_validation(model, X, y):
    """Perform cross-validation to get a better estimate of model performance"""
    # Define cross-validation strategy
    cv = KFold(n_splits=5, shuffle=True, random_state=42)
    
    # Perform cross-validation for R²
    r2_scores = cross_val_score(model, X, y, cv=cv, scoring='r2')
    print(f"Cross-validated R² scores: {r2_scores}")
    print(f"Mean R² score: {np.mean(r2_scores):.2f}")
    
    # Perform cross-validation for negative MSE (scikit-learn minimizes)
    mse_scores = -cross_val_score(model, X, y, cv=cv, scoring='neg_mean_squared_error')
    print(f"Cross-validated MSE scores: {mse_scores}")
    print(f"Mean MSE score: {np.mean(mse_scores):.2f}")
    
    # Calculate RMSE from MSE
    rmse_scores = np.sqrt(mse_scores)
    print(f"Cross-validated RMSE scores: {rmse_scores}")
    print(f"Mean RMSE score: {np.mean(rmse_scores):.2f}")

def test_sample_properties(predictor):
    """Test the model with some sample properties"""
    # Define some test properties
    test_properties = [
        {
            "property_type": "Apartment", 
            "square_feet": 1100, 
            "city": "Kochi", 
            "state": "Kerala", 
            "beds": 2, 
            "baths": 2, 
            "amenities_count": 4, 
            "age_of_property": 5, 
            "floor_level": 3, 
            "commercial_zone": 0, 
            "gated_community": 1
        },
        {
            "property_type": "House", 
            "square_feet": 1800, 
            "city": "Thrissur", 
            "state": "Kerala", 
            "beds": 3, 
            "baths": 3, 
            "amenities_count": 6, 
            "age_of_property": 10, 
            "floor_level": 0, 
            "commercial_zone": 0, 
            "gated_community": 1
        },
        {
            "property_type": "Land", 
            "square_feet": 2500, 
            "city": "Kollam", 
            "state": "Kerala", 
            "beds": 0, 
            "baths": 0, 
            "amenities_count": 0, 
            "age_of_property": 0, 
            "floor_level": 0, 
            "commercial_zone": 1, 
            "gated_community": 0
        }
    ]
    
    # Make predictions
    for i, prop in enumerate(test_properties):
        predicted_price = predictor.predict_price(prop)
        print(f"Test Property {i+1}:")
        print(f"  Type: {prop['property_type']}")
        print(f"  Location: {prop['city']}, {prop['state']}")
        print(f"  Size: {prop['square_feet']} sq ft, {prop['beds']} beds, {prop['baths']} baths")
        print(f"  Predicted Price: ₹{predicted_price:,}")
        print()

if __name__ == "__main__":
    main() 