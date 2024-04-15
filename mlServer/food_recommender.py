
foods_data =['Spinach (পালং শাক)','Cauliflower (ফুলকপি)','Cucumber (শসা)','Bottle Groud (লাউ)','Cabbage (বাধাঁকপি)','Tomato (টমেটো)','Sweet Pumpkin (মিষ্টি কুমড়া)',
        'Brinjal (বেগুন)','Banana (কলা)','Gooseberry (আমলকী)','Ripe Papaya (পাকা পেঁপে)','Green Papaya (কাঁচা পেঁপে)','Guava(পেয়ারা)','Pomegranate (বেদানা)',
        'Red Spinach (লালশাক)','Taro (কচু শাক)','Green Grapes (আঙ্গুর)','Orange (কমলা)','Blood Orange (মাল্টা)','Long Bean (বরবটি)','Bean  (সিম)','Apple (আপেল)',
        'Dates (খেজুর)','Dragon Fruit (ড্রাগন ফলের)','Green Chilli (কাঁচা মরিচ)','Lemon (লেবু)','Carrot (গাজর)','Ginger (আদা)','Malabar Spinach (পুঁই শাক)',
        'Water Melon (তরমুজ)','Sweet Potato  (মিষ্টি আলু)','Pumpkin Spinach (কুমড়ো শাক)','Bottle Gourd Leaf (লাউ শাক)','Green Peas (মটরশুঁটি)','Radish (মুলা)',
        'Bitter Gourd (করলা)','Pointed Gourd (পটল)','Capsicum (মিষ্টি মরিচ)','Turnip (শালগম)','Okra (ঢেঁড়স)','White Pear (নাশপাতি)','Java Apple (জামরুল)']

foods_data = sorted(foods_data)

food_for_cholestrerol = sorted(['Spinach (পালং শাক)','Malabar Spinach (পুঁই শাক)','Water Melon (তরমুজ)','Apple (আপেল)','Banana (কলা)','Taro (কচু শাক)','Ripe Papaya (পাকা পেঁপে)','Guava(পেয়ারা)'])

food_for_azma = sorted(['Carrot (গাজর)','Sweet Potato  (মিষ্টি আলু)','Bottle Gourd Leaf (লাউ শাক)','Spinach (পালং শাক)', 'Pumpkin Spinach (কুমড়ো শাক)','Apple (আপেল)','Banana (কলা)','Orange (কমলা)','Lemon (লেবু)','Ginger (আদা)'])

food_for_diabetes = sorted(['Apple (আপেল)','Banana (কলা)','Bean  (সিম)','Bitter Gourd (করলা)','Brinjal (বেগুন)','Bottle Groud (লাউ)','Cabbage (বাধাঁকপি)','Capsicum (মিষ্টি মরিচ)','Carrot (গাজর)',
 'Cauliflower (ফুলকপি)','Cucumber (শসা)','Dates (খেজুর)','Green Papaya (কাঁচা পেঁপে)','Green Peas (মটরশুঁটি)','Guava(পেয়ারা)','Java Apple (জামরুল)','Lemon (লেবু)',
 'Long Bean (বরবটি)','Okra (ঢেঁড়স)','Pointed Gourd (পটল)','Radish (মুলা)','Sweet Pumpkin (মিষ্টি কুমড়া)','Tomato (টমেটো)','Turnip (শালগম)','Water Melon (তরমুজ)',
 'White Pear (নাশপাতি)'])

food_for_hbp = sorted(['Spinach (পালং শাক)','Cauliflower (ফুলকপি)','Cucumber (শসা)','Bottle Groud (লাউ)','Cabbage (বাধাঁকপি)','Tomato (টমেটো)','Sweet Pumpkin (মিষ্টি কুমড়া)','Brinjal (বেগুন)',
'Banana (কলা)','Gooseberry (আমলকী)','Ripe Papaya (পাকা পেঁপে)','Green Papaya (কাঁচা পেঁপে)','Guava(পেয়ারা)','Pomegranate (বেদানা)'])

food_for_lbp =sorted(['Red Spinach (লালশাক)','Taro (কচু শাক)','Green Grapes (আঙ্গুর)','Orange (কমলা)','Blood Orange (মাল্টা)'])

food_for_animia =sorted(['Long Bean (বরবটি)','Bean  (সিম)','Red Spinach (লালশাক)','Spinach (পালং শাক)','Taro (কচু শাক)','Apple (আপেল)','Guava(পেয়ারা)','Banana (কলা)','Dates (খেজুর)','Dragon Fruit (ড্রাগন ফলের)'])

food_for_allergy = sorted(['Banana (কলা)','Orange (কমলা)','Green Chilli (কাঁচা মরিচ)','Lemon (লেবু)','Cucumber (শসা)','Carrot (গাজর)','Ginger (আদা)','Cabbage (বাধাঁকপি)','Cauliflower (ফুলকপি)'])

import pandas as pd
import random as rn
import numpy as np
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import accuracy_score
from imblearn.over_sampling import SMOTE
import  os


# loading our model
file_path = "/".join(os.path.abspath(__file__).split('/')[:-1])

ages = np.random.randint(18, 61, size=1000)

genders = np.random.randint(0,2,size=1000)

heights = np.round(np.random.uniform(1.5, 2, size=1000), 2)

weights = np.round(np.random.uniform(40,100,size=1000),2)

bmi_values = [round(weight / (height ** 2), 4) for weight, height in zip(weights, heights)]

smote = SMOTE(random_state=42,k_neighbors=2)

## creating data frame for who can eat all of the foods
recommended_foods = foods_data
dieseas = np.full(1000, 0, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df1 = pd.DataFrame(data);

X, Y = smote.fit_resample(df1.drop(columns='recommended_food'), df1['recommended_food'])
df1 = pd.concat([X,Y], axis=1)

print(df1.shape)

## creating data frame for who have cholestrerol
recommended_foods = food_for_cholestrerol
dieseas = np.full(1000,5, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df2 = pd.DataFrame(data);

X, Y = smote.fit_resample(df2.drop(columns='recommended_food'), df2['recommended_food'])
df2 = pd.concat([X,Y], axis=1)

print(df2.shape)

## creating data frame for who have azma
recommended_foods = food_for_azma
dieseas = np.full(1000,6, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df3 = pd.DataFrame(data);

X, Y = smote.fit_resample(df3.drop(columns='recommended_food'), df3['recommended_food'])
df3 = pd.concat([X,Y], axis=1)

print(df3.shape)

## creating data frame for who have diabetes
recommended_foods = food_for_diabetes
dieseas = np.full(1000,7, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df4 = pd.DataFrame(data);

X, Y = smote.fit_resample(df4.drop(columns='recommended_food'), df4['recommended_food'])
df4 = pd.concat([X,Y], axis=1)

print(df4.shape)

## creating data frame for who have high blood pressure
recommended_foods = food_for_hbp
dieseas = np.full(1000,1, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df5 = pd.DataFrame(data);

X, Y = smote.fit_resample(df5.drop(columns='recommended_food'), df5['recommended_food'])
df5 = pd.concat([X,Y], axis=1)

print(df5.shape)

## creating data frame for who have low blood pressure
recommended_foods = food_for_lbp
dieseas = np.full(1000,2, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df6 = pd.DataFrame(data);

X, Y = smote.fit_resample(df6.drop(columns='recommended_food'), df6['recommended_food'])
df6 = pd.concat([X,Y], axis=1)

print(df6.shape)

## creating data frame for who have animia
recommended_foods = food_for_animia
dieseas = np.full(1000,3, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df7 = pd.DataFrame(data);

X, Y = smote.fit_resample(df7.drop(columns='recommended_food'), df7['recommended_food'])
df7 = pd.concat([X,Y], axis=1)

print(df7.shape)

## creating data frame for who have allergy
recommended_foods = food_for_allergy
dieseas = np.full(1000,4, dtype=int)

data = {
    'age': ages,
    'bmi':bmi_values,
    'gender':genders,
    'dieseas':dieseas,
    'recommended_food': rn.choices(recommended_foods, k=1000)
}

df8 = pd.DataFrame(data);

X, Y = smote.fit_resample(df8.drop(columns='recommended_food'), df8['recommended_food'])
df8 = pd.concat([X,Y], axis=1)

print(df8.shape)

df = pd.concat([df1,df2,df3,df4,df5,df6,df7,df8], ignore_index=True)

print(df.shape)

print(df.head(10))

df = df.sample(frac=1, random_state=42).reset_index(drop=True)

df['recommended_food'].value_counts()

from sklearn import preprocessing

label_encoder = preprocessing.LabelEncoder()

df['food_recommended'] = label_encoder.fit_transform(df['recommended_food'])
## printing the label mapping
label_mapping = dict(zip(df['food_recommended'],df['recommended_food']))
## print in sorted order
print('For recommended_food Column')
labled_food = dict(sorted(label_mapping.items(), key=lambda item: item[1]))
print(dict(sorted(label_mapping.items(), key=lambda item: item[1])));
df.drop(columns=['recommended_food'],inplace=True)

df.to_csv(f'{file_path}/datasets/food_recommendation.csv', index=False)

y = df['food_recommended']
X = df.drop(columns=['food_recommended'])

smote = SMOTE(random_state=42,k_neighbors=2)

X, y = smote.fit_resample(X, y)
df = pd.concat([X,y], axis=1)
df.to_csv(f'{file_path}/datasets/food_recommendation_balanced.csv',index=False)

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, stratify=y)

# check shape
print('x_train: ', X_train.shape)
print('x_test: ', X_test.shape)
print('y_train: ', y_train.shape)
print('y_test: ', y_test.shape)

## initializing the Random Forest Classifier
RFC_model = RandomForestClassifier(n_estimators = 100)
## Train the Random Forest model  with train dataset
RFC_model.fit(X_train, y_train)
## testing the Random Forest model
RFC_ypred = RFC_model.predict(X_test)
## printing the Accuracy of the model
print("Test Accuracy", accuracy_score(y_test, RFC_ypred))
print("Test Classification Report\n", classification_report(y_test,RFC_ypred))
## illustrating the confusion matrix for the prediction of the model
mat=confusion_matrix(y_test,RFC_ypred)
sns.heatmap(mat,annot=False, cbar=False,cmap="Blues")
# you will get a warning beacuse of some permissions
#plt.show()

## recommendation part

df = pd.read_csv(f'{file_path}/datasets/food_recommendation_balanced.csv')

## initializing the Random Forest Classifier
RFC_model = RandomForestClassifier(n_estimators = 100)
## Train the Random Forest model  with train dataset
RFC_model.fit(df.drop(columns=['food_recommended']),df['food_recommended'])

import pickle
## save model with pickle
with open(f'{file_path}/models/model_pickle','wb') as f :
    pickle.dump(RFC_model,f)

with open(f'{file_path}/models/model_pickle','rb') as f :
   RFC_model = pickle.load(f)

ypred = RFC_model.predict([[20,29.5,0,5]])

print(ypred)

classify_percentage = RFC_model.predict_proba([[20,29.5,0,5]])

classify_percentage[0]

indexes = np.where(classify_percentage > 0.0)[1]

print(indexes)

for idx in indexes :
  print(labled_food[idx])


