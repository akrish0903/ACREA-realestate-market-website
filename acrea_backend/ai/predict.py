import sys
import json
import os
import importlib.util

def main():
    # Get input data from command line argument
    input_data = json.loads(sys.argv[1])
    
    # Dynamically import PricePredictor from the same directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    predictor_path = os.path.join(current_dir, 'price_predictor.py')
    
    spec = importlib.util.spec_from_file_location("price_predictor", predictor_path)
    price_predictor_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(price_predictor_module)
    
    # Initialize predictor
    predictor = price_predictor_module.PricePredictor()
    
    # Make prediction
    predicted_price = predictor.predict_price(input_data)
    
    # Print result (will be captured by Node.js)
    print(predicted_price)

if __name__ == "__main__":
    main() 