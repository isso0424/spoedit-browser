package oauth

import (
	"context"
	"fmt"
	"net/http"
	"time"

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

func LaunchOauthServer(tokenPath string, clientID *string, secretID *string) (err error) {
	if checkFileExist(tokenPath) {
		fmt.Println("Token is already exist.")
		return
	}

	auth.SetAuthInfo(*clientID, *secretID)
	server := &http.Server{ Addr: ":8888" }

	http.HandleFunc("/callback", handler)
	http.HandleFunc("/", defaultRoute)

	go func() {
		err := server.ListenAndServe()
		fmt.Println("Error: ", err)
	}()

	authURL := auth.AuthURL(state)
	fmt.Println("Please log in to Spotify by visiting the following page in your browser.\nURL: ", authURL)

	client := <-ch


	token, err := client.Token()
	if err != nil {
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	if err = server.Shutdown(ctx); err != nil {
		return
	}

	return saveRefreshToken(&tokenPath, &token.RefreshToken)
}
