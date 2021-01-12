import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-test-btn',
  templateUrl: './test-btn.component.html',
  styleUrls: ['./test-btn.component.scss']
})
export class TestBtnComponent implements OnInit {

  constructor(private service : PersonaService) { }

  ngOnInit(): void {
  }

  public async onClick() {
    //var per = new Persona("Nicolas","Ruiz");
    let httpResp = await this.service.getPersona(1).subscribe(resp => {
      
    });
  }

}
