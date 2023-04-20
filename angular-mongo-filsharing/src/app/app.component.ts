import { Component } from '@angular/core';
import { ApiService} from "./api.service"
import { File } from './dto/file.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mongo DB Filesharing';
  files: File[] = []
  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getFiles().subscribe((data: any) => {
      console.log(data)
      this.files = data
    })
  }
}
