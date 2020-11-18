package oauth

import (
	"os"
)

func saveRefreshToken(tokenpath *string, token *string) error {
	file, err := os.Create(*tokenpath)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.WriteString(*token)

	return err
}
