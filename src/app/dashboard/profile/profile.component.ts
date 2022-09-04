import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {PROFILES} from '../../shared/data/collections';
import {FormGroup, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../shared/services/crud.service';
import {FormService} from './form.service';
import {Profile} from '../../shared/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  id = '';
  clicked = {
    displayName: false,
    avatar: false,
  };

  constructor(
    private formService: FormService,
    private crud: CrudService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('profileId');
    if (id) {
      this.id = id;
      this.crud.get(PROFILES.path, this.id).subscribe({
        next: data => {
          console.log(data);
          this.profile = data;
          this.form.patchValue(this.profile);
        },
        error: error => console.error(error),
        complete: () => console.info('complete')
      });
    }
  }

  ngOnInit(): void {
  }

  get form(): FormGroup {
    return this.formService.form;
  }

  back(): void {
    this.router.navigate(['../'], {relativeTo: this.route}).then().catch();
  }

  update(field?: string): void {
    if (field) {
      // @ts-ignore
      this.clicked[field] = true;
    }
    this.crud.update(PROFILES.path, this.id, this.getDTO())
      .then(_ => {
        if (field) {
          // @ts-ignore
          this.clicked[field] = false;
        }
      })
      .catch(error => console.error(error))
    ;
  }

  updateImage($event: any): void {
    this.form.patchValue({avatar: $event.imagePath});
    this.crud.update(PROFILES.path, this.id, this.getDTO())
      .then(_ => console.log('avatar image updated!'))
      .catch(error => console.log(error))
    ;
  }

  getDTO(): Profile {
    const data = this.form.value;
    data.timestamps.updated_at = Date.now();
    console.log(data);
    return data;
  }

  get path(): string {
    return PROFILES.path;
  }


}
