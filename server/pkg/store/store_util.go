package store

import (
	"database/sql"
	"fmt"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/config"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/logger"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

// NewPostgresStore postgres init by gorm
func NewPostgresStore(cfg *config.Config) DBRepo {
	ds := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		cfg.Postgres.User, cfg.Postgres.Pass,
		cfg.Postgres.Host, cfg.Postgres.Port, cfg.Postgres.Name,
	)

	conn, err := sql.Open("postgres", ds)
	if err != nil {
		logger.L.Fatalf(err, "failed to open database connection")
	}

	db, err := gorm.Open(postgres.New(
		postgres.Config{Conn: conn}),
		&gorm.Config{
			NamingStrategy: schema.NamingStrategy{
				SingularTable: true,
			},
		})
	if err != nil {
		logger.L.Fatalf(err, ds)
	}

	logger.L.Info("database connected")

	if cfg.Debug {
		db.Logger = gormlogger.Default.LogMode(gormlogger.Info)
	}

	return &repo{Database: db}
}
