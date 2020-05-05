import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  rForm: FormGroup;
  post: any;
  email: string = '';
  name: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.rForm = this.fb.group({
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      validate: '',
    });
  }
  addPost() {
    let formData: any = new FormData();
    formData.append('name', this.rForm.get('name').value);
    formData.append('email', this.rForm.get('email').value);

    this.http
      .post(
        'https://flosure-notifications.herokuapp.com/registration',
        this.rForm.value
      )
      .subscribe(
        {
          next: (val) => {
            console.log('SUCCESS', val);
          },
          error: (val) => {
            console.log('ERROR', val);
          },
        }
        // (response) => console.log(response),
        // (error) => console.log(error)
      );
  }
}
