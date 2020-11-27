package refresher

import (
	"log"
	"net/http"
)

const tokenRefreshURL = "https://accounts.spotify.com/api/token"

func getAccessTokenHandler(writer http.ResponseWriter, request *http.Request) {
	accessToken, err := getAccessToken()
	if err != nil {
		log.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		writer.Write([]byte(err.Error()))

		return
	}

	buffer := []byte(*accessToken)
	_, err = writer.Write(buffer)
	if err != nil {
		log.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	writer.WriteHeader(http.StatusOK)
}

func getClientIDHandler(writer http.ResponseWriter, request *http.Request) {
	buffer := []byte(ids.Client)

	_, err := writer.Write(buffer)
	if err != nil {
		log.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusOK)
}
