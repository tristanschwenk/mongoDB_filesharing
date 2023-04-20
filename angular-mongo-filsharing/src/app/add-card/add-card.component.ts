import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {
  uploadForm!: FormGroup;  
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  fileChangeEvent = async (e: Event) => {
    const file = (e.target as any)?.files[0]
    console.log(file)
    this.uploadForm.get('file')?.setValue(file)
    
    console.log("creating formdata")
    const formData = new FormData()
    formData.append('content', file)
    
    console.log("sending formdata")
    await this.api.addFile(formData).subscribe((res) => console.log(res), (err) => console.error(err))
  }
}
