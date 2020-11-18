package oauth

import (
	"os"
	"path"
	"github.com/go-yaml/yaml"
	"io/ioutil"
)

type idStruct struct {
	Client string `yaml:"clientID"`
	Secret string `yaml:"secretID"`
}

func loadConfigFile() (*idStruct, error) {
	rootDir, err := os.UserConfigDir()
	if err != nil {
		return nil, err
	}
	fileBuffer, err := ioutil.ReadFile(path.Join(rootDir, idsFile))
	if err != nil {
		return nil, err
	}

	ids := make([]idStruct, 128)
	err = yaml.Unmarshal(fileBuffer, ids)

	return &ids[0], err
}

func getClientID() (*string, *string, error) {
	ids, err := loadConfigFile()
	if err != nil {
		return nil, nil, err
	}

	return &ids.Client, &ids.Secret, nil
}
