import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, GridSearchCV
import scipy.stats as stats

import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier,GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.model_selection import cross_val_score

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import FunctionTransformer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import MinMaxScaler
from sklearn.pipeline import Pipeline,make_pipeline
from sklearn.feature_selection import SelectKBest,chi2

df = pd.read_csv('datasetfinal.csv')
from sklearn.model_selection import train_test_split
dff = pd.DataFrame(df)
X = df.drop(columns=["output"])  # Input features
y = df["output"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

trf1 = ColumnTransformer([
    ('ohe_sex_embarked',OneHotEncoder(sparse_output=False,handle_unknown='ignore'),[1,10])
],remainder='passthrough')

trf2 = ColumnTransformer([
    ('scale',MinMaxScaler(),slice(0,15))
])

trf3 = GradientBoostingClassifier()
pipe = make_pipeline(trf1,trf2,trf3)

pipe.fit(X_train,y_train)
y_pred = pipe.predict(X_test)
from sklearn.model_selection import cross_val_score
cross_val_score(pipe, X_train, y_train, cv=5, scoring='accuracy').mean()

import pickle
pickle.dump(pipe,open('model.pkl','wb'))

import pickle
import numpy as np
pipe = pickle.load(open('model.pkl','rb'))

import numpy as np
import pandas as pd

import pandas as pd
import numpy as np


def predict_from_input():
    columns = ['Age', 'Gender', 'Sleep Hours', 'Exercise Hours',
               'Diet Quality (1-10)', 'Social Interaction Score', 'Stress Level (1-10)',
               'Work Hours per Week', 'Screen Time (hours/day)', 'Financial Stress (1-10)',
               'Chronic Illness (Yes/No)', 'Family Support (1-10)', 'Therapy Sessions (per month)']

    user_input = []
    for col in columns:
        try:
            if col == 'Gender':  # Collect raw string input
                value = input("Enter Gender (Male/Female): ").strip().capitalize()
                if value not in ['Male', 'Female']:
                    raise ValueError("Invalid input for Gender. Choose 'Male' or 'Female'.")
                user_input.append(value)

            elif col == 'Chronic Illness (Yes/No)':  # Collect raw string input
                value = input("Chronic Illness (Yes/No): ").strip().capitalize()
                if value not in ['Yes', 'No']:
                    raise ValueError("Invalid input for Chronic Illness. Choose 'Yes' or 'No'.")
                user_input.append(value)

            else:  # Handle numerical input
                value = float(input(f"Enter {col}: "))  # Ensure numeric values
                user_input.append(value)
        except ValueError as e:
            print(e)
            return None

    input_df = pd.DataFrame([user_input], columns=columns)
    return input_df

# Collect input and get the DataFrame
input_df = predict_from_input()

# Make a prediction with the pipeline
prediction = pipe.predict(input_df)

print("Prediction:", prediction)
