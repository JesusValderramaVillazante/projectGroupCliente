import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-block',
  templateUrl: './perfil-block.component.html',
  styleUrls: ['./perfil-block.component.css']
})
export class PerfilBlockComponent implements OnInit {
  @Input() datos: any;
  constructor() { }

  ngOnInit() {
  }

}
