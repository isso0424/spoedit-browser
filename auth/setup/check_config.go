package setup

import (
	"os"
	"path"
)

func exist(filename string) bool {
	_, err := os.Stat(filename)

	return err == nil
}

func existIDsConfigFile() (bool, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return false, err
	}
	if !exist(path.Join(configDir, configDirName, idsFile)) {
		return false, nil
	}

	ids, err := loadConfigFile()
	if err != nil {
		return false, err
	}
	if ids.Client == "" || ids.Secret == "" {
		return false, nil
	}

	return true, nil
}

func existConfigDir() (bool, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return false, err
	}

	return exist(path.Join(configDir, configDirName)), nil
}
