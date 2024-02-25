package config

import (
	"os"
	"strconv"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/logger"
	//env "github.com/joho/godotenv"
)

// Loader load config from reader into osiper

type DBConnection struct {
	Host string
	Port string
	User string
	Name string
	Pass string

	SSLMode string
}
type Config struct {
	// db
	Postgres  DBConnection
	Debug     bool
	ApiServer ApiServer
}

type ENV interface {
	GetBool(string) bool
	GetEnv(string) string
}

type ApiServer struct {
	Port           string
	AllowedOrigins string
}

func LoadConfig() *Config {
	// err := env.Load(".env")
	// if err != nil {
	// 	logger.L.Error(err, "Error loading .enos file")
	// }
	envValue := os.Getenv("DEBUG")
	debug, err := strconv.ParseBool(envValue)
	if err != nil {
		logger.L.Error(err, "Error parsing boolean value from environment variable")
	}
	return &Config{
		Debug: debug,
		Postgres: DBConnection{
			Host:    os.Getenv("DB_HOST"),
			Port:    os.Getenv("DB_PORT"),
			User:    os.Getenv("DB_USER"),
			Name:    os.Getenv("DB_NAME"),
			Pass:    os.Getenv("DB_PASS"),
			SSLMode: os.Getenv("DB_SSL_MODE"),
		},
		ApiServer: ApiServer{
			Port:           os.Getenv("PORT"),
			AllowedOrigins: os.Getenv("ALLOWED_ORIGINS"),
		},
	}
}
