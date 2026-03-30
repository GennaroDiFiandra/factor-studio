import './styles/main.scss';
import { initOffcanvas } from './scripts/offcanvas';
import { initCursor } from './scripts/cursor';
import { initNavigation } from './scripts/navigation';
import { initTimeline } from './scripts/timeline';
import { initForm } from './scripts/form';
import { initEmailBuilder } from './scripts/email-builder';

document.addEventListener('DOMContentLoaded', () => {
  initOffcanvas();
  initCursor();
  initNavigation();
  initTimeline();
  initForm();
  initEmailBuilder();
});
