import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.svm import SVR
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error, r2_score
import pickle
import os

class PricePredictor:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), 'price_prediction_model.pkl')
        self.model = None
        self.load_model()

    def load_model(self):
        try:
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
        except FileNotFoundError:
            print("Model file not found. Training new model...")
            self.train_model()

    def train_model(self):
        # Use the provided data instead of loading from CSV
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

        # Define columns
        categorical_cols = ["property_type", "city", "state"]
        numerical_cols = ["square_feet", "beds", "baths", "amenities_count", 
                         "age_of_property", "floor_level", "commercial_zone", "gated_community"]

        # Create preprocessing pipeline
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numerical_cols),
                ('cat', OneHotEncoder(drop='first', sparse=False), categorical_cols)
            ])

        # Create SVM model with RBF kernel
        svm_model = SVR(
            kernel='rbf',           # Radial Basis Function kernel
            C=100,                  # Regularization parameter
            gamma='scale',          # Kernel coefficient
            epsilon=0.1,            # Epsilon in the epsilon-SVR model
        )

        # Create full pipeline
        self.model = Pipeline([
            ('preprocessor', preprocessor),
            ('regressor', svm_model)
        ])

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Train model
        self.model.fit(X_train, y_train)

        # Evaluate model
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print(f"Model Performance Metrics:")
        print(f"Mean Squared Error: {mse:.2f}")
        print(f"R² Score: {r2:.2f}")

        # Save model
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)

    def predict_price(self, input_data):
        """
        Predict property price based on input features
        
        Args:
            input_data (dict): Dictionary containing property features
            
        Returns:
            float: Predicted price
        """
        if self.model is None:
            raise Exception("Model not loaded")

        # Convert input data to DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Make prediction
        predicted_price = self.model.predict(input_df)[0]
        
        # Round to nearest thousand
        predicted_price = round(predicted_price / 1000) * 1000
        
        return predicted_price

    def get_feature_importance(self):
        """
        Get feature coefficients from the SVM model
        
        Returns:
            dict: Feature names and their coefficient values (for linear kernel)
            or None for non-linear kernels
        """
        if not hasattr(self.model, 'named_steps'):
            raise Exception("Model not properly initialized")
            
        # Note: SVR with non-linear kernels doesn't provide direct feature importance
        # This method will return None for RBF kernel
        if self.model.named_steps['regressor'].kernel == 'linear':
            feature_names = (
                self.model.named_steps['preprocessor']
                .get_feature_names_out()
            )
            
            coefficients = self.model.named_steps['regressor'].coef_[0]
            
            return dict(zip(feature_names, coefficients))
        else:
            return None 