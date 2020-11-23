package refresher

import (
	"fmt"
	"net/http"
)

func getRefreshToken(writer http.ResponseWriter, request *http.Request) {
	token, err := loadRefreshToken()
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	buffer := []byte(*token)
	_, err = writer.Write(buffer)
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	writer.WriteHeader(http.StatusOK)
}
