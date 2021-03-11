export class DonationService {
    value = 0;
    isInfaq = false;
    get payload() {
        const payload = {
            total: this.value,
            isInfaq: this.isInfaq
        }
        return payload;
    }

    setPayload(val: number, infaq: boolean) {
        this.value = val;
        this.isInfaq = infaq;
    }
}