dev_up:
	docker-compose up -d --remove-orphans
	yarn run start:dev

bootstrap:
	yarn install
	docker-compose up -d --remove-orphans

clean_dev: 
	docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans

ps:
	docker-compose ps

stop:
	docker-compose stop

stop-containers:
	docker stop $$(docker ps -a -q)

logs:
	docker-compose logs -f

down:
	docker-compose down