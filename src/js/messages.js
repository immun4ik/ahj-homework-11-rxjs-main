import { interval, map } from 'rxjs'
import { faker } from '@faker-js/faker'
const container = document.querySelector('.content')

function generateRandomMessage() {
  return {
    id: faker.datatype.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.words(Math.floor(Math.random() * 4) + 1),
    body: faker.lorem.paragraph(),
    received: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 100000),
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`
}

function shortenSubject(subject) {
  return subject.length > 15 ? subject.slice(0, 15) + '...' : subject
}

function addMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.className = 'message'

  messageElement.innerHTML = `
        <p class="from">${message.from}</p>
        <p class="subject">${shortenSubject(message.subject)}</p>
        <p class="date">${formatDate(message.received)}</p>
    `
  container.appendChild(messageElement)
}

interval(5000)
  .pipe(map(() => generateRandomMessage()))
  .subscribe((message) => {
    addMessage(message)
  })
