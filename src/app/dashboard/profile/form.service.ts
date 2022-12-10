import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      display_name: new FormControl<string | null>(null, Validators.required),
      avatar: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      wallet_address: [null, Validators.required],
      tag: [null, Validators.required],
      loyalty: [null, Validators.required],
      achievements: [[], Validators.required],
      timestamps: this.formBuilder.group({
        created_at: ['', [Validators.required]],
        updated_at: ['', [Validators.required]],
        deleted_at: [''],
      })
    });
  }
}
