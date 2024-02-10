import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-super-agent-badge',
  templateUrl: './super-agent-badge.component.html',
  styleUrls: ['./super-agent-badge.component.scss']
})
export class SuperAgentBadgeComponent implements OnInit {

  badgeForm!: FormGroup | any;
  imageUrl: any;
  isModalShown:boolean=false

  isMenuShown:boolean=false
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

  showMenu(){
    this.isMenuShown=!this.isMenuShown
  }


  saveAsImage() {
    const modalContent = this.myModal.nativeElement;
    html2canvas(modalContent).then(canvas => {
      
      const image = canvas.toDataURL('image/png');

      
      const link = document.createElement('a');
      link.href = image;
      link.download = 'badge.png'; 
      link.click(); 
    });
  }

  saveAsPDF(pageSize: string) {
    const modalContent = this.myModal.nativeElement;
  
    // Determine page dimensions based on user selection
    let pageWidth, pageHeight;
    switch (pageSize) {
      case 'A4':
        pageWidth = 297; // Swap width and height for landscape orientation
        pageHeight = 210;
        break;
      case 'A5':
        pageWidth = 210; // Swap width and height for landscape orientation
        pageHeight = 148;
        break;
      case 'A6':
        pageWidth = 148; // Swap width and height for landscape orientation
        pageHeight = 105;
        break;
      default:
        pageWidth = 297; // Default to A4 landscape
        pageHeight = 210;
        break;
    }
  
    // Create new jsPDF instance with landscape orientation and specified page dimensions
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });
  
    // Add HTML content (badge section) to the PDF document
    const options = {
      callback: (pdf:any) => {
        // Save PDF document
        pdf.save('badge.pdf');
      }
    };
  
    pdf.html(modalContent, options);
  }


  printModalContent() {
    const modalContent = this.myModal.nativeElement.innerHTML;
    const printWindow :any= window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(modalContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

  
  
  
  
  
  

  closeModal(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.inner-container')) {
        this.isModalShown = false;
    }
}
}
