import _ from 'lodash';
export class CommonServices {

    getPaymentImageSrc(val: string): string {
        const list = ['bca', 'bni', 'bri', 'dana', 'gopay', 'link', 'echannel', 'ovo', 'shopee', 'permata'];
        let name: string = '';
        list.forEach(l => {
            if (val.includes(l)) {
                name = l;
            }
        });
        return name;
    }
}
