import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
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
        # Load Dataset
        data_path = os.path.join(os.path.dirname(__file__), 'real_estate_price_prediction.csv')
        df = pd.read_csv(data_path)

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

        # Create Random Forest model with optimized hyperparameters
        rf_model = RandomForestRegressor(
            n_estimators=200,           # Increased number of trees
            max_depth=15,               # Control tree depth to prevent overfitting
            min_samples_split=5,        # Minimum samples required to split
            min_samples_leaf=2,         # Minimum samples required at leaf node
            max_features='sqrt',        # Number of features to consider for best split
            random_state=42,
            n_jobs=-1                   # Use all available cores
        )

        # Create full pipeline
        self.model = Pipeline([
            ('preprocessor', preprocessor),
            ('regressor', rf_model)
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
        Get feature importance from the Random Forest model
        
        Returns:
            dict: Feature names and their importance scores
        """
        if not hasattr(self.model, 'named_steps'):
            raise Exception("Model not properly initialized")

        feature_names = (
            self.model.named_steps['preprocessor']
            .get_feature_names_out()
        )
        
        importances = self.model.named_steps['regressor'].feature_importances_
        
        return dict(zip(feature_names, importances)) 