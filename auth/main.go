package main

import (
	"isso0424/spoedit-auth/oauth"
	"isso0424/spoedit-auth/setup"
)

func main() {
	clientID, secretID, err := setup.Setup()
	if err != nil {
		panic(err.Error())
	}

	tokenPath, err := setup.GetTokenPath()
	if err != nil {
		panic(err.Error())
	}

	oauth.LaunchOauthServer(*tokenPath, clientID, secretID)
}
