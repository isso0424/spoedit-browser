package setup

import (
	"os"
	"path"
)

func GetConfigDir() (*string, error) {
	dir, err := os.UserConfigDir()
	if err != nil {
		return nil, err
	}

	configDir := path.Join(dir, configDirName)
	return &configDir, nil
}
