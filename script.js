const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const languageToggle = document.querySelector('#language-toggle');
let language = 'ar';

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 25));
menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(element => {
    if (element.tagName === 'OPTION') element.textContent = element.dataset[language];
    else element.innerHTML = element.dataset[language];
  });
  document.title = language === 'ar' ? 'بحر العرب للأعمال | حلول بحرية ولوجستية' : 'Arabian Sea for Business | Marine & Logistics Solutions';
  languageToggle.innerHTML = language === 'ar' ? '<span>العربية</span><b>EN</b>' : '<span>EN</span><b>العربية</b>';
  localStorage.setItem('asfb-language', language);
}
languageToggle.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));

const savedLanguage = localStorage.getItem('asfb-language');
if (savedLanguage === 'en') setLanguage('en');

document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  const selected = filter.dataset.filter;
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.hidden = selected !== 'all' && item.dataset.category !== selected;
  });
}));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  status.textContent = language === 'ar' ? 'تم استلام طلبكم. سنتواصل معكم قريباً.' : 'Your enquiry has been received. We will be in touch shortly.';
  event.target.reset();
});
