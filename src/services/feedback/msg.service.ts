import { forEach, get, has, identity, isArray, isObject, isString, set } from "lodash";

export class MessageParserService {

    parse(messages: any) {
        let parsedMessages: any = [];

        if (isArray(messages)) {
            messages.forEach(messageSet => this.parseMessageObject(messageSet, parsedMessages));
        } else if (isObject(messages)) {
            this.parseMessageObject(messages, parsedMessages);
        } else if (isString(messages)) {
            parsedMessages.push(messages);
        }

        if (!parsedMessages.length) {
            parsedMessages = parsedMessages.concat(this.populateDefaultMessages(messages));
        }

        return parsedMessages.filter(identity);
    }

    parseSpesific(response: any) {
        if (has(response, 'data.errors') && has(response, 'data.data')) {
            set(response.data, 'summary', {});

            return this.handleErrors(response);
        }
    }

    private handleErrors(response: any) {
        const errorMessages: any = [];

        forEach(response.data.errors, error => {
            const errorMessage = get(error, 'error_message');
            const errorCode = error.error_code;
            if (errorMessage || errorCode) {
                if (errorMessage && errorCode) {
                    errorMessages.push(`${errorMessage} [${errorCode}]`);
                } else if (errorMessage && !errorCode) {
                    errorMessages.push(errorMessage);
                } else if (!errorMessage && errorCode) {
                    errorMessages.push(`Error code ${errorCode}`);
                }

                if (errorCode) {
                    set(response.data, `summary.${error.error_code}`, true);
                }
            }
        });

        return errorMessages;
    }

    parseFormValidationsFailedMessage(validationFails: any[], prefix: string = '') {
        const prefixer: string = 'importFormValidationErrors';
        const messages: {
            message: string;
            interpolation: any;
        }[] = [];

        forEach(validationFails, validationFail => {
            const message: string[] = [];
            message.push(prefix);
            message.push(prefixer);
            message.push(validationFail.pureControlName);
            message.push(validationFail.errorName);

            const messageString = this.joinToString(message);
            messages.push({
                message: messageString,
                interpolation: validationFail,
            });
        });

        return messages;
    }

    private parseMessageObject(messageSet: any, parsedMessages: (string | string)[]) {

        if (has(messageSet, 'response.data[0]') && isArray(get(messageSet, 'response.data'))) {
            forEach(messageSet.response.data, message => this.parseMessageObject(message, parsedMessages));
        } else if (isString(messageSet) && messageSet) {
            parsedMessages.push(messageSet);
        } else if (has(messageSet, 'errorMessage') && messageSet.errorMessage) {
            parsedMessages.push(messageSet.errorMessage);
        } else if (has(messageSet, 'response.data[0]') && isArray(get(messageSet, 'response.data[0]'))) {
            forEach(messageSet.response.data, message => this.parseMessageObject(message, parsedMessages));
        } else if (has(messageSet, 'errors')) {
            forEach(messageSet.errors, errorMessage => {
                parsedMessages.push(errorMessage);
            });
        } else if (has(messageSet, 'data[0]') && isArray(get(messageSet, 'data[0]'))) {
            forEach(messageSet.data, message => this.parseMessageObject(message, parsedMessages));
        } else if (has(messageSet, 'data[0]')) {
            forEach(messageSet.data, message => this.parseMessageObject(message, parsedMessages));
        }
        else if (has(messageSet, 'data') && messageSet.data) {
            parsedMessages.push(messageSet.data);
        } else if (has(messageSet, 'response.data') && messageSet.response.data) {
            parsedMessages.push(messageSet.response.data);
        }
    }

    private populateDefaultMessages(messages: any): (any | string[]) {
        let url: string | any;
        let statusCode: number | any;
        if (has(messages, 'request') && has(messages, 'response')) {
            url = get(messages, 'config.url');
            statusCode = get(messages, 'response.status');
            if (!statusCode) {
                return ['error.http.noInternetConnection'];
                // return this._translateService.instant('error.http.noInternetConnection');
            }

            return this.setPopulateDefaultMessages(statusCode, url);
        }
        if (isArray(messages)) {

            forEach(messages, function (message) {
                url = get(message, 'config.url');
                statusCode = get(message, 'status') || get(message, 'response.status');
            });
            if (!statusCode) {
                return ['error.http.noInternetConnection'];
            }

            return this.setPopulateDefaultMessages(statusCode, url);

        }
    }

    private setPopulateDefaultMessages(statusCode: number, url: string) {
        switch (statusCode) {
            case 401:
            case 403:
            case 404:
            case 405:
            case 408:
            case 500:
            case 502:
            case 503:
                return `error.httpCode.${statusCode}`;
                break;
        }
    }

    private joinToString(strings: (string | number)[], separator: string = '.') {
        return strings.filter(s => s !== null && s !== undefined && s !== '').join(separator);
    }

}
