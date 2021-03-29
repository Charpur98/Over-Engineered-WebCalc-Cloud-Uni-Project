package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/bitly/go-simplejson"
)

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":80", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {

	xString := r.URL.Query()["x"]
	yString := r.URL.Query()["y"]
	error := "false"
	answer := 0.
	string := ""

	if xString == nil && yString == nil {
		w.WriteHeader(400)
		error = "X and Y Must be presnt"
	} else if xString == nil {
		w.WriteHeader(400)
		error = "X Must be presnt"
	} else if yString == nil {
		w.WriteHeader(400)
		error = "Y Must be presnt"
	} else {
		x, errX := strconv.Atoi(xString[0])
		y, errY := strconv.Atoi(yString[0])
		if errX != nil || errY != nil {
			w.WriteHeader(400)
			error = "X and Y Must be an Integer"
		} else {
			answer = divide(x, y)
			string = xString[0] + "/" + yString[0] + "=" + fmt.Sprint(answer)
		}
	}

	json := simplejson.New()
	json.Set("error", error)
	json.Set("string", string)
	json.Set("answer", answer)

	payload, err := json.MarshalJSON()
	if err != nil {
		log.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(200)
	w.Write(payload)
}

func divide(x int, y int) (result float64) {

	if x == 0 || y == 0 {
		result = 0
	} else {
		result = float64(x) / float64(y)
	}
	return result
}
