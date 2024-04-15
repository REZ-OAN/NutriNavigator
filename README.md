# NutriNavigator

NutriNavigator is a project aimed at providing nutritional recommendations by taking users `age` `height` `weight` `disease` they have, with  full `e-commerce` features . This `README` will guide you through setting up the project locally.

## Setting Up Environment Variables

Developers must create a `config.env` file inside `/backend/config/` directory with the following environment variables:
```
PORT=your_preferred_port
MONGODB_URI="mongodb_database_url"
SALT=length_of_generated_salt
JWT_SECRET="random_string"
JWT_EXPIRE="jwt_token_expired_day"
COOKIE_EXPIRE=cookie_expire_day
SMTP_SERVICE="gmail"
SMTP_PASS="a_random_string_given_by_gmail"
SMTP_MAIL="your_mail_in_which_you_have_app_permission"
STRIPE_API_KEY=api_key_goes_here
STRIPE_SECRET_KEY=secret_key_goes_here
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
CLOUDINARY_NAME=cloudinary_given_name
CLOUDINARY_API=your_identity_key
CLOUDINARY_API_SECRET=secret_key_goes_here
FRONT_END_URI=localhost:3000
```

## Installing Packages

### Node Server

Navigate to the root folder of `NutriNavigator` in your terminal and execute:

```
npm i
```

### ReactJS App

Navigate to `NutriNavigator/frontend` folder and execute:

```
npm i
```

Ignore any warnings during installation.

### Flask Server

Navigate to `/NutriNavigator/mlServer` folder in your terminal.

Create a folder using the command:

```
mkdir models
```

Then install the required Python packages listed in `requirements.txt`:

```
pip install -r requirements.txt
```

## Recommender System Model Build
After installing the required packages. Navigate to `/NutriNavigator/mlServer` folder in terminal.
### Create folder called `models`
Inside the `/NutriNavigator/mlServer` folder create a folder `models` to store the trained model on our `food_recommendation` dataset.
execute :
```
mkdir models
```
After creating the folder `models` then run the file `food_recommender.py` by below command :
### for windows
```
python food_recommender.py
```
### for linux (with installed python version 3.X)
```
python3 food_recommender.py
```
After running the `food_recommender.py` check in the created `models` folder, a file may be created called `model_pickle`. Just check this out.

## Running the Servers 
After doing previous steps successfully, we are going to run our `NutriNavigator` web application.



### Node Server

Navigate to the root folder and execute:

```
npm run dev
```

### Python Flask Server

Navigate to `/NutriNavigator/mlServer` folder and execute:

#### For Windows:

```
python server.py
```
#### for linux (with installed python version 3.X)

```
python3 server.py
```

### Running the ReactJS App

Navigate to `/NutriNavigator/frontend` folder and execute:

```
npm start
```

## Accessing NutriNavigator

After successfully running the servers, you can access the NutriNavigator web application at `http://localhost:"your_given_port"`.

