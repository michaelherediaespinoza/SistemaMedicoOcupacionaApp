import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {
  usuarios: Usuario[];
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['codigo', 'nombre', 'username', 'rol', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getAllUsuarios();
  }

  addNewUsuario(): void {
    localStorage.setItem('actualizarUsuario', "false");
    this.router.navigate(["add-usuario"]);
  }

  getAllUsuarios = () => {
    this.service.getUsuarios()
      .subscribe(data => {
        this.usuarios = data;
        this.dataSource.data = this.usuarios;
        console.log('res', data);
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  editarUsuario(usuario: Usuario) {
    localStorage.setItem('codigoUsuario', usuario.codigo.toString());
    localStorage.setItem('actualizarUsuario', "true");
    this.router.navigate(["add-usuario"]);
  }

  deleteUsuario(usuario: Usuario): void {
    if (window.confirm('Yes, please...')) {
      this.service.deleteUsuario(usuario)
        .subscribe(data => {
          this.usuarios = this.usuarios.filter(p => p !== usuario);
          alert("Usuario Eliminado..." + data.nombre);
          this.getAllUsuarios();
        })
    }
  }
}
