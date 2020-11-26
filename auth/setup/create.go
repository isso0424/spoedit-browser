package setup

import (
	"bufio"
	"fmt"
	"os"
	"path"

	"github.com/go-yaml/yaml"
)

func input() string {
	stdin := bufio.NewScanner(os.Stdin)
	stdin.Scan()
	return stdin.Text()
}

func createConfigDir() error {
	dir, err := os.UserConfigDir()
	if err != nil {
		return err
	}
	return os.Mkdir(path.Join(dir, configDirName), 0777)
}

func createIdsStruct() (ids IDStruct, err error) {
	fmt.Println("Please input client ID")
	ids.Client = input()

	fmt.Println("Please input secret ID")
	ids.Secret = input()

	return
}

func createIdsFile() error {
	dir, err := os.UserConfigDir()
	if err != nil {
		return err
	}

	file, err := os.Create(path.Join(dir, configDirName, idsFile))
	if err != nil {
		return err
	}
	defer file.Close()

	ids, err := loadConfigFile()
	if err != nil {
		return err
	}


	if ids.Client == "" || ids.Secret == "" {
		ids, err := createIdsStruct()
		if err != nil {
			return err
		}
		buf, err := yaml.Marshal(ids)
		if err != nil {
			return err
		}
		_, err = file.Write(buf)
		return err
	}

	return err
}
