package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestDivWholeNum(t *testing.T) {
	total := divide(20, 2)
	if total != 10 {
		t.Errorf("Result was incorrect, got: %f, want: %d.", total, 10)
	}
}

func TestDivDecimal(t *testing.T) {
	total := divide(25, 2)
	if total != 12.5 {
		t.Errorf("Result was incorrect, got: %f, want: %f.", total, 12.5)
	}
}

func TestDivMinus(t *testing.T) {
	total := divide(2, 5)
	if total != 0.4 {
		t.Errorf("Result was incorrect, got: %f, want: %f.", total, 0.4)
	}
}

func TestDivByZero(t *testing.T) {
	total := divide(2, 0)
	if total != 0 {
		t.Errorf("Result was incorrect, got: %f, want: %d.", total, 0)
	}
}

func TestDivZeros(t *testing.T) {
	total := divide(0, 0)
	if total != 0 {
		t.Errorf("Result was incorrect, got: %f, want: %d.", total, 0)
	}
}

func TestDivMinuses(t *testing.T) {
	total := divide(-10, 2)
	if total != -5 {
		t.Errorf("Result was incorrect, got: %f, want: %d.", total, -5)
	}
}

func TestHandler(t *testing.T) {

	req, err := http.NewRequest(
		http.MethodGet,
		"http://localhost/?x=25&y=5",
		nil,
	)

	if err != nil {
		t.Fatalf("Could not create a request %v", err)
	}

	rec := httptest.NewRecorder()
	handler(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected status 200, got %v", rec.Code)
	}
}

func TestErrorHandler(t *testing.T) {

	req, err := http.NewRequest(
		http.MethodGet,
		"http://localhost/",
		nil,
	)

	if err != nil {
		t.Fatalf("Could not create a request %v", err)
	}

	rec := httptest.NewRecorder()
	handler(rec, req)

	if rec.Code == http.StatusOK {
		t.Errorf("expected status 400, got %v", rec.Code)
	}
}

func TestErrorHandlerString(t *testing.T) {

	req, err := http.NewRequest(
		http.MethodGet,
		"http://localhost/?x=one&y=two",
		nil,
	)

	if err != nil {
		t.Fatalf("Could not create a request %v", err)
	}

	rec := httptest.NewRecorder()
	handler(rec, req)

	if rec.Code == http.StatusOK {
		t.Errorf("expected status 400, got %v", rec.Code)
	}
}
