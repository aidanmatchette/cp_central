# Group Project - Code Platoon Central 

## Check out Code Platoon Central Demo
> - [Code Platoon Central](https://youtu.be/dU39A7oSW9g)

## Why?
> As any people know, coding bootcamps are tough.  One way that my group thought of to make it just a little easier, was to centralize all of the info, curriculum, feedback and forums into a central app.  Our ultimate goal was to pack as many resources from our coding bootcamp experience as we could into one location. Some of the notable features that we are replacing or integrating into our app are Slack, Github, Google Forms and Google Calendar

## Technologies and Frameworks
- React.js
- Django (Django Rest Framework)
- MySQL and PostgreSQL
- JWT
- AWS
- Git / GitHub

## Setup



### Clone repo (take note of ending dot if you don't want to make another subfolder)
~~~
git clone https://github.com/aidanmatchette/cp_central.git .
~~~

~~~
python -m venv .venv
~~~

#### (Windows) Go into virtual environment
~~~
.venv/scripts/activate.ps1
~~~

#### (Mac/Linux) Go into virtual environment
~~~
source venv/bin/activate
~~~

~~~.ve
pip install -r requirements.txt
~~~
Make .env file (from template)
~~~
cp .env.sample .env
~~~

### Update .env file
- Add django secret key
- Set DEBUG=true for local development
- Set REACT_APP_URL_PREFIX=http://localhost:8000 (or wherever you would run the django server)


~~~
python manage.py migrate
~~~


~~~
npm install
~~~

~~~
python manage.py runserver
~~~

~~~
npm run start
~~~

## (Optional) if you want to serve the app from django or host in cloud

change .env variables (changing debug is optional if not deploying)
~~~
DEBUG=false
REACT_APP_URL_PREFIX=
~~~

~~~
npm run build
~~~
