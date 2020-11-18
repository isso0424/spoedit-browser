package main

import (
	"fmt"
	"isso0424/spoedit-auth/setup"
)

func main() {
	_, _, err := setup.Setup()
	fmt.Println(err)
}
