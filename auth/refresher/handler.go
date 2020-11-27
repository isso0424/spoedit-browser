package refresher

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
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
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	idSet := []byte(ids.Client + ":" + ids.Secret)
	encodedID := base64.StdEncoding.EncodeToString(idSet)
	authorization := "Basic " + encodedID

	req.Header.Set("Authorization", authorization)

	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	responseBuffer, _ := ioutil.ReadAll(response.Body)
	responseBody := map[string]string{}
	err = json.Unmarshal(responseBuffer, &responseBody)
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	accessToken := responseBody["access_token"]

	buffer := []byte(accessToken)
	_, err = writer.Write(buffer)
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	writer.WriteHeader(http.StatusOK)
}

func getClientIDHandler(writer http.ResponseWriter, request *http.Request) {
	buffer := []byte(ids.Client)

	_, err := writer.Write(buffer)
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusOK)
}
