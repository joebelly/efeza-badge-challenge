import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-super-agent-badge',
  templateUrl: './super-agent-badge.component.html',
  styleUrls: ['./super-agent-badge.component.scss']
})
export class SuperAgentBadgeComponent implements OnInit {

  badgeForm!: FormGroup | any;
  imageUrl: any;
  isModalShown:boolean=false
  @ViewChild('myModal') myModal: ElementRef | any;

  
  constructor() {
    this.badgeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      superAgentCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  // Function to handle image preview
  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;

        this.badgeForm.patchValue({
          photo:this.imageUrl
        })
      };
      reader.readAsDataURL(file);
    }
  }

  checkGlobalForm(){


  }

  closeModal(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.inner-container')) {
        this.isModalShown = false;
    }
}
}
