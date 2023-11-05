import pandas as pd
 
# Sample user input received from the React app
user_input = {
    'creditScore': 680,
    'loanAmount': 200000,
    'appraisedValue': 250000,
    'grossMonthlyIncome': 5000,
    'totalMonthlyPayments': 800,
    'monthlyMortgagePayment': 1200,
}
 
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
 
# Print the response (or you can return this in your Flask API)
print(response)
 