import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notEmpty } from '../custom_validators/not-empty-validator';

@Component({
  selector: 'app-edit-imp-date',
  templateUrl: './edit-imp-date.component.html',
  styleUrls: ['./edit-imp-date.component.css']
})
export class EditImpDateComponent implements OnInit {

  editFormGroup:FormGroup ;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.editFormGroup = this.fb.group({
      dateControl  : ['' ,[notEmpty()]],
      titleControl : ['' ,[notEmpty()]]
    });


  }

}
