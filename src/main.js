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

  let text = ''

  if (todayMD === birthdayMD) {
    text = 'Wszystkiego najlepszego!'
  } else {
    let lastBirthday, nextBirthday

    if (birthdayMD < todayMD) {
      lastBirthday = dayjs(today.year() + '-' + birthdayMD)
      nextBirthday = lastBirthday.add(1, 'year')
    } else {
      lastBirthday = dayjs((today.year() - 1) + '-' + birthdayMD)
      nextBirthday = dayjs(today.year() + '-' + birthdayMD)
    }

    const daysPassed = today.diff(lastBirthday, 'days')
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