package refresher

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"
)

var (
	ch = make(chan os.Signal, 1)
	token string
	tokenPath string
)

func LaunchRefreshServer(tokenPlace string) (err error) {
	tokenPath = tokenPlace
	err = loadRefreshToken()
	if err != nil {
		return
	}
	server := &http.Server { Addr: ":8000" }
	http.HandleFunc("/refresh", getRefreshToken)

	go func() {
		err := server.ListenAndServe()
		fmt.Println("Error: ", err)
	}()

	signal.Notify(ch)

	<-ch

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	if err = server.Shutdown(ctx); err != nil {
		return
	}

	return
}
