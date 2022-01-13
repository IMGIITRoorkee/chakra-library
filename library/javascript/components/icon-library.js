// Dark means inverted here, in gradient blue background all icons should be white
const paths = {
  blue_arrow: 'library/assets/icons/arrow.svg',
  blue_arrow_dark: 'library/assets/icons/blue-arrow-dark.svg',
  bulls_eye: 'library/assets/icons/bulls-eye.svg',
  bulls_eye_dark: 'library/assets/icons/bulls-eye-dark.svg',
  carouselleft: 'library/assets/icons/carouselleft.svg', // Dont provide in icon option
  carouselright: 'library/assets/icons/carouselright.svg', // Do not provide in icon option
  centres: 'library/assets/icons/centres.svg',
  centres_dark: 'library/assets/icons/centres-dark.svg',
  contact: 'library/assets/icons/contact.svg',
  contact_dark: 'library/assets/icons/contact-dark.svg',
  convo_hat: 'library/assets/icons/convo-hat.svg',
  convo_hat_dark: 'library/assets/icons/convo-hat-dark.svg',
  covid: 'library/assets/icons/covid.svg',
  covid_dark: 'library/assets/icons/covid-dark.svg',
  departments: 'library/assets/icons/departments.svg',
  departments_dark: 'library/assets/icons/departments-dark.svg',
  download: 'library/assets/icons/download.svg',
  download_dark: 'library/assets/icons/download-dark.svg',
  downward_polygon: 'library/assets/icons/downward-polygon.svg', // Dont provide user option in icons
  dropdown: 'library/assets/icons/dropdown.svg',
  dropdown_dark: 'library/assets/icons/dropdown-dark.svg',
  email: 'library/assets/icons/email.svg',
  email_dark: 'library/assets/icons/email-dark.svg',
  facebook_logo: 'library/assets/icons/facebook-logo.svg', // Dont provide user option in icons
  filter_list: 'library/assets/icons/filter-list.svg',
  filter_list_dark: 'library/assets/icons/filter-list-dark.svg',
  floating_button: 'library/assets/icons/floating-button.svg', // Remove option from frontend
  floating_button_hover: 'library/assets/icons/floating-button-hover.svg',
  faculty: 'library/assets/icons/faculty.svg',
  faculty_dark: 'library/assets/icons/faculty-dark.svg',
  faculty_hover: 'library/assets/icons/faculty-hover.svg',
  heart: 'library/assets/icons/heart.svg',
  hygiene: 'library/assets/icons/hygiene.svg',
  hygiene_dark: 'library/assets/icons/hygiene-dark.svg',
  hospital: 'library/assets/icons/hospital.svg',
  hospital_dark: 'library/assets/icons/hospital-dark.svg',
  instagram_logo: 'library/assets/icons/instagram-logo.svg', // Remove option from frontend
  linkedin_logo: 'library/assets/icons/linkedin-logo.svg', // Remove option from frontend
  location: 'library/assets/icons/location.svg',
  location_dark: 'library/assets/icons/location-dark.svg',
  microphone: 'library/assets/icons/microphone.svg',
  microphone_dark: 'library/assets/icons/microphone-dark.svg',
  phone: 'library/assets/icons/phone.svg',
  phone_dark: 'library/assets/icons/phone-dark.svg',
  research: 'library/assets/icons/research.svg',
  research_dark: 'library/assets/icons/research-dark.svg',
  right_arrow: 'library/assets/icons/right-arrow.svg',
  right_arrow_dark: 'library/assets/icons/right-arrow-dark.svg',
  right_arrow_breadcrumb_dark:
    'library/assets/icons/right-arrow-breadcrumb-dark.svg',
  schools: 'library/assets/icons/schools.svg',
  schools_dark: 'library/assets/icons/schools-dark.svg',
  search: 'library/assets/icons/search.svg',
  search_dark: 'library/assets/icons/search-dark.svg',
  share: 'library/assets/icons/share.svg',
  share_dark: 'library/assets/icons/share-dark.svg',
  // funnel: 'library/assets/icons/sort-icon.svg',
  stats_faculty_dark: 'library/assets/icons/stats_faculty_dark-icon.svg',
  stats_patents_dark: 'library/assets/icons/stats_patents_dark-icon.svg',
  stats_staff_dark: 'library/assets/icons/stats_staff_dark-icon.svg',
  students: 'library/assets/icons/students.svg',
  students_dark: 'library/assets/icons/students-dark.svg',
  students_hover: 'library/assets/icons/students-hover.svg',
  text_small: 'library/assets/icons/text-small.svg', // Dont provide user option in icons
  text_medium: 'library/assets/icons/text-medium.svg', // Dont provide user option in icons
  text_big: 'library/assets/icons/text-big.svg', // Dont provide user option in icons
  twitter_logo: 'library/assets/icons/twitter-logo.svg', // Remove option from frontend
  up_arrow: 'library/assets/icons/up-arrow.svg',
  up_arrow_dark: 'library/assets/icons/up-arrow-dark.svg',
  visitors: 'library/assets/icons/visitors.svg',
  visitors_dark: 'library/assets/icons/visitors-dark.svg',
  visitors_hover: 'library/assets/icons/visitors-hover.svg',
  web_logo: 'library/assets/icons/web-logo.svg', // Remove option from frontend
  wellness: 'library/assets/icons/wellness.svg',
  wellness_dark: 'library/assets/icons/wellness-dark.svg',
  youtube_logo: 'library/assets/icons/youtube-logo.svg' // Remove option from frontend
}

/* <img class="ui icon" data-icon=""/> */

function hover (element) {
  let key = element.getAttribute('data-icon')
  let path = paths[key]
  if (key.endsWith('_dark')) {
    key = key.substring(0, key.length - 5)
  }
  key = key + '_hover'
  if (path === null || path === undefined) {
    path = paths[key.substring(0, key.length - 6)]
  }
  const src = '../../'
  element.setAttribute('src', src + path)
}

function unhover (element) {
  const key = element.getAttribute('data-icon')
  const src = '../../'
  let path = paths[key]
  if (key.endsWith('_dark')) {
    if (path === null || path === undefined) {
      path = paths[key.substring(0, key.length - 5)]
    }
  }
  if (key.endsWith('_hover')) {
    if (path === null || path === undefined) {
      path = paths[key.substring(0, key.length - 6)]
    }
  }
  element.setAttribute('src', src + path)
}

const documentIcons = document.getElementsByClassName('icon')
const x = documentIcons.length
for (let i = 0; i < x; i++) {
  const icon = documentIcons[i]
  const key = icon.getAttribute('data-icon')
  // const src = 'https://cmsredesign.channeli.in/'
  const src = '../../'
  let path = paths[key]
  if (key.endsWith('_dark')) {
    if (path === null || path === undefined) {
      path = paths[key.substring(0, key.length - 5)]
    }
  }
  if (key.endsWith('_hover')) {
    if (path === null || path === undefined) {
      path = paths[key.substring(0, key.length - 6)]
    }
  }
  icon.setAttribute('src', src + path)
  icon.setAttribute('onmouseover', 'hover(this)')
  icon.setAttribute('onmouseout', 'unhover(this)')
  icon.className += ' icon_image'
}
