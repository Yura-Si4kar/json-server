export default function clickOnTheDate(dates) {
  let calendarSection = document.querySelector('.calendar');
  let caseListSection = document.querySelector('.case');

  [...dates].forEach((day, i) => {
    day.addEventListener('click', () => {
      dates.forEach((day) => {
          day.classList.remove('active_day');
      });
        day.classList.add('active_day');
        calendarSection.classList.add('hide');
        caseListSection.classList.add('show');
    });
  })
}