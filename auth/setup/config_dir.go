package setup

import (
	"os"
	"path"
)

func GetTokenPath() (*string, error) {
	dir, err := os.UserConfigDir()
	if err != nil {
		return nil, err
	}

	configDir := path.Join(dir, configDirName, tokenFile)
	return &configDir, nil
}
