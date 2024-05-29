run-dev:
	docker-compose -f docker-compose.yml up --build -d

run-prod:
	docker-compose -f docker-compose.yml up --build -d