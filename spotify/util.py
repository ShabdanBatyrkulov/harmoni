from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, get, put

BASE_URL = "https://api.spotify.com/v1/"

def get_user_tokens(session_id):
	user_tokens = SpotifyToken.objects.filter(user=session_id)
	if user_tokens.exists():
		return user_tokens[0]
	else:
		return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
	tokens = get_user_tokens(session_id)
	expires_in = timezone.now() + timedelta(seconds=expires_in)
	if tokens:
		tokens.access_token = access_token
		tokens.refresh_token = refresh_token
		tokens.expires_in = expires_in
		tokens.token_type = token_type
		tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
	else:
		tokens = SpotifyToken(user=session_id, access_token=access_token, 
			refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
		tokens.save()


def is_spotify_authenticated(session_id):
	tokens = get_user_tokens(session_id)
	if tokens:
		expiry = tokens.expires_in
		if expiry <= timezone.now():
			refresh_spotify_token(session_id)
		return True
	return False

def refresh_spotify_token(session_id):
	refresh_token = get_user_tokens(session_id).refresh_token

	response = post('https://accounts.spotify.com/api/token', data={
		'grant_type': 'refresh_token',
		'refresh_token': refresh_token,
		'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET
	}).json()

	access_token = response.get('access_token')
	token_type = response.get('token_type')
	expires_in = response.get('expires_in')

	update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)

def get_auth_header(token):
	return {"Content-Type": "application/json", "Authorization": "Bearer " + token}

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False, params={}):
	tokens = get_user_tokens(session_id)
	header = get_auth_header(tokens.access_token)

	if post_:
		post(BASE_URL + endpoint, headers=header)
	elif put_:
		put(BASE_URL + endpoint, headers=header)
	else:
		response = get(BASE_URL + endpoint, params, headers=header)

	print(response)

	try:
		return response.json()
	except:
		return {"Error": "Issue with request"}

def wrap_TrackObject_to_custom_song(item):
	artist_string = ""

	for i, artist in enumerate(item.get('artists')):
		if i > 0:
			artist_string += ", "
		name = artist.get('name')
		artist_string += name

	duration_ms = item.get('duration_ms')
	album_cover = item.get('album').get('images')[2].get('url') # small picture
	song_id = item.get('id')

	song = {
		'title': item.get('name'),
		'artist': artist_string,
		'image_url': album_cover,
		'id': song_id,
		'duration_ms': duration_ms
	}
	return song

def search_song(session_id, song_name):
	params = {
		"q": song_name,
		"type": ["track"],
		"limit": 10
	}
	return execute_spotify_api_request(session_id, "search", params=params)

def user_queue(session_id):
	return execute_spotify_api_request(session_id, "me/player/queue")

def play_song(session_id):
	return execute_spotify_api_request(session_id, "me/player/play", put_=True)

def pause_song(session_id):
	return execute_spotify_api_request(session_id, "me/player/pause", put_=True)

def skip_song(session_id):
	return execute_spotify_api_request(session_id, "me/player/next", post_=True)