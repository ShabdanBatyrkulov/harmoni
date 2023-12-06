# harmoni

#### To update DB.
```
python3 ./manage.py makemigrations
pyhton3 ./manage.py migrate
```

#### NPM Setup Commands
npm init -y
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install @material-ui/core
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @material-ui/icons

#### To run webserver.
```
python ./manage.py runserver
npm run dev
```

### Reference links.
[Django-rest-framework/api-guide/fields](https://www.django-rest-framework.org/api-guide/fields/#charfield)\
[Spotify API tutorial](https://www.youtube.com/watch?v=WAmEZBEeNmg)

### "credentials.py" file under spotify folder is set up to app's client id.
```
CLIENT_ID = "97c1fd86051d4f8ca9ba31238423f6ab"
REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"
```

### Spotify account that can be used in development mode.
username: tagaevmanas26@gmail.com
password: manas123

You can't login under your personal spotify account in the app, because it has to be added to allowed accounts that can send API requests on your behalf through our app. So, for in that case just use the account credentials above.

### If you want to access the app from different devices.
Add your local ip on the local network to ALLOWED_HOSTS array in harmoni/settings.py.
And them, you can access the app using the <host_local_ip>:<app_port> address.