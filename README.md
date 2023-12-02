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
[Tutorial](https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j)

### Create credentials.py file under spotify folder
```
CLIENT_ID = "<hash>"
CLIENT_SECRET = "<hash>"
REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"
```