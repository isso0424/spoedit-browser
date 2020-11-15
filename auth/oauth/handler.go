package oauth

import (
	"fmt"
	"log"
	"net/http"
)

func handler(writer http.ResponseWriter, request *http.Request) {
	token, err := auth.Token(state, request)
	if err != nil {
		http.Error(writer, "Couldn't get token", http.StatusForbidden)
		log.Fatal(err)
	}
	if st := request.FormValue("state"); st != state {
		http.NotFound(writer, request)
		log.Fatalf("State mismatch: %s != %s\n", st, state)
	}

	client := auth.NewClient(token)
	_, err = fmt.Fprintf(writer, "<h1>Login!!!</h1><h3>You can start this app!!!</h3>")
	if err != nil {
		log.Fatal(err)
	}
	ch <- &client
}

func defaultRoute(writer http.ResponseWriter, request *http.Request) {
	log.Println("Got requestTypes for:", request.URL.String())
}
