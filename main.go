package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	fileContents, err := os.ReadFile("settings1.txt")
	if err != nil {
		fmt.Print(err)
		return
	}

	fileContentStr := string(fileContents)
	//fmt.Println(fileContentStr)

	lines := strings.Split(strings.ReplaceAll(fileContentStr, "\r\n", "\n"), "\n")
	for _, line := range lines {
		fmt.Println(line)
	}
	// strings.Join()
}
