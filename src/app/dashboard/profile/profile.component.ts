import { Component, OnInit } from '@angular/core';
import {PROFILES, TRANSACTIONS} from '../../shared/data/collections';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../shared/services/crud.service';
import {FormService} from './form.service';
import {Profile} from '../../shared/models/profile';
import {MatDialog} from '@angular/material/dialog';
import {WalletComponent} from '../../shared/components/dialogs/wallet/wallet.component';
import {map, Observable} from 'rxjs';
import {CRYPTO_SYMBOLS} from '../../shared/data/generic';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  transactions!: Observable<any[]>;
  currencies = CRYPTO_SYMBOLS;

  id = '';
  clicked = {
    displayName: false,
    firstname: false,
    lastname: false,
    avatar: false,
  };

  constructor(
    private formService: FormService,
    private crud: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
    const id = this.route.snapshot.paramMap.get('profileId');
    if (id) {
      this.id = id;
      this.crud.get(PROFILES.path, this.id).subscribe({
        next: data => {
          this.profile = data;
          this.form.patchValue(this.profile);
        },
        error: error => console.error(error),
        complete: () => console.info('complete')
      });
    }
  }

  ngOnInit(): void {
    const query = {...TRANSACTIONS};
    query.path = `profiles/${this.id}/transactions`;
    this.transactions = this.crud.colRefQuery(query).pipe(map(this.crud.mapId));
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

  openDialog(): void {
    this.dialog.open(WalletComponent, {width: '250px'});
  }
}
