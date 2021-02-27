import _ from 'lodash';
export class MessageParserService {

    parse(messages: any) {
        let parsedMessages: any = [];

        if (_.isArray(messages)) {
            messages.forEach(messageSet => this.parseMessageObject(messageSet, parsedMessages));
        } else if (_.isObject(messages)) {
            this.parseMessageObject(messages, parsedMessages);
        } else if (_.isString(messages)) {
            parsedMessages.push(messages);
        }

        if (!parsedMessages.length) {
            parsedMessages = parsedMessages.concat(this.populateDefaultMessages(messages));
        }

        return parsedMessages.filter(_.identity);
    }

    parseSpesific(response: any) {
        if (_.has(response, 'data.errors') && _.has(response, 'data.data')) {
            _.set(response.data, 'summary', {});

            return this.handleErrors(response);
        }
    }

    private handleErrors(response: any) {
        const errorMessages: any = [];

        _.forEach(response.data.errors, error => {
            const errorMessage = _.get(error, 'error_message');
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
                    _.set(response.data, `summary.${error.error_code}`, true);
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

        _.forEach(validationFails, validationFail => {
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

        if (_.has(messageSet, 'response.data[0]') && _.isArray(_.get(messageSet, 'response.data'))) {
            _.forEach(messageSet.response.data, message => this.parseMessageObject(message, parsedMessages));
        } else if (_.isString(messageSet) && messageSet) {
            parsedMessages.push(messageSet);
        } else if (_.has(messageSet, 'errorMessage') && messageSet.errorMessage) {
            parsedMessages.push(messageSet.errorMessage);
        } else if (_.has(messageSet, 'response.data[0]') && _.isArray(_.get(messageSet, 'response.data[0]'))) {
            _.forEach(messageSet.response.data, message => this.parseMessageObject(message, parsedMessages));
        } else if (_.has(messageSet, 'errors')) {
            _.forEach(messageSet.errors, errorMessage => {
                parsedMessages.push(errorMessage);
            });
        } else if (_.has(messageSet, 'data[0]') && _.isArray(_.get(messageSet, 'data[0]'))) {
            _.forEach(messageSet.data, message => this.parseMessageObject(message, parsedMessages));
        } else if (_.has(messageSet, 'data[0]')) {
            _.forEach(messageSet.data, message => this.parseMessageObject(message, parsedMessages));
        }
        else if (_.has(messageSet, 'data') && messageSet.data) {
            parsedMessages.push(messageSet.data);
        } else if (_.has(messageSet, 'response.data') && messageSet.response.data) {
            parsedMessages.push(messageSet.response.data);
        }
    }

    private populateDefaultMessages(messages: any): (any | string[]) {
        let url: string | any;
        let statusCode: number | any;
        if (_.has(messages, 'request') && _.has(messages, 'response')) {
            url = _.get(messages, 'config.url');
            statusCode = _.get(messages, 'response.status');
            if (!statusCode) {
                return ['error.http.noInternetConnection'];
                // return this._translateService.instant('error.http.noInternetConnection');
            }

            return this.setPopulateDefaultMessages(statusCode, url);
        }
        if (_.isArray(messages)) {

            _.forEach(messages, function (message) {
                url = _.get(message, 'config.url');
                statusCode = _.get(message, 'status') || _.get(message, 'response.status');
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
