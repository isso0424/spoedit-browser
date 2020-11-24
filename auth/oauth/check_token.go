package oauth

import "os"

func checkFileExist(tokenPath string) bool {
	_, err := os.Stat(tokenPath)

	return !os.IsNotExist(err)
}
