let language = localStorage.getItem('asfb-language') || 'ar';
const toggle = document.querySelector('#language-toggle');
const menu = document.querySelector('#mobile-nav');
const menuButton = document.querySelector('#menu-toggle');
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(element => { element.innerHTML = element.dataset[next]; });
  toggle.innerHTML = next === 'ar' ? '<span>العربية</span><b>EN</b>' : '<span>EN</span><b>العربية</b>';
  localStorage.setItem('asfb-language', next);
}
toggle.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
setLanguage(language);
menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', open); });
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));
const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', event => { event.preventDefault(); const status = document.querySelector('#form-status'); status.textContent = language === 'ar' ? 'تم استلام طلبكم. سنتواصل معكم قريباً.' : 'Your enquiry has been received. We will be in touch shortly.'; form.reset(); });