import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt

# Load the data from the Excel file
file_path = 'ML\\data\\Pseudo Data Sheet1.xlsx'
data = pd.read_excel(file_path, sheet_name='in')

# Drop unnecessary columns (those after "Play Grade")
cleaned_data = data.drop(columns=['Unnamed: 17', 'Unnamed: 18', 'Unnamed: 19', 'Unnamed: 20', 'Grade Criteria'])

# Drop rows where "Play Grade" is missing
cleaned_data = cleaned_data.dropna(subset=['Play Grade'])

# Select columns A to P as features and column Q as the target
X = cleaned_data.iloc[:, 0:16]  # Columns A to P
y = cleaned_data.iloc[:, 16]    # Column Q

# Encode categorical columns using OneHotEncoding
X_encoded = pd.get_dummies(X, drop_first=True)

# Handle missing values for numerical columns only (no need to impute for one-hot encoded categorical columns)
numerical_imputer = SimpleImputer(strategy='mean')

# Separate numerical columns (we skip imputation for categorical columns after one-hot encoding)
numerical_cols = X_encoded.select_dtypes(include=['float64', 'int64']).columns

# Impute missing values for numerical columns
X_encoded[numerical_cols] = numerical_imputer.fit_transform(X_encoded[numerical_cols])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Instantiate the GradientBoostingRegressor model
gbr_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)

# Train the model
gbr_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = gbr_model.predict(X_test)

# Round and clip the predictions to the nearest integer
y_pred_rounded = np.round(y_pred).astype(int)

# Evaluate the model using mean squared error
mse = mean_squared_error(y_test, y_pred_rounded)

# Print the Mean Squared Error
print(f"Mean Squared Error: {mse}")

# Create a DataFrame to compare the actual vs predicted values
comparison_df = pd.DataFrame({'Actual Play Grade': y_test, 'Predicted Play Grade': y_pred_rounded})

# Print all results for comparison
print(comparison_df)

# Optionally, save the comparison to a CSV file for further analysis
comparison_df.to_csv('play_grade_predictions_gbr.csv', index=False)

# Optionally, visualize the results with a scatter plot or line plot
plt.figure(figsize=(10, 6))
plt.plot(y_test.values, label='Actual Play Grade', marker='o')
plt.plot(y_pred_rounded, label='Predicted Play Grade', marker='x')
plt.title('Actual vs Predicted Play Grades (Gradient Boosting)')
plt.xlabel('Sample Index')
plt.ylabel('Play Grade')
plt.legend()
plt.grid(True)
plt.show()
