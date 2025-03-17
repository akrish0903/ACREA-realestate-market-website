import sys
import json
from price_predictor import PricePredictor

def main():
    # Get input data from command line argument
    input_data = json.loads(sys.argv[1])
    
    # Initialize predictor
    predictor = PricePredictor()
    
    # Make prediction
    predicted_price = predictor.predict_price(input_data)
    
    # Print result (will be captured by Node.js)
    print(predicted_price)

if __name__ == "__main__":
    main() 