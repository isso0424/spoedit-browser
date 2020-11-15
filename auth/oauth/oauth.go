package oauth

import "github.com/zmb3/spotify"

var (
	auth = spotify.NewAuthenticator(
		"http://localhost:8888/callback",
		spotify.ScopePlaylistModifyPrivate,
		spotify.ScopePlaylistModifyPublic,
		spotify.ScopePlaylistReadCollaborative,
		spotify.ScopePlaylistReadPrivate,
	)
	state = "spoedit"
	ch = make(chan *spotify.Client)
)

func launchOauthServer() error {

	return nil
}
