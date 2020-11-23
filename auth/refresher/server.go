package refresher

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"
)

var ch = make(chan os.Signal, 1)

func LaunchRefreshServer(tokenPath string) error {
	server := &http.Server { Addr: ":8000" }
	http.HandleFunc("/refresh", getRefreshToken)

	go func() {
		err := server.ListenAndServe()
		fmt.Println("Error: ", err)
	}()

	<-ch

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		return err
	}

	return nil
}
