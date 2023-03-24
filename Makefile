link: #Установка пакета из операционной системы
	sudo npm link

install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

unlink: #Удаление пакетов
	sudo npm unlink -g

publish: #Публикация пакета в npm
	npm publish --dry-run

lint: #Запуск линтера
	npx eslint .

lint-fix: #Запуск линтера с опцией --fix
	npx eslint . --fix

code: #Запуск VS Code
	code .

restore: #Откат к последнему коммиту
	git reset --hard HEAD

rec: #Запись аскинемы
	asciinema rec

test: #Запуск тестов Jest
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage: #Запуск теста покрытия тестами
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

.PHONY: test