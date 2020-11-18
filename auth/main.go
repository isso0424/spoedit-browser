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

	dir, err := setup.GetConfigDir()
	if err != nil {
		panic(err.Error())
	}

	oauth.LaunchOauthServer(*dir, clientID, secretID)
}
