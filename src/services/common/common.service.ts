import _ from 'lodash';
export class CommonServices {

    getPaymentImageSrc(val: string): string {
        const list = ['bca', 'bni', 'bri', 'dana', 'gopay', 'link', 'mandiri', 'ovo', 'shopee'];
        let name: string = '';
        list.forEach(l => {
            if (val.includes(l)) {
                name = l;
            }
        });
        return name;
    }
}
