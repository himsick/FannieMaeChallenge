from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# Initializing Flask app
app = Flask(__name__)
CORS(app) 

@app.route('/members')
def members():
    # Returning an api for showing in reactjs
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/assess', methods=['POST'])
def assess_mortgage():
    try:
        user_input = request.json

        # Convert string numbers to integers/floats
        user_input['creditScore'] = int(user_input['creditScore'])
        user_input['loanAmount'] = float(user_input['loanAmount'])
        user_input['appraisedValue'] = float(user_input['appraisedValue'])
        user_input['grossMonthlyIncome'] = float(user_input['grossMonthlyIncome'])
        user_input['totalMonthlyPayments'] = float(user_input['totalMonthlyPayments'])
        user_input['monthlyMortgagePayment'] = float(user_input['monthlyMortgagePayment'])

        # Convert user input to a DataFrame
        df = pd.DataFrame([user_input])

        # Credit Score Check
        df['CreditScoreCheck'] = df['creditScore'] >= 640
        
        # LTV Ratio Calculation
        df['LTV'] = df['loanAmount'] / df['appraisedValue']
        df['LTV_Status'] = 'Undetermined'
        df.loc[df['LTV'] < 0.8, 'LTV_Status'] = 'Preferred'
        df.loc[(df['LTV'] >= 0.8) & (df['LTV'] <= 0.95), 'LTV_Status'] = 'Might Require Insurance'
        df.loc[df['LTV'] > 0.95, 'LTV_Status'] = 'High Risk'
        
        # DTI Ratio Calculation
        df['DTI'] = df['totalMonthlyPayments'] / df['grossMonthlyIncome']
        df['DTI_Status'] = 'Undetermined'
        df.loc[df['DTI'] <= 0.36, 'DTI_Status'] = 'Preferred'
        df.loc[(df['DTI'] > 0.36) & (df['DTI'] <= 0.43), 'DTI_Status'] = 'Acceptable'
        df.loc[df['DTI'] > 0.43, 'DTI_Status'] = 'Not Preferred'
        
        # FEDTI Ratio Calculation
        df['FEDTI'] = df['monthlyMortgagePayment'] / df['grossMonthlyIncome']
        df['FEDTI_Status'] = 'Undetermined'
        df.loc[df['FEDTI'] <= 0.28, 'FEDTI_Status'] = 'Acceptable'
        df.loc[df['FEDTI'] > 0.28, 'FEDTI_Status'] = 'Not Preferred'
        
        # Compile the response
        response = {
            'CreditScoreCheck': 'Pass' if df.iloc[0]['CreditScoreCheck'] else 'Fail',
            'LTV_Status': df.iloc[0]['LTV_Status'],
            'DTI_Status': df.iloc[0]['DTI_Status'],
            'FEDTI_Status': df.iloc[0]['FEDTI_Status'],
        }

        return jsonify(response)
    except Exception as e:
        # Handle unexpected errors
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5173)
