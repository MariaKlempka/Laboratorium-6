import './style.css'
import dayjs from 'dayjs'

const dialog = document.getElementById('dialog')
const message = document.getElementById('message')

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault()

  const input = document.getElementById('date').value
  const parts = input.split('-')
  const today = dayjs()
  const todayMD = today.format('MM-DD')
  const birthdayMD = parts[1] + '-' + parts[2]

  const daysPassed = today.diff(dayjs(input), 'days')

  let text = ''

  if (todayMD === birthdayMD) {
    text = 'Minęło ' + daysPassed + ' dni od twoich urodzin. Wszystkiego najlepszego!'
  } else {
    let nextBirthday
    if (birthdayMD < todayMD) {
      nextBirthday = dayjs(today.year() + '-' + birthdayMD).add(1, 'year')
    } else {
      nextBirthday = dayjs(today.year() + '-' + birthdayMD)
    }

    const weeksUntil = nextBirthday.diff(today, 'week')
    text = 'Minęło ' + daysPassed + ' dni od twoich urodzin.'

    if (weeksUntil === 0) {
      text += ' Masz urodziny w tym tygodniu!'
    } else {
      text += ' Do urodzin zostało ' + weeksUntil + ' tygodni.'
    }
  }

  message.textContent = text
  dialog.showModal()
})

document.getElementById('close').addEventListener('click', function() {
  dialog.close()
})