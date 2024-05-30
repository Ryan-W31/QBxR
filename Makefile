run:
	docker-compose -f docker-compose.yml up --build -d
stop:
	docker-compose -f docker-compose.yml down --remove-orphans --volumes