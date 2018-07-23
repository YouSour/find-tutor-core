import {Message} from 'element-ui';

const Msg = {
    success(message = 'Success') {
        Message({
            type: 'success',
            showClose: true,
            message,
        });
    },
    warning(message = 'Warning') {
        Message({
            type: 'warning',
            showClose: true,
            message,
        });
    },
    info(message = 'Info') {
        Message({
            type: 'info',
            showClose: true,
            message,
        });
    },
    error(message = 'Error') {
        Message({
            type: 'error',
            showClose: true,
            message,
        });
    }
};

export default Msg;