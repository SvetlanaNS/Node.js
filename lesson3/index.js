//По ссылке вы найдёте файл с логами запросов к серверу весом более 2 Гб. Напишите программу,
//которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111, а также
//сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log.

const fs = require('fs')
const readline = require('readline')

const readStream = fs.createReadStream('./access_tmp.log', 'utf8')
const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log')
const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log')

const rl = readline.createInterface({
	input: readStream,
	terminal: true,
})

rl.on('line', line => {
	if (line.includes('89.123.1.41')) {
		writeStream1.write(line + '\n')
	}

	if (line.includes('34.48.240.111')) {
		writeStream2.write(line + '\n')
	}
})