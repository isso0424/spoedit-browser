package setup

import (
	"os"
	"path"
	"github.com/go-yaml/yaml"
	"io/ioutil"
)

func loadConfigFile() (*IDStruct, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return nil, err
	}
	fileBuffer, err := ioutil.ReadFile(path.Join(configDir, configDirName, idsFile))
	if err != nil {
		return nil, err
	}

	ids := IDStruct{}
	err = yaml.Unmarshal(fileBuffer, &ids)

	return &ids, err
}

func GetClientID() (*string, *string, error) {
	ids, err := loadConfigFile()
	if err != nil {
		return nil, nil, err
	}

	return &ids.Client, &ids.Secret, nil
}
