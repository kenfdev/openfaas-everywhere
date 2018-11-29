package function

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

type Stats struct {
	TotalCount int `json:"total_count"`
}

type Response struct {
	Language string `json:"language"`
	Count    int    `json:"count"`
	LogoURL  string `json:"logoUrl"`
}

// Handle a serverless request
func Handle(_ []byte) string {
	query := os.Getenv("Http_Query")

	q := ""
	if query != "" {
		year := strings.Split(query, "=")[1]
		q = "+created:" + year + "-01-01.." + year + "-12-31"
	}
	url := "https://api.github.com/search/repositories?per_page=1&type=Repositories&q=language%3Ago" + q

	token := os.Getenv("TOKEN")
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("Authorization", "token "+token)
	client := new(http.Client)
	result, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	byteArray, err := ioutil.ReadAll(result.Body)
	if err != nil {
		log.Fatal(err)
	}

	var status Stats
	if err := json.Unmarshal(byteArray, &status); err != nil {
		log.Fatal(err)
	}

	resp := &Response{
		Language: "Go",
		Count:    status.TotalCount,
		LogoURL:  "https://ih0.redbubble.net/image.520470450.9907/flat,550x550,075,f.u4.jpg",
	}

	responseJSON, err := json.Marshal(resp)
	if err != nil {
		log.Fatal(err)
	}

	return string(responseJSON)
}
