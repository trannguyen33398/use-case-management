POSTGRES_CONTAINER?=postgres
init:
	docker-compose up -d
	@echo "Waiting for database connection..."
	@while ! docker exec ${POSTGRES_CONTAINER} pg_isready > /dev/null; do \
		sleep 1; \
	done
	make migrate-up
migrate-up:
	sql-migrate up
dev:
	go run main.go