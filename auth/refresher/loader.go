package refresher

import "io/ioutil"

func loadRefreshToken() (err error) {
	fileBuffer, err := ioutil.ReadFile(tokenPath)
	if err != nil {
		return
	}

	token = string(fileBuffer)
	return
}
