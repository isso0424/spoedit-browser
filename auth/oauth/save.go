package oauth

import (
	"os"
	"path/filepath"
)

func saveRefreshToken(configDir *string, token *string) error {
	saveFilePath := filepath.Clean(*configDir + "/" + tokenFile)
	file, err := os.Create(saveFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.WriteString(*token)

	return err
}
