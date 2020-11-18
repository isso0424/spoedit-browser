package setup

func Setup() (clientID *string, secretID *string, err error) {
	existDir, err := existConfigDir()
	if err != nil {
		return
	}

	if !existDir {
		err = createConfigDir()
		if err != nil {
			return
		}
	}

	existIdsFile, err := existIDsConfigFile()
	if err != nil {
		return
	}

	if !existIdsFile {
		err = createIdsFile()
		if err != nil {
			return
		}
	}

	ids, err := loadConfigFile()
	clientID = &ids.Client
	secretID = &ids.Secret

	return
}
