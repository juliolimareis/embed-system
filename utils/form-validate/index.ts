import InputValidate from "./input-validate";

export default class FormValidate {

  private readonly inputValidates: InputValidate[];

  errors: ValidateI[] = [];

  constructor(inputValidate: InputValidate[]){
    this.inputValidates = inputValidate;
  }

  getInputValidate(name: string) {
    return this.inputValidates.find(i => i.name === name) ?? null;
  }

  getValue(name: string) {
    const validate = this.inputValidates.find(i => i.name === name) ?? null;

    return validate ? validate.value : "";
  }
  
  getFormatedValue(name: string) {
    const validate = this.inputValidates.find(i => i.name === name) ?? null;

    return validate ? validate.getFormatedValue() : "";
  }

  validate(){
    this.inputValidates.forEach(i => i.validate());
    this.retiveErros();

    return this.hasError();
  }

  setValue(name: string, value: string){
    this.inputValidates
      .find(i => i.name === name)
      ?.setValue(value);
  }

  retiveErros(){
    this.errors = [];

    this.inputValidates.forEach(input => {
      if(input.errors.length){
        this.errors = [...this.errors, ...input.errors];
      }
    });
  }

  hasError(){
    return this.errors.length > 0;
  }

  getData(){
    const data = {} as Record<string, unknown>;

    this.inputValidates.forEach(input => {
      data[input.name] = input.getFormatedValue();
    });

    return data;
  }

}