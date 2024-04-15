# -*- coding: utf-8 -*-
import pandas as pd 
import pickle
import numpy as np 
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json 
labled_food = {0: 'Apple (আপেল)', 1: 'Banana (কলা)', 2: 'Bean  (সিম)', 3: 'Bitter Gourd (করলা)', 4: 'Blood Orange (মাল্টা)', 5: 'Bottle Gourd Leaf (লাউ শাক)', 6: 'Bottle Groud (লাউ)', 7: 'Brinjal (বেগুন)', 8: 'Cabbage (বাধাঁকপি)', 9: 'Capsicum (মিষ্টি মরিচ)', 10: 'Carrot (গাজর)', 11: 'Cauliflower (ফুলকপি)', 12: 'Cucumber (শসা)', 13: 'Dates (খেজুর)', 14: 'Dragon Fruit (ড্রাগন ফলের)', 15: 'Ginger (আদা)', 16: 'Gooseberry (আমলকী)', 17: 'Green Chilli (কাঁচা মরিচ)', 18: 'Green Grapes (আঙ্গুর)', 19: 'Green Papaya (কাঁচা পেঁপে)', 20: 'Green Peas (মটরশুঁটি)', 21: 'Guava(পেয়ারা)', 22: 'Java Apple (জামরুল)', 23: 'Lemon (লেবু)', 24: 'Long Bean (বরবটি)', 25: 'Malabar Spinach (পুঁই শাক)', 26: 'Okra (ঢেঁড়স)', 27: 'Orange (কমলা)', 28: 'Pointed Gourd (পটল)', 29: 'Pomegranate (বেদানা)', 30: 'Pumpkin Spinach (কুমড়ো শাক)', 31: 'Radish (মুলা)', 32: 'Red Spinach (লালশাক)', 33: 'Ripe Papaya (পাকা পেঁপে)', 34: 'Spinach (পালং শাক)', 35: 'Sweet Potato  (মিষ্টি আলু)', 36: 'Sweet Pumpkin (মিষ্টি কুমড়া)', 37: 'Taro (কচু শাক)', 38: 'Tomato (টমেটো)', 39: 'Turnip (শালগম)', 40: 'Water Melon (তরমুজ)', 41: 'White Pear (নাশপাতি)'}

# create a flask app 
app = Flask(__name__)
CORS(app)
# loading our model
file_path = "/".join(os.path.abspath(__file__).split('/')[:-1])

RFC_model = pickle.load(open(f'{file_path}/models/model_pickle','rb'))

@app.route("/recommend",methods=["POST"])
def food_recommend():
    userData = request.get_json()
    age = userData['age']
    height = userData['height']
    weight = userData['weight']
    bmi = float(weight)/(float(height))**2
    gender = userData['gender']
    diesease = userData['diesease']
    recommended_foods=[]
    for x in diesease :
        if x !=0 :
            classify_percentage = RFC_model.predict_proba([[age,bmi,gender,x]])
            indexes = np.where(classify_percentage > 0.0)[1]
            for idx in indexes :
                if labled_food[idx] not in recommended_foods :
                    recommended_foods.append(labled_food[idx])
    return {
        'recommended_foods' :recommended_foods,
    }

if __name__ == '__main__' :
    app.run(debug=True)