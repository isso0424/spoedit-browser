package refresher

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"
	"isso0424/spoedit-auth/setup"
)

var (
	ch = make(chan os.Signal, 1)
	token string
	tokenPath string
	ids setup.IDStruct
)

func LaunchRefreshServer(tokenPlace string) (err error) {
	clientID, secretID, err := setup.GetClientID()
	if err != nil {
		return
	}
	ids = setup.IDStruct{
		Client: *clientID,
		Secret: *secretID,
	}

	tokenPath = tokenPlace
	err = loadRefreshToken()
	if err != nil {
		return
	}
	server := &http.Server { Addr: ":8000" }
	http.HandleFunc("/token", getAccessTokenHandler)
	http.HandleFunc("/client_id", getClientIDHandler)

	go func() {
		err := server.ListenAndServe()
		fmt.Println("Error: ", err)
	}()

	<-ch

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	if err = server.Shutdown(ctx); err != nil {
		return
	}

	return
}
