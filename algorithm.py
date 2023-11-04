import pandas as pd

# Replace 'your_data.csv' with the path to your actual CSV file.
file_path = 'HomeBuyer.csv'

# Read the data from the CSV file
df = pd.read_csv(file_path)

# Check if the CreditScore for each buyer is 640 or above
df['CreditScoreCheck'] = df['CreditScore'] >= 640

# Calculate the LTV ratio and determine status
df['LTV'] = df['LoanAmount'] / df['AppraisedValue']  # Assuming you have a LoanAmount column
df['LTV_Status'] = 'Undetermined'
df.loc[df['LTV'] < 0.8, 'LTV_Status'] = 'Preferred'
df.loc[(df['LTV'] >= 0.8) & (df['LTV'] <= 0.95), 'LTV_Status'] = 'Might Require Insurance'
df.loc[df['LTV'] > 0.95, 'LTV_Status'] = 'High Risk'

# Calculate the DTI ratio and determine status
df['DTI'] = (df['CarPayment'] + df['CreditCardPayment'] + df['StudentLoanPayments'] + df['MonthlyMortgagePayment']) / df['GrossMonthlyIncome']
df['DTI_Status'] = 'Undetermined'
df.loc[df['DTI'] <= 0.36, 'DTI_Status'] = 'Preferred'
df.loc[(df['DTI'] > 0.36) & (df['DTI'] <= 0.43), 'DTI_Status'] = 'Acceptable'
df.loc[df['DTI'] > 0.43, 'DTI_Status'] = 'Not Preferred'

# Calculate the FEDTI ratio and determine status
df['FEDTI'] = df['MonthlyMortgagePayment'] / df['GrossMonthlyIncome']
df['FEDTI_Status'] = 'Undetermined'
df.loc[df['FEDTI'] <= 0.28, 'FEDTI_Status'] = 'Acceptable'
df.loc[df['FEDTI'] > 0.28, 'FEDTI_Status'] = 'Not Preferred'

# Filter the DataFrame to only include entries where all three checks are 'Preferred' or 'Acceptable'
filtered_df = df[
    (df['CreditScoreCheck']) &
    (df['LTV_Status'].isin(['Preferred', 'Might Require Insurance'])) &
    (df['DTI_Status'].isin(['Preferred', 'Acceptable'])) &
    (df['FEDTI_Status'] == 'Acceptable')
]

# Display the result for the filtered DataFrame
print(filtered_df[['ID', 'CreditScore', 'CreditScoreCheck', 'LTV', 'LTV_Status', 'DTI', 'DTI_Status', 'FEDTI', 'FEDTI_Status']])

# Save the result back to CSV if needed
# filtered_df.to_csv('processed_data_filtered.csv', index=False)
