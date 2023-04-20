import { Component, Input } from '@angular/core';
import { File } from '../dto/file.dto';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-filecard',
  templateUrl: './filecard.component.html',
  styleUrls: ['./filecard.component.scss'],
})
export class FilecardComponent {
  computeDate!: string;
  computeSize!: number;
  imageUrl!: string;
  @Input() file!: File;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.computeDate = new Date(this.file.creation).toLocaleDateString(
      'fr-FR',
      { day: '2-digit', month: '2-digit', year: 'numeric' }
    );
    this.computeSize = Math.round(parseInt(this.file.size, 10) / 1000);
  }

  async getFile() {
    const url = this.api.getFile(this.file.title);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = this.file.title;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  computeImageUrl() {
    switch (this.file.mimetype) {
      case 'image/png':
        return '/assets/svg/PNG.svg';
      case 'image/jpeg':
        return '/assets/svg/JPG.svg';
      case 'text/csv':
        return '/assets/svg/CSV.svg';
      case 'text/csv':
        return '/assets/svg/CSV.svg';
      case 'application/msword':
        return '/assets/svg/DOC.svg';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '/assets/svg/DOC.svg';
      case 'video/mpeg':
        return '/assets/svg/MP4.svg';
      case 'application/pdf':
        return '/assets/svg/PDF.svg';
      default:
        return '/assets/svg/FILE.svg';
    }
  }

  async deleteFile() {
    await this.api.deleteFile(this.file.title).subscribe();
  }
}
