package setup

import (
	"bufio"
	"fmt"
	"os"
	"path"
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
	return os.Mkdir(path.Join(dir, configDirName), 0666)
}

func createIdsStruct() (ids idStruct, err error) {
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

	_, err = os.Create(path.Join(dir, configDirName, idsFile))
	if err != nil {
		return err
	}

	ids, err := loadConfigFile()
	if err != nil {
		return err
	}


	if ids.Client == "" || ids.Secret == "" {
		_, err = createIdsStruct()
		return err
	}

	return err
}
