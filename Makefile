link: #Установка пакета из операционной системы
	sudo npm link

install: #Установка модулей согласно package-lock.json
	npm ci

unlink: #Удаление пакетов
	sudo npm unlink -g

publish: #Публикация пакета в npm
	npm publish --dry-run

test: #Запуск линтера
	npx eslint .

test-fix: #Запуск линтера с опцией --fix
	npx eslint . --fix

code: #Запуск VS Code
	code .

restore: #Откат к последнему коммиту
	git reset --hard HEAD

rec: #Запись аскинемы
	asciinema rec