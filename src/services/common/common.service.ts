import _ from 'lodash';
export class CommonServices {

    getPaymentImageSrc(val: string): string {
        const list = ['bca', 'bni', 'bri', 'dana', 'gopay', 'link', 'echannel', 'ovo', 'shopee', 'permata', 'mandiri'];
        let name: string = '';
        list.forEach(l => {
            if (val.includes(l)) {
                name = l;
            }
        });
        return name;
    }

    isEmail(val: string): boolean {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
            return false;
        } else {
            return true
        };
    }
}
