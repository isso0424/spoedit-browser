package setup

import (
	"os"
	"path"
)

func createConfigDir() error {
	dir, err := os.UserConfigDir()
	if err != nil {
		return err
	}
	return os.Mkdir(path.Join(dir, configDirName), 0666)
}

func createIdsFile() error {
	dir, err := os.UserConfigDir()
	if err != nil {
		return err
	}

	_, err = os.Create(path.Join(dir, configDirName, idsFile))

	return err
}
