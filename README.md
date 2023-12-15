# harmoni

### NPM Setup Commands
Run in harmoni/frontend folder.

```npm i```

if it causes error, just force install it by:

```npm i --force```

### To run webserver.
```
python ./manage.py runserver 0.0.0.0:8000
npm run dev
```

### Reference links.
[Django-rest-framework/api-guide/fields](https://www.django-rest-framework.org/api-guide/fields/#charfield)\
[Spotify API tutorial](https://www.youtube.com/watch?v=WAmEZBEeNmg)

### Spotify account can't be used in development mode.
username: tagaevmanas26@gmail.com

password: manas123

You can't login under your personal spotify account in the app, because it has to be added to allowed accounts that can send API requests on your behalf through our app. So, for in that case just use the account credentials above.

### If you want to access the app from different devices.
Add your local ip on the local network to ALLOWED_HOSTS array in harmoni/settings.py. And then, you can access the app using the <host_local_ip>:<app_port> address.

Our workload for this project was almost 50 to 50%.

Our team is beginner and we are new to web development. We didn't know anything about web development and had zero experience. We faced a lot of difficulties when we started it due to lack of experience. But while doing our project we learned a bunch of things. We deeply learned about React, Bootstrap, Material-UI, Js, MongoDB, using APIs and other things. On top of that, we were new to frontend components like HTML, CSS, Js. Thankfully, we derived a lot of useful skills by doing our project. Since there were only two of us in our team, we couldn't reach some of our other goals like more functionalities and other stuff.
