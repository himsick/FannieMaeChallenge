import pandas as pd
 
# Replace 'your_data.csv' with the path to your actual CSV file.
file_path = 'HomeBuyer.csv'
 
# Read the data from the CSV file
df = pd.read_csv(file_path)
 
# Check if the CreditScore for each buyer is 640 or above
df['CreditScoreCheck'] = df['CreditScore'] >= 640
 
# Calculate the LTV ratio and determine status
df['LTV'] = df['EstMonthlyMortgagePayment'] / df['HomeAppraisedValue']
df['LTV_Status'] = 'Undetermined'
df.loc[df['LTV'] < 0.8, 'LTV_Status'] = 'Preferred'
df.loc[(df['LTV'] >= 0.8) & (df['LTV'] <= 0.95), 'LTV_Status'] = 'Might Require Insurance'
df.loc[df['LTV'] > 0.95, 'LTV_Status'] = 'High Risk'
 
# Calculate the DTI ratio and determine status
df['DTI'] = (df['MonthlyCarPayment'] + df['MonthlyCreditCardPayment'] + df['StudentLoanPayment'] + df['EstMonthlyMortgagePayment']) / df['GrossMonthlyIncome']
df['DTI_Status'] = 'Undetermined'
df.loc[df['DTI'] <= 0.36, 'DTI_Status'] = 'Preferred'
df.loc[(df['DTI'] > 0.36) & (df['DTI'] <= 0.43), 'DTI_Status'] = 'Acceptable'
df.loc[df['DTI'] > 0.43, 'DTI_Status'] = 'Not Preferred'
 
# Calculate the FEDTI ratio and determine status
df['FEDTI'] = df['EstMonthlyMortgagePayment'] / df['GrossMonthlyIncome']
df['FEDTI_Status'] = 'Undetermined'
df.loc[df['FEDTI'] <= 0.28, 'FEDTI_Status'] = 'Acceptable'
df.loc[df['FEDTI'] > 0.28, 'FEDTI_Status'] = 'Not Preferred'
 
# Adding columns for credit score, LTV, DTI, and FEDTI checks for the first 20 entries
first_20 = df.head(20).copy()
first_20['CreditScoreCheck'] = first_20['CreditScore'] >= 640
first_20['LTV_Check'] = first_20['LTV'] < 0.8
first_20['DTI_Check'] = first_20['DTI'] <= 0.43
first_20['FEDTI_Check'] = first_20['FEDTI'] <= 0.28
 
# Display the result for the first 20 entries
print(first_20[['ID', 'CreditScore', 'CreditScoreCheck', 'LTV', 'LTV_Status', 'DTI', 'DTI_Status', 'FEDTI', 'FEDTI_Status']])
 
# Save the result back to CSV if needed
# df.to_csv('processed_data.csv', index=False)
 