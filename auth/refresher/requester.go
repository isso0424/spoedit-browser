package refresher

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
)

func getAccessToken() (accessToken *string, err error) {
	body := url.Values{}
	body.Set("grant_type", "refresh_token")
	body.Set("refresh_token", token)
	req, err := http.NewRequest(
		"POST",
		tokenRefreshURL,
		strings.NewReader(body.Encode()),
	)
	if err != nil {
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
		return
	}
	defer response.Body.Close()

	responseBuffer, _ := ioutil.ReadAll(response.Body)
	log.Println(string(responseBuffer))
	responseBody := refreshTokenResponse{}
	err = json.Unmarshal(responseBuffer, &responseBody)
	if err != nil {
		log.Println(err)
		return
	}
	if responseBody.Error != "" {
		err = fmt.Errorf("request error: %s", responseBody.Error)
		return
	}

	accessToken = &responseBody.AccessToken
	log.Println(fmt.Sprintf("Generated token: %s", *accessToken))

	return
}

type refreshTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
	ExpiresIn   int32  `json:"expires_in"`
	Error       string `json:"error"`
}
