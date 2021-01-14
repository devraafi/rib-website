export class DonationService {
    value = 0;
    get total() {
        return this.value;
    }

    setTotal(val: number) {
        this.value = val;
    }
}