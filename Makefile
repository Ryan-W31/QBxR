run:
	docker-compose -f docker-compose.yml up --build -w
stop:
	docker-compose -f docker-compose.yml down --remove-orphans
hard-stop:
	docker-compose -f docker-compose.yml down --remove-orphans --volumes