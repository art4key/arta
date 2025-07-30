package env

import (
	"bufio"
	"os"
	"strings"
)

func Load() error {
	f, err := os.Open(".env")
	if err != nil {
		return err
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || line[0] == '#' {
			continue
		}

		if key, val, found := strings.Cut(line, "="); found {
			key = strings.TrimSpace(key)
			val = strings.TrimSpace(val)

			if len(val) > 1 && (val[0] == '"' || val[0] == '\'' || val[0] == '`') {
				if val[0] == val[len(val)-1] {
					val = val[1 : len(val)-1]
				}
			}

			if os.Getenv(key) == "" {
				os.Setenv(key, val)
			}
		}
	}
	return scanner.Err()
}
