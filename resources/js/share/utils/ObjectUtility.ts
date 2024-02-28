export const setFieldData = (data, field, updateValue) => {
    if (!data || !field) {
        return;
    }
    try {
        var value = data[field];
        if (this.isNotEmpty(value)){
            data[field] = updateValue;
            return;
        }
    }
    catch (_unused) {}
    if (Object.keys(data).length) {
        if (field.indexOf('.') === -1) {
            data[field] = updateValue;
        } else {
            var fields = field.split('.');
            var _value = data;
            for (var i = 0, len = fields.length; i < len; ++i) {
                if (_value == null) {
                    return;
                }
                if(i === len - 1){
                    _value[fields[i]] = updateValue;
                    return;
                }
                _value = _value[fields[i]];
            }
            return _value;
        }
    }
    return null;
};
