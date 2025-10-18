import {
    Directive,
    HostListener,
    Input,
  } from "@angular/core";
  import { NgControl } from "@angular/forms";
  
  @Directive({
    selector: "[decimal]"
  })
  export class DecimalDirective {
    decimales: string = "";
    @Input()
    set decimal(value: string) {
      const i = value.indexOf("d{0,");
      if (i > 0) {
        const decimales = +value.substr(i + 4, 1);
        this.decimales = "000000000".substr(0, decimales);
      }
      this.regExpr = new RegExp(value);
    }
  
    private _oldvalue: string = "";
    private regExpr: any;
    constructor(private control: NgControl) {}

    @HostListener("blur", ["$event"])
    blur(event: any) {
      if (this.decimales) {
        let item = event.target;
        
        if(item.value == '') 
            item.value = "0";

        let values = item.value.split(",");
        let value =
          values.length > 1
            ? values[0] + "," + (values[1] + this.decimales).substr(0, this.decimales.length)
            : values[0] + ","+this.decimales;
        this.control.control?.setValue(value, { emit: false });
      }
    }
  
    @HostListener("input", ["$event"])
    change(event: any) {
      let item = event.target;
      let value = item.value;
      let pos = item.selectionStart;
      let matchvalue = value;
      let noMatch: boolean = value && !this.regExpr.test(matchvalue);
      if (noMatch) {
        item.selectionStart = item.selectionEnd = pos - 1;
        if (item.value.length < this._oldvalue.length && pos == 0) pos = 2;
        if (this.control)
          this.control.control?.setValue(this._oldvalue, { emit: false });
  
        item.value = this._oldvalue;
        item.selectionStart = item.selectionEnd = pos - 1;
      } else this._oldvalue = value;
    }
  }
  