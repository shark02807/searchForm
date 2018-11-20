import ModalInfo from 'Views/modal/modalInfo';
import ModalAlert from 'Views/modal/modalAlert';
import modalTypes from './modalTypes';
const { INFO, ALERT } = modalTypes;
const MODAL_COMPONENTS = {
  [INFO]: ModalInfo,
  [ALERT]: ModalAlert
};
export const lockBodyToggle = isLock => {
  const bodyElement = document.querySelectorAll('body');
  Array.prototype.slice.call(bodyElement).forEach(body => {
    body.classList[isLock ? 'add' : 'remove']('ds-popup-body-lock');
});
};
export const getContent = type => MODAL_COMPONENTS[type];