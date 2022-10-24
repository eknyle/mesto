export default class FormFields {
  constructor(fields) {
    this._fields = fields;
  }
  //записываем значения в формате [<id элемента>:<значение поля формы>]
  getInputFieldsValues() {
    const fieldsValues = new Map();
    this._fields.forEach((element) => {
      fieldsValues.set(element.id, element.value);
    });
    return fieldsValues;
  }
}
