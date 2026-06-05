import './styles/main.scss';
import { initNavigation } from './scripts/navigation';
import { initForm } from './scripts/form';
import { initEmailBuilder } from './scripts/email-builder';
import { initOffcanvas } from './scripts/offcanvas';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initForm();
  initEmailBuilder();
  initOffcanvas('privacy-policy');
});
