package oauth

import (
	"fmt"
	"net/http"

	"github.com/zmb3/spotify"
)

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

const (
	idsFile = "id.yaml"
	tokenFile = "token"
)

func launchOauthServer(configDir string) error {
	clientID, secretID, err := getClientID()
	if err != nil {
		return err
	}

	auth.SetAuthInfo(*clientID, *secretID)

	http.HandleFunc("/callback", handler)
	http.HandleFunc("/", defaultRoute)

	go func() {
		err := http.ListenAndServe(":8888", nil)
		fmt.Println("Error: ", err)
	}()

	authURL := auth.AuthURL(state)
	fmt.Println("Please log in to Spotify by visiting the following page in your browser.\nURL: ", authURL)

	client := <-ch

	token, err := client.Token()
	if err != nil {
		return err
	}

	return saveRefreshToken(&configDir, &token.RefreshToken)
}
