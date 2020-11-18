package setup

import (
	"os"
	"path"
)

func exist(filename string) bool {
	_, err := os.Stat(filename)

	return err == nil
}

func existConfigFile() (bool, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return false, err
	}

	return exist(path.Join(configDir, configDirName, idsFile)), nil
}

func existConfigDir() (bool, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return false, err
	}

	return exist(path.Join(configDir, configDirName)), nil
}
