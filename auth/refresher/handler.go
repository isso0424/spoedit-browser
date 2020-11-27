package refresher

import (
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
)

const tokenRefreshURL = "https://accounts.spotify.com/api/token"

func getAccessTokenHandler(writer http.ResponseWriter, request *http.Request) {
	body := url.Values{}
	body.Set("grant_type", "refresh_token")
	body.Set("refresh_token", token)
	req, err := http.NewRequest(
		"POST",
		tokenRefreshURL,
		strings.NewReader(body.Encode()),
	)
	if err != nil {
		log.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	idSet := []byte(ids.Client + ":" + ids.Secret)
	encodedID := base64.StdEncoding.EncodeToString(idSet)
	authorization := "Basic " + encodedID

	req.Header.Set("Authorization", authorization)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		log.Println(err)
		writer.Write([]byte(err.Error()))
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	responseBuffer, _ := ioutil.ReadAll(response.Body)
	log.Println(string(responseBuffer))
	responseBody := refreshTokenResponse{}
	err = json.Unmarshal(responseBuffer, &responseBody)
	if err != nil {
		log.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	if responseBody.Error != "" {
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	accessToken := responseBody.AccessToken
	log.Println(accessToken)

	buffer := []byte(accessToken)
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

type refreshTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
	ExpiresIn   int32  `json:"expires_in"`
	Error       string `json:"error"`
}
