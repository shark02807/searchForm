import modalTypes from './modalTypes';
import modalActionTypes from './modalActionTypes';
const {
  SHOW,
  SHOW_SUCCESS,
  HIDE,
  HIDE_SUCCESS
} = modalActionTypes;
const { INFO, ALERT } = modalTypes;
export const showSuccess = action => ({
  ...action,
  type: SHOW_SUCCESS
});
export const hide = () => ({
  type: HIDE
});
export const hideSuccess = (modalType, nextType) => ({
  type: HIDE_SUCCESS,
  modalType,
  nextType
});
export const showInfoModal = (header, text) => ({
  type: SHOW,
  modalType: INFO,
  modalProps: {
    header,
    text
  }
});
export const showAlert = (header, text, buttons, className) => ({
  type: SHOW,
  modalType: ALERT,
  modalProps: {
    className,
    header,
    text,
    buttons
  }
});
