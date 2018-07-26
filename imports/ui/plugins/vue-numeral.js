import numeral from 'numeral';

const VueNumeral = {
    install(Vue, options) {
        Vue.prototype.$numeral = numeral;

        Vue.mixin({
            mounted() {
                // Just tell you that it is mounted
                // console.log('VueNumeral');
            }
        });

        if (typeof window !== 'undefined' && window.Vue) {
            window.Vue.use(VueNumeral);
        }
    }
};

export default VueNumeral;
