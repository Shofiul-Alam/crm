import _ from "lodash";

export default class FeedbackHandler {
    loading: Object;
    success: Object;
    errors: Object;
    status: Object;
    message: Object;
    successTime: Number = 2000;
    constructor() {

    }
    hasErrors():boolean {
        return !!Object.keys(this.errors).length;
    }
    startLoading(identifier:String|Number, field:String|Number|null =null, entity:String|Number|null =null): void {
        if (entity) {
            this.loading[entity] = this.loading[entity] || {};
            if (field) {
                this.loading[entity][field] = this.loading[entity][field] || {};
                this.loading[entity][field][identifier] = true;
            } else {
                this.loading[entity][identifier] = true;
            }
        } else if(field){
            this.loading[field][identifier] = true;
        } else {
            this.loading[identifier] = true;
        }
    }
    finishLoading(identifier:String|Number, field:String|Number|null =null, entity:String|Number|null =null):void {
        if (entity) {
            if (field) {
                _.unset(this.loading[entity][field], identifier);
            } else {
                _.unset(this.loading[entity], identifier);
            }
        } else {
            _.unset(this.loading, identifier);
        }
    }
    showSuccess(identifier:String|Number, field:String|Number|null =null, entity:String|Number|null =null, successTime = 0): void {
        if (entity) {
            this.success[entity] = this.success[entity] || {};
            if (field) {
                this.success[entity][field] = this.success[entity][field] || {};
                this.success[entity][field][identifier] = true;
            } else {
                this.success[entity][identifier] = true;
            }
        } else {
            this.success[identifier] = true;
        }
        setTimeout(() => {
            this.removeSuccess(identifier, entity, field);
        }, successTime??this.successTime);
    }
    removeSuccess(identifier:String|Number, field:String|Number|null =null, entity:String|Number|null =null):void {
        if (entity) {
            if (field) {
                _.unset(this.success[entity][field], identifier);
            } else {
                _.unset(this.success[entity], identifier);
            }
        } else {
            _.unset(this.success, identifier);
        }
    }
    setSuccessMessage(message:String|Number, identifier:String|Number, field:String|Number|null =null,
                      entity:String|Number|null =null, successMessageTime = 0):void {
        if (entity) {
            this.success[entity] = this.success[entity] || {};
            if (field) {
                this.success[entity][field] = this.success[entity][field] || {};
                this.success[entity][field][identifier] = this.success[entity][field][identifier] || {};
                this.success[entity][field][identifier]['message'] = message;
            } else {
                this.success[entity][identifier] = this.success[entity][identifier] || {};
                this.success[entity][identifier]['message'] = message;
            }
        } else {
            this.success[identifier] = this.success[entity][identifier] || {};
            this.success[identifier]['message'] = message;
        }
        setTimeout(() => {
            this.removeSuccess(identifier, entity, field);
        }, successMessageTime??this.successTime);
    }
    setError(error, identifier:String|Number, field:String|Number|null =null, entity:String|Number|null =null): void {
        if (entity) {
            this.errors[entity] = this.errors[entity] || {};
            if (field) {
                this.errors[entity][field] = this.errors[entity][field] || {};
                this.errors[entity][field][identifier] = error;
            } else {
                this.errors[entity][identifier] = error;
            }
        } else {
            this.errors[identifier] = error;
        }
    }
    setFormErrors(errors:Object|Array<String|Number|Object>, entity:String|Number): void {
        this.errors[entity] = this.errors[entity] || {};
        const entries = typeof errors === 'object' ? Object.entries(errors) : errors;
        for (const [key, value] of entries) {
          if(typeof value === 'string') {
            this.errors[entity][key] = value;
          }else{
              let values = typeof value === 'object' ? Object.entries(value) : value;
              this.errors[entity][key] = values.join('\n');
          }
        }
    }
    clearFormErrors(entity:String|Number, field:String|Number|null =null): void {
        if (field) {
            _.unset(this.errors[entity], field);
        } else {
            _.unset(this.errors, entity);
        }
    }
    clearFeedback(identifier:String|Number|null, field:String|Number|null =null, entity:String|Number|null =null): void {
        if (identifier) {
            if (entity) {
                if (field) {
                    _.unset(this.errors[entity][field], identifier);
                    _.unset(this.loading[entity][field], identifier);
                    _.unset(this.success[entity][field], identifier);
                    _.unset(this.status[entity][field], identifier);
                    _.unset(this.message[entity][field], identifier);
                } else {
                    _.unset(this.errors[entity], identifier);
                    _.unset(this.loading[entity], identifier);
                    _.unset(this.success[entity], identifier);
                    _.unset(this.status[entity], identifier);
                    _.unset(this.message[entity], identifier);
                }
            }
            else {
                _.unset(this.errors, identifier);
                _.unset(this.loading, identifier);
                _.unset(this.success, identifier);
                _.unset(this.status, identifier);
                _.unset(this.message, identifier);
            }
        } if(entity) {
            if (field) {
                _.unset(this.errors[entity], field);
                _.unset(this.loading[entity], field);
                _.unset(this.success[entity], field);
                _.unset(this.status[entity], field);
                _.unset(this.message[entity], field);
            } else {
                _.unset(this.errors, entity);
                _.unset(this.loading, entity);
                _.unset(this.success, entity);
                _.unset(this.status, entity);
                _.unset(this.message, entity);
            }
        }
        else {
            this.errors = {};
            this.loading = {};
            this.success = {};
            this.status = {};
            this.message = {};
        }
    }
}
export function parseAxiosError(axiosError): any {
    if (!axiosError) return undefined;
    if (!axiosError.response) return axiosError;
    let error;
    if (typeof axiosError === 'string') error = axiosError;
    else {
        let res = axiosError.response;
        switch (res.status) {
            case 401:
                error = 'Authentication Error. Please try logging out and logging in again.';
                break;
            case 403:
                error = res.data?.message || 'Unauthorised Operation';
                break;
            case 404:
                error = res.data?.message || res.data?.errors || res.data || res || 'Page Not Found';
                break;
            case 422:
                error = res.data?.errors || res.data || res;
                break;
            case 500:
                error = res.data?.message??'Internal Server Error';
                break;
            default:
                error = res.data;
                break;
        }
    }
    return error;
}
