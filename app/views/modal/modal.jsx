import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { hide } from 'State/modal/modalActions';
import { getContent } from 'State/modal/modalHelpers';
import './modal.less';
const Modal = ({ modalType, modalProps, i18n, onClose }) => {
  const ModalContent = modalType && getContent(modalType);
  if (!ModalContent) return null;
  const propsToPass = { ...modalProps, onClose };
  propsToPass.i18n = i18n;
  const popupClass = `ds-popup-dialog ${(modalProps.popupClass || '')}`;
  return (
    <div className="ds-popup-overlay" onClick={e => !modalProps.noCloseByOverlay && onClose(e)}>
      <div className="ds-popup-inner">
        <div className={popupClass} onClick={e => { e.stopPropagation(); }}>
          { !modalProps.noCloseButton && <div className="ds-popup-close" onClick={onClose} />}
          { (ModalContent && <ModalContent {...propsToPass} />) || null }
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};
Modal.defaultProps = {
  modalType: '',
  modalProps: {}
};
export default connect((({ modal }) => modal), { onClose: hide })(Modal);